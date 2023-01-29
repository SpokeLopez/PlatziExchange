const url = 'https://api.coincap.io/v2';
//https://docs.coincap.io/?version=latest#ee30bea9-bb6b-469d-958a-d3e35d442d7a
function getAssets (){
    return fetch(`${url}/assets?limit=20`)
    .then(response => response.json())
    .then(response => response.data)
}

export default {
    getAssets
}