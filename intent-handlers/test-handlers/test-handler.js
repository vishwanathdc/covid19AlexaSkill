const Alexa = require('ask-sdk-core');

const ElasticQuery = {
    canHandle(handlerInput) {
        console.log("identified elasticquery");
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'ElasticQuery';
    },
    async handle(handlerInput) {
        let speechText = Constants.ERROR_MESSAGE;

        let slotvalue = handlerInput.requestEnvelope.request.intent.slots.searchquery.value;
        
        speechText = slotvalue;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Open Now', speechText)
            .getResponse();
       
      },
};