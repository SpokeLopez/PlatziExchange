<template>
    <div class="flex-col">
        <div class="flex justify-center">
            <bounce-loader :loading="isLoading" :color= "'#68D391'" :size="100"/>
        </div>
        <template v-if="!isLoading">
            <div class="flex flex-col sm:flex-row justify-around items-center">
                <div class="flex flex-col items-center">
                    <img :src="
                        `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" 
                        :alt="asset.name" class="w-20 h-20 mr-5" />
                    <h1 class="text-5xl">
                        {{ asset.name }}
                        <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
                    </h1>
                </div>

                <div class="my-10 flex flex-col">
                    <ul>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                            <span>#{{ asset.rank }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
                            <span>{{ asset.priceUsd | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
                            <span>{{ min | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
                            <span>{{ max | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
                            <span>{{ avg | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                            <span>{{ asset.changePercent24Hr | percent }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <line-chart class="my-10" 
            :colors="['orange']"
            :min="min"
            :max="max"
            :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])" />

            <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
            <table>
                <tr class="border-b" v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`">
                    <td>
                        <b>{{ m.exchangeId }}</b>
                    </td>
                    <td>{{ m.priceUsd | dollar }}</td>
                    <td>
                       <span>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</span>
                    </td>
                    <td>

                    </td>
                </tr>
            </table>
        </template>
    </div>
</template>

<script>
import api from '@/api'

export default {
    name: 'CoinDetail',
    data() {
        return {
            asset: {},
            isLoading: false,
            history: [],
            markets: []
        }
    },

    computed: {
        min() {
            return Math.min(
                ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        max() {
            return Math.max(
                ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        avg() {
            return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
        }
    },

    created() {
        this.getCoin()
    },

    methods: {
        getCoin() {
            const id = this.$route.params.id
            this.isLoading = true

            Promise.all([api.getAsset(id), api.getAssetHistory(id), api.getMarkers(id)]).then(
                ([asset, history, markets]) => {
                    this.asset = asset
                    this.history = history
                    this.markets = markets
                })
                .finally(() => this.isLoading = false)
        },
    }
}
</script>

<style scoped>
td {
    padding: 10px;
    text-align: center;
}
</style>

