import Mailchimp = require('@mailchimp/mailchimp_transactional');

import { getMandrillApiKey } from '../config/client-config';

/**
 * Return a default MailClient (Mandrill in this case)
 */
export function getClient(): Mailchimp.ApiClient {
  const apiKey = getMandrillApiKey();
  if (!apiKey) throw new Error('No Mandrill api key provided');
  return Mailchimp(apiKey);
}

/**
 * Send an email with a template from Mandrill/Mailchimp provided
 * @param {Object} options
 * @param {Object} client
 */
export async function sendTemplate(options: Mailchimp.SendTemplateMessageRequest, client: Partial<Mailchimp.ApiClient>): Promise<unknown> {
  return client.messages.sendTemplate(options);
}
