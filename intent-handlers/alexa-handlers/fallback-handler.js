const Alexa = require('ask-sdk-core');

const AMAZON_FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {

        const speechText = process.env.FALLBACK_MESSAGE;
        const reprompt = process.env.FALLBACK_REPROMPT;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard(process.env.SKILL_NAME, speechText)
            .getResponse();
    },
};

module.exports = AMAZON_FallbackIntentHandler;