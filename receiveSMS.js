const axios = require('axios');

exports.handler = (context, event, callback) => {
    const twilioClient = context.getTwilioClient();
    const from = event.From;
    const text = event.Body.toUpperCase();
    const bot_number = process.env.TWILIO_PHONE_NUMBER;

    if (text === 'YES') {
        twilioClient.messages.create({
            from: bot_number,
            to: from,
            body: 'Thanks for visiting BuyOnTrust.com. You\'ll hear from someone on our team shortly!'
        }, async (err, result) => {
            await optinUser(from);
            callback();
        });
    } else if (text === 'NO' || text === 'STOP') {
        twilioClient.messages.create({
            from: bot_number,
            to: from,
            body: 'Thanks for visiting BuyOnTrust.com. You\'ve declined to recieve helpful SMS communications from our Sales team. If you every wish to receive helpful tips from us, simply text \'yes\' to this number to optin. One final thing, If you have any questions about our Lease-To-Own process, please give us a call at (888)274-7732. One of our BuyOnTrust team members would be happy to help you. Have a great day!'
        }, async (err, result) => {
            await optoutUser(from);
            callback();
        });
    } else {
        twilioClient.messages.create({
            from: bot_number,
            to: from,
            body: 'Answer not recognized: Please respond with \'Yes\', \'No\', or \'Stop\'. Alternatively, give us a call to speak with a BuyOnTrust team member.'
        }, (err, result) => {
            callback();
        });
    }
};

async function optinUser(phone) {
    try {
        const optinURL = 'https://txwiu9toe5.execute-api.us-east-1.amazonaws.com/prod/user/optin/';
        return await axios.put(optinURL + phone);
    } catch (err) {
        console.log('Error updating user consent:', err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                error: err.name ? err.name : 'Exception',
                message: err.message ? err.message : 'Uknown error'
            })
        };
    }
}

async function optoutUser(phone) {
    try {
        const optoutURL = 'https://txwiu9toe5.execute-api.us-east-1.amazonaws.com/prod/user/optout/';
        const response = await axios.put(optoutURL + phone);
        return response;
    } catch (err) {
        console.log('Error updating user consent:', err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                error: err.name ? err.name : 'Exception',
                message: err.message ? err.message : 'Uknown error'
            })
        };
    }
}