const Alexa = require('ask-sdk-core');
const covidAPI = require('../../modules/covid-api.js');
const Utils = require('../../utils/utils.js');

var map = {};
map['NewConfirmed'] = " new confirmed";
map['TotalConfirmed'] = " total confirmed";
map['NewDeaths'] = " new deaths";
map['TotalDeaths'] = " total deaths";
map['NewRecovered'] = " new recovered";
map['TotalRecovered'] = " total recovered";

const COVID_StatusHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'covid_status';
    },
    async handle(handlerInput) {

        let speechText = "I am sorry, there has been some internal error";
        let slotValues = Utils.getSlotValues(handlerInput.requestEnvelope.request.intent.slots);
        let StatusName = slotValues.status.resolved;
        let CountryName = handlerInput.requestEnvelope.request.intent.slots.country.value;
        let GlobalName = handlerInput.requestEnvelope.request.intent.slots.global.value;

        var count = 0;

        if(!Utils.isEmptyObject(GlobalName)){
            await covidAPI.getCovidData().then(function (value) {

                for(const status in value.Global){
                    if(status === StatusName){
                        count = value.Global[status];
                    }
                }
                       
            }, function (error) {
                speechText = "I am sorry, there has been some internal error";
            });
        }
        else{
            await covidAPI.getCovidData().then(function (value) {

                value.Countries.forEach(function (information) {
                    if (information.Country.toUpperCase() == CountryName.toUpperCase()) {
                        for(const status in information){
                            if(status === StatusName){
                                count = information[status];
                            }
                        }
                    }
                });
                   
            }, function (error) {
                speechText = "I am sorry, there has been some internal error";
            });
        }

        speechText = `There are ${count} `;
        for(var i in map){
            if(i == StatusName){
                speechText += map[i];
            }
        }

        if(!Utils.isEmptyObject(GlobalName)){
            speechText += ` globally.`;
        }
        else{
            speechText += ` in ${CountryName}.`;
        }
        
        
        speechText = Utils.correctResponseForSSML(speechText);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.lastSpeech = speechText;
        console.log("attributes: ", sessionAttributes.lastSpeech);
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        speechText += " You can ask more questions on covid 19 status or say stop to exit. Thank you";
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Open Now', speechText)
            .getResponse();
    },
};

module.exports = COVID_StatusHandler;