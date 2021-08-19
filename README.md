# Treehouse Communication

Communication module written in TypeScript providing communication utilities.

[![npm version](https://badge.fury.io/js/%40icapps%2Ftree-house-communication.svg)](https://badge.fury.io/js/%40icapps%2Ftree-house-communication)
[![Dependencies](https://david-dm.org/icapps/tree-house-communication.svg)](https://david-dm.org/icapps/tree-house-communication.svg)
[![Build Status](https://travis-ci.org/icapps/tree-house-communication.svg?branch=master)](https://travis-ci.org/icapps/tree-house-communication)
[![Coverage Status](https://coveralls.io/repos/github/icapps/tree-house-communication/badge.svg)](https://coveralls.io/github/icapps/tree-house-communication)
[![Greenkeeper badge](https://badges.greenkeeper.io/icapps/tree-house-communication.svg)](https://greenkeeper.io/)

## General

This module is used to send emails with Mandrill and only template requests (for now).

## Installation

```shell
npm install @icapps/tree-house-communication
```

## Usage examples

### Email using the mandrill api:

```typescript
import * as treeHouse from 'tree-house-communication';

// set Mandrill API key
treeHouse.setMandrillApiKey('secretMandrillKey');

// Create email(s)
const mailInfo: ITemplateRequest = {
  templateName: 'icapps-newsletter-template',
  subject: 'My subject',
  from: { email: 'info@icapps.be', name: 'Info icapps' },
  to: [{
    email: 'testAddress@gmail.com', name: 'Optional',
    content: [{ name: 'greeting', value: 'Hello test!' }]
  }],
  globalContent: [{ name: 'news', value: 'content of big news' }],
};

const extraMandrillOptions = {
  async: true,
  message: { bcc_address: 'test@gmail.com' }
}

// Send email(s)
const result = await treeHouse.sendEmailWithTemplate(mailInfo, extraMandrillOptions);
```

// example result

```json
[
  {
    "email": "email@mail.com",
    "status": "queued",
    "_id": "e8b9d10ea47e47629d95b22fe200389d"
  },
  {
    "email": "anotherEmail@mail.com",
    "status": "queued",
    "_id": "308274f983f14eb09d266dd9abe51546"
  }
]
```

See all [extraMandrillOptions](https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template)



### Send text message using twilio:

```typescript
import * as treeHouse from 'tree-house-communication'

// set Mandrill API key
treeHouse.setTwilioAccountSid('twilioAccountSid');
treeHouse.setTwilioAuthToken('twilioAuthToken');

// Send text message
const result = await treeHouse.sendTextMessage(mailInfo, extraMandrillOptions);
```

// example result
```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}
```

## Tests

- You can run `npm run test` to run all tests
- You can run `npm run test:coverage` to run all tests with coverage report

## Authors

See the list of [contributors](https://github.com/icapps/tree-house-communication/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
