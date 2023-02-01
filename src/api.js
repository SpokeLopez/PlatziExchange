const url = 'https://api.coincap.io/v2';
//https://docs.coincap.io/?version=latest#ee30bea9-bb6b-469d-958a-d3e35d442d7a
function getAssets (){
    return fetch(`${url}/assets?limit=20`)
        .then(response => response.json())
        .then(response => response.data)
}

function getAsset(coin){
    return fetch(`${url}/assets/${coin}`)
        .then(response => response.json())
        .then(response => response.data)
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
        .then(response => response.json())
        .then(response => response.data)
}

function getMarkers(coin) {
    return fetch(`${url}/assets/${coin}/markets?limit=5`)
        .then(response => response.json())
        .then(response => response.data)
}

function getExchange(id) {
    return fetch(`${ url } / exchanges / ${ id }`)
        .then(response => response.json())
        .then(response => response.data)
}


export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkers,
    getExchange
}