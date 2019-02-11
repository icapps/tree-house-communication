# Treehouse boilerplate

Boilerplate module written in typescript

[![npm version](https://badge.fury.io/js/tree-house-communication.svg)](https://badge.fury.io/js/tree-house-communication)
[![Dependencies](https://david-dm.org/icapps/tree-house-communication.svg)](https://david-dm.org/icapps/tree-house-communication.svg)
[![Build Status](https://travis-ci.org/icapps/tree-house-communication.svg?branch=master)](https://travis-ci.org/icapps/tree-house-communication)
[![Coverage Status](https://coveralls.io/repos/github/icapps/tree-house-communication/badge.svg)](https://coveralls.io/github/icapps/tree-house-communication)

## General
This module is used to send emails with Mandrill and only template requests (for now).

## Installation

```shell
npm install tree-house-communication
```
## Usage example

```javascript
import * as emailService from 'tree-house-communication'

// set Mandrill API key
emailService.setMandrillApiKey('secretMandrillKey')

// Create email(s)
const mailInfo : ITemplateRequest = {
        templateName: 'icapps-newsletter-template',
        subject: 'My subject',
        from: { email: 'info@icapps.be', name: 'Info icapps' },
        to: [{ email: 'testAddress@gmail.com', name: 'Optional',
         content: [{ name: 'greeting', value: 'Hello test!' }] }],
        globalContent: [{ name: 'news', value: 'content of big news' }],
      };

      const extraMandrillOptions = {
         async: true,
         message: { bcc_address: 'test@gmail.com' } 
         }

      // Send email(s)
      await sendEmailWithTemplate(mailInfo, extraMandrillOptions);
```

See all  [extraMandrillOptions](https://mandrillapp.com/api/docs/messages.JSON.html#method=send-template)



## Tests

  You can run `npm run test` to run all tests
  You can run `npm run test:coverage` to run all tests with coverage report

## Authors

See the list of [contributors](https://github.com/icapps/tree-house-communication/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
