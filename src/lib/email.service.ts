import * as mandrill from 'mandrill-api';
import * as _ from 'lodash';
import { getMandrillApiKey }  from '../config/client-config';
import { mapTemplateEmail } from '../mapper/templateMapper';
import { ITemplateRequest } from './models/ITemplateRequest';
import { IMandrilTemplateRequest } from './models/IMandrilTemplateRequest';

export async function sendEmailWithTemplate(mailInfo: ITemplateRequest, mandrillOptions?: any) {

  if (!getMandrillApiKey()) throw new Error('Mandrill Api key is missing, please provide one with setMandrillApiKey()');
  const client = new mandrill.Mandrill(getMandrillApiKey(), process.env.LOG_LEVEL === 'debug');

  return new Promise((resolve, reject) => {

    let mailingRequest: IMandrilTemplateRequest = mapTemplateEmail(mailInfo);
    if (mandrillOptions) {
      mailingRequest = _.merge(mandrillOptions, mailingRequest);
    }

    client.messages.sendTemplate(mailingRequest, (result) => {
      resolve(result);
    },                           (error: Error) => {
      reject(new Error(`Could not send email with template: ${error.message}`));
    });
  });
}
