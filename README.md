# Optin_SMS_API - BuyOnTrust

## Requirements

In order to test and deploy this lambda you will need to have:

- An AWS account (and a user created in it)
- the last version of AWS CLI tool installed and configured to use your AWS account
- Node.js (version >= 6.10) and NPM installed in your machine
- Serverless package installed globally in your machine (optional, only for local testing)
- A Twilio accountSID, token, and a Twilio number.

## Configuration

Before being able to test and deploy, you need to provided the needed configuration.

Configuration needs to be stored in a `.env` file (you can copy the template from the `.env.example` sample file) that will look like this:

```bash
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
```

Where:

- This connection string can be found by clicking the `Connect` button on your mongoDB cluster, within the Mongo Atlas dashboard.

## Install dependencies

After cloning the repo install the dependencies (with yarn because we're not heathens)...

```bash
cd optin-sms-api
yarn
```

## Local testing

In the root folder of this project, run:

```bash
yarn dev
```

## Deploy

```bash
yarn deploy
```

## Functions

```bash
    sendOptinText: optin--sms-api-prod-sendOptinText
```

## License

Licensed under [ISC License](/LICENSE).