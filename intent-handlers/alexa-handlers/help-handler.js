const Alexa = require('ask-sdk-core');

const AMAZON_HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = process.env.HELP_MESSAGE;
        const reprompt = process.env.HELP_REPROMPT;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard('Help', speechText)
            .getResponse();
    },
};

module.exports = AMAZON_HelpIntentHandler;