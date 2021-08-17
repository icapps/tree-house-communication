import { Mandrill } from 'mandrill-api';

import { getMandrillApiKey } from '../config/client-config';
import { SendTemplateParams } from './models/ITemplateRequest';

/**
 * Return a default MailClient (Mandrill in this case)
 */
export function getClient(): Mandrill {
  const apiKey = getMandrillApiKey();
  if (!apiKey) throw new Error('No Mandrill api key provided');
  return new Mandrill(apiKey, process.env.LOG_LEVEL === 'debug');
}

/**
 * Send an email with a template from Mandrill/Mailchimp provided
 * @param {Object} options
 * @param {Object} client
 */
export async function sendTemplate(options: SendTemplateParams, client: Partial<Mandrill>): Promise<unknown> {
  return new Promise<unknown>((resolve, reject) => {
    console.log('sendTemplate: ' + client.messages.sendTemplate);
    client.messages.sendTemplate(
      options,
      (result: unknown) => {
        console.log('resolved');
        resolve(result);
      },
      (error: unknown) => {
        console.log('rejected');
        reject(error);
      },
    );
  });
}
