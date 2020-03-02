const Messenger = require('./messenger.js');
const utils = require('./utils');

const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendText = async (event, context) => {
  try {
    console.log('context:', context);
    const messenger = new Messenger(twilioClient);
    console.log('client:', twilioClient)
    let response = utils.getResponseObject();

    Object.assign(event, { from:  '18882747732'});

    const message = await messenger.send(event);
      
        let body = JSON.stringify({
          message: 'Text message successfully sent!',
          data: message,
        });
        
        Object.assign(response, { body });

        return response;
  }
  catch(err) {
    console.log(
      'Error in serverless side, sending optin SMS:',
      err
    );
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(err.message ?
        'Could not send optin SMS: Serverless error:' + err.message :
        'Uknown error: Could not send optin SMS to the user. Serverless error:'
      )
    };
  }
};