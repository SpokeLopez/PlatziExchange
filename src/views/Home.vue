<template>
  <div>
    <bounce-loader :loading="isLoading" :color= "'#68D391'" :size="100" />
    <PxAssetsTable v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from '@/api';
import PxAssetsTable from '@/components/PxAssetsTable'
export default {
    name: 'HomeView',

    components: { PxAssetsTable },
    data(){
      return {
        isLoading: false,
        assets: []
      }
    },
    created() {
      this.isLoading = true;
      api.getAssets().then(assets => (this.assets = assets))
      .finally( () => {this.isLoading = false})
  }
}
</script>