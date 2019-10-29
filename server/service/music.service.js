const axios = require('axios')
const constants = require('../util/constants')

artists = [
    'lady+gaga',
    'luke+bryan',
    'blackmill',
    'onerepublic'
]

function find(query) {
    return axios.get(`${constants.ITUNES_BASE_API}/search?term=${query.search}&media=music&explicit=No`)
}

function discover() {
    const artist = artists[Math.floor(Math.random() * artists.length)]
    return axios.get(`${constants.ITUNES_BASE_API}/search?term=${artist}&media=music&explicit=No&limit=3`)
}

exports.find = find
exports.discover = discover