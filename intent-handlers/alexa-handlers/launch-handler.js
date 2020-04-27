const Alexa = require('ask-sdk-core');

const AMAZON_LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //const speechText = process.env.WELCOME_MESSAGE;
        //let reprompt = process.env.FALLBACK_REPROMPT;
        const speechText = "Welcome to COVID nineteen status skill. You can ask, confirmed, recovered cases and deaths in any counrty.";
        const reprompt = "Welcome to COVID nineteen status skill. You can ask, confirmed, recovered cases and deaths in any counrty.";
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.lastSpeech = speechText;
        console.log(sessionAttributes);
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        console.log(speechText);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            //.withSimpleCard(process.env.SKILL_NAME, speechText)
            .withSimpleCard("COVID nineteen status skill", speechText)
            .getResponse();
    },
};

module.exports = AMAZON_LaunchRequestHandler; 