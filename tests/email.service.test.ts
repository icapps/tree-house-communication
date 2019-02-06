import { sendEmailWithTemplate } from '../src/lib/email.service';
import { ITemplateRequest } from '../src/lib/models/ITemplateRequest';

const testMail = 'ben.vanraemdonck@icapps.com';

describe('email service', () => {
  describe('sendEmailWithTemplate', () => {
    it('Should send the email correctly with values filled in for recipient', async () => {

      const mailInfo : ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'My subject',
        from: { email: 'info@icapps.be', name: 'Info icapps' },
        to: [{ email: testMail, name: 'Ben', content: [{ name: 'firstname', value: 'Custom for Ben' }] }],
        globalContent: [ // global
                { name: 'var1', value: 'myValue1' },
                { name: 'var2', value: 'myValue2' },
        ],
      };

      await sendEmailWithTemplate(mailInfo);
    });

    it('Should send email correctly with following parameters #2', async () => {

      // SCENARIO 3
      const values : ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'CC test email',
        from: { email: 'info@icapps.com', name: 'Info icapps' },
        to: [{ email: testMail, name: 'Brent', type: 'cc' }],
        globalContent: [ // global
                { name: 'var1', value: 'myValue1' },
                { name: 'var2', value: 'myValue2' },
        ],
          // TODO all other options
      };

      await sendEmailWithTemplate(values);
    });

    it('Should send email correctly with following following parameters #3', async () => {
      // SCENARIO 2
      const values : ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'Test array of strings',
        from: { email: 'info@icapps.com', name: 'Info icapps' },
        to: [testMail, 'anotherEmail@gmail.com'],
        globalContent: [ // global
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
        // Other mailchimp options should be supported too
        // TODO: ^
      };
      await sendEmailWithTemplate(values, { async: true, message: { bcc_address: 'test@gmail.com' } });
    });

    /*
    it('Should send email correctly with following parameters #4', async () => {
      // SCENARIO 1
      const values: ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'Single to email',
        from: 'info@icapps.com',
        to: testMail,
        globalContent: [ // global
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
        // ...allOtherOptions,
      };

      await sendEmailWithTemplate(values);
    });
    */
  });
});
