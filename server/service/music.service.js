const axios = require('axios')
const constants = require('../util/constants')

function find(query) {
    return axios.get(`${constants.ITUNES_BASE_API}/search?term=${query.search}&media=music&explicit=No`)
}

exports.find = find