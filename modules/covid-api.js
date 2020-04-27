const rp = require('request-promise');

const covidUrl = "https://api.covid19api.com/summary";

const covidAPI = {};

covidAPI.getCovidData = function () {

    var options = {
        method: 'GET',
        uri: covidUrl,
        formData: {
            
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options)
}

module.exports = covidAPI;