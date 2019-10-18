const Messenger = require('./messenger.js');
const utils = require('./utils');

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken); // eslint-disable-line

module.exports.sendText = async (event) => {
  try {
    let response = utils.getResponseObject();
    // Object.assign(event, { from: twilioNumber });
    event.body.from = '18882747732';
    const messenger = new Messenger(twilioClient);
    
    console.log('sendEvent:', event)
    const message = await messenger.send(event);
        
        let body = JSON.stringify({
          message: 'Text message successfully sent!',
          data: message,
        });
        
        Object.assign(response, { body });

        return response;
  } catch(err) {
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