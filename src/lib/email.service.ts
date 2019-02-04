import * as mandrill from 'mandrill-api';
import * as config from '../config/client-config';
import { mapTemplateEmail } from '../mapper/templateMapper';
import { ITemplateRequest } from './goodModels/ITemplateRequest';

if (config.getMandrillApiKey() === '') throw new Error('No Mandrill api key provided');
const client = new mandrill.Mandrill(config.getMandrillApiKey(), process.env.LOG_LEVEL === 'debug');

export async function sendEmailWithTemplate(mailInfo: ITemplateRequest) {
  return new Promise((resolve, reject) => {

    const mailingRequest = mapTemplateEmail(mailInfo);

  // Send mail
    client.messages.sendTemplate(mailingRequest, (result) => {
      console.log(result);
      resolve(result);
    },                           (error) => {
      console.log(error);
      reject(error);
    });
  });
}
