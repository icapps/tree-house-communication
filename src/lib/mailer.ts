import * as mandrill from 'mandrill-api';
import { getMandrillApiKey } from '../config/client-config';
import { MailClient, TemplateMailOptions } from './models/ITemplateRequest';

/**
 * Return a default MailClient (Mandrill in this case)
 */
export function getClient(): mandrill.Mandrill {
  const apiKey = getMandrillApiKey();
  if (!apiKey) throw new Error('No Mandrill api key provided');
  return new mandrill.Mandrill(apiKey, process.env.LOG_LEVEL === 'debug');
}

/**
 * Send an email with a template from Mandrill/Mailchimp provided
 * @param {Object} options
 * @param {Object} client
 */
export async function sendTemplate(options: TemplateMailOptions, client: MailClient): Promise<void> {
  return new Promise((resolve, reject) => {
    client.messages.sendTemplate(options, (result: any) => {
      resolve(result);
    }, (error: any) => {
      reject(error);
    });
  });
}
