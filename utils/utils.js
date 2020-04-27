const moment = require('moment-timezone');
var Promise = require('promise');
var AWS = require('aws-sdk');

const Utils = {}

//function to correct speechtext
Utils.correctResponseForSSML = function (input) {

  if (input == null || (typeof input) != 'string' || input == '') {
    return input;
  }

  let output = input;

  output = output.replace('&', 'and');
  output = output.replace('@', 'at');

  return output;
}

//function to interpret day
Utils.interpretDay = function (day){
  let tempdate = moment().tz("America/Chicago").format('YYYY-MM-DD');
  let cur_Date = moment.tz(tempdate+" "+"00:00", 'America/Chicago');
  let checkDate = moment.tz(day, "YYYY-MM-DD", 'America/Chicago');

  let difference = checkDate.diff(cur_Date, 'days');

  if(difference == -1){
      return "yesterday";
  } 
  else if(difference == 0){
      return "today";
  }
  else if(difference == 1){
      return "tomorrow";
  }
  else{
      return "on " + checkDate.toISOString().slice(0, 10);
  }
}

//function to check empty object
Utils.isEmptyObject = function (obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//function to convert phpdow to jsdow
Utils.convertphpdowtojsdow = function (obj) {
  if(obj == 7){
      return 0;
  }
  return obj;
}

//function to get dlot values
Utils.getSlotValues = function (filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);

  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

//function for dynamodb utd-alexa-dynamic-skill connection and data retrival
var docClient = new AWS.DynamoDB.DocumentClient();

Utils.readUserData = function (id){
  return new Promise((resolve, reject) => {
      loadUserData(id, (res) => {
          resolve(res);
    });
  });
}

function loadUserData(id, callback) {
  let params = {
      TableName: 'utd-alexa-dynamic-skill',
      Key: {
          'id': id
      }
  };

  docClient.get(params, function (error, tempdata) {
      if (error) {
          return 'I am sorry, I am unable to retrieve data right now';
      } 
      else { 
          callback(tempdata.Item);
      }
  });
}

module.exports = Utils;