import { ICallback, Messages } from 'mandrill-api';

import { sendEmailWithTemplate, ITemplateRequest, setMandrillApiKey, SendTemplateParams } from '../src';

const testEmailAddress = 'testMail@icapps.com';

jest.mock('mandrill-api', () => {
  return {
    Mandrill: jest.fn().mockImplementation(() => {
      return {
        messages: {
          sendTemplate: jest.fn((params: SendTemplateParams, onsuccess?: ICallback) => {
            onsuccess(params);
          }),
        } as unknown as Messages,
      };
    }),
  };
});

describe('email service', () => {
  beforeEach(() => {
    setMandrillApiKey('fake-mandril-api-key-for-testing');
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  describe('sendEmailWithTemplate', () => {
    it('Should send the email correctly with values filled in for recipient', async () => {
      const mailInfo: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'My subject',
        from: { email: 'info@icapps.be', name: 'Info icapps' },
        to: [{ email: testEmailAddress, name: 'name', content: [{ name: 'firstname', value: 'Custom for recipient' }] }],
        globalContent: [
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
      };

      console.log('test123456');
      await sendEmailWithTemplate(mailInfo);
    });

    it('Should send email correctly with following parameters #2', async () => {
      const values: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'CC test email',
        from: { email: 'info@icapps.com', name: 'Info icapps' },
        to: [{ email: testEmailAddress, name: 'name', type: 'cc' }],
        globalContent: [
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
      };

      await sendEmailWithTemplate(values);
    });

    it('Should send email correctly with following following parameters #3', async () => {
      const values: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'Test array of strings',
        from: { email: 'info@icapps.com', name: 'Info icapps' },
        to: [testEmailAddress, 'anotherEmail@gmail.com'],
        globalContent: [
          // global
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
      };

      await sendEmailWithTemplate(values, { async: true, message: { bcc_address: 'test@gmail.com' } } as SendTemplateParams);
    });

    it('Should send email correctly with following following parameters #4', async () => {
      const values: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'Test array of strings',
        from: 'info@icapps.com',
        to: [testEmailAddress, 'anotherEmail@gmail.com'],
      };

      await sendEmailWithTemplate(values, { async: true, message: { bcc_address: 'test@gmail.com' } } as SendTemplateParams);
    });

    it('Should throw an error when the provided api key is invalid', async () => {
      // Overwrite mandrill api key with original value if none is provided
      setMandrillApiKey('');

      const mailInfo: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'My subject',
        from: { email: 'info@icapps.be', name: 'Info icapps' },
        to: [{ email: testEmailAddress, name: 'name', content: [{ name: 'firstname', value: 'Custom for recipient' }] }],
        globalContent: [
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
      };

      expect.assertions(2);
      try {
        await sendEmailWithTemplate(mailInfo);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('No Mandrill api key provided');
      }
    });
  });
});
