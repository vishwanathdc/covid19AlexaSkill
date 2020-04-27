/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('ask-sdk-core');

//
//  Imported Alexa Hanlders
//
const AMAZON_LaunchRequestHandler = require('./intent-handlers/alexa-handlers/launch-handler.js');
const AMAZON_RepeatIntentHandler = require('./intent-handlers/alexa-handlers/repeat-handler.js');
const AMAZON_HelpIntentHandler = require('./intent-handlers/alexa-handlers/help-handler.js');
const AMAZON_CancelAndStopIntentHandler = require('./intent-handlers/alexa-handlers/cancel-and-stop-handler.js');
const AMAZON_SessionEndedRequestHandler = require('./intent-handlers/alexa-handlers/session-ended-handler.js');
const AMAZON_FallbackIntentHandler = require('./intent-handlers/alexa-handlers/fallback-handler.js');
const AMAZON_ErrorHandler = require('./intent-handlers/alexa-handlers/error-handler.js');

const COVID_StatusHandler = require('./intent-handlers/status-handlers/status-handler.js');

AMAZON_ErrorHandler

//  Export Hanlders
//
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    AMAZON_LaunchRequestHandler,
    AMAZON_RepeatIntentHandler,
    AMAZON_HelpIntentHandler,
    AMAZON_CancelAndStopIntentHandler,
    AMAZON_SessionEndedRequestHandler,
    AMAZON_FallbackIntentHandler,
    COVID_StatusHandler
  )
  .addErrorHandlers(AMAZON_ErrorHandler)
  .lambda();