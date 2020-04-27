const Alexa = require('ask-sdk-core');

const AMAZON_ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        let errorMessage = process.env.ER_MESSAGE;
        let reprompt = process.env.FALLBACK_REPROMPT;

        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(reprompt)
            .withSimpleCard('Sorry ¯\_(ツ)_/¯', errorMessage)
            .getResponse();
    },
};

module.exports = AMAZON_ErrorHandler;