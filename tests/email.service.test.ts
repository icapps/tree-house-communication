import { sendEmailWithTemplate } from '../src/lib/email.service';
import { ITemplateRequest } from '../src/lib/goodModels/ITemplateRequest';

describe('email service', () => {
  describe('sendEmailWithTemplate', () => {
    it('Should send the email correctly with values filled in for recipient', async () => {

      /*
            // SCENARIO 1
          const values = {
              subject: 'My subject',
              from: 'info@icapps.com',
              to: 'brent@test.be',
              variables: [ // global
                { name: 'var1', value: 'myValue1' },
                { name: 'var2', value: 'myValue2' },
              ],
              ...allOtherOptions,
            }; */

      /*
      /*
            // SCENARIO 3
          const values = {
              subject: 'My subject',
              from: { email: 'info@icapps.com', name: 'Info icapps }',
              to: [{ email: 'brent@test.be', name: 'Brent', type: 'cc' }],
              variables: [ // global
                { name: 'var1', value: 'myValue1' },
                { name: 'var2', value: 'myValue2' },
              ],
              ...allOtherOptions,
            }; */

            // SCENARIO 3
      const mailInfo : ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'My subject',
        from: { email: 'info@icapps.be', name: 'Info icapps' },
        to: [{ email: 'ben.vanraemdonck@icapps.com', name: 'Ben', content: [{ name: 'firstname', value: 'Custom for Ben' }] }],
        globalContent: [ // global
                { name: 'var1', value: 'myValue1' },
                { name: 'var2', value: 'myValue2' },
        ],
      };

      await sendEmailWithTemplate(mailInfo);
    });

    /*
    it('Should send email correctly with following', async () => {
      // SCENARIO 2
      const values : ITemplateRequest = {
        templateName: '00-forgot-password',
        subject: 'My subject',
        from: { email: 'info@icapps.com', name: 'Info icapps' },
        to: ['brent@test.be'],
        globalContent: [ // global
          { name: 'var1', value: 'myValue1' },
          { name: 'var2', value: 'myValue2' },
        ],
        // Other mailchimp options should be supported too
        // TODO: ^
      };

      await sendEmailWithTemplate(values);
    });
    */
  });
});
