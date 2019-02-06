import * as mandrill from 'mandrill-api';
import * as config from '../config/client-config';
import * as _ from 'lodash';
import { mapTemplateEmail } from '../mapper/templateMapper';
import { ITemplateRequest } from './models/ITemplateRequest';
import { IMandrilTemplateRequest } from './models/IMandrilTemplateRequest';

if (!config.getMandrillApiKey()) throw new Error('No Mandrill api key provided');
const client = new mandrill.Mandrill(config.getMandrillApiKey(), process.env.LOG_LEVEL === 'debug');

export async function sendEmailWithTemplate(mailInfo: ITemplateRequest, mandrillOptions?: any) {
  return new Promise((resolve, reject) => {

    let mailingRequest: IMandrilTemplateRequest = mapTemplateEmail(mailInfo);
    if (mandrillOptions) {
      mailingRequest = _.merge(mandrillOptions, mailingRequest);
    }

    client.messages.sendTemplate(mailingRequest, (result) => {
      console.log(result);
      resolve(result);
    },                           (error) => {
      console.log(error);
      reject(error);
    });
  });
}
