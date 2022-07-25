import * as _ from 'lodash';
import { SendTemplateMessageRequest } from '@mailchimp/mailchimp_transactional';

import { mapTemplateEmail } from '../mapper/templateMapper';
import { sendTemplate, getClient } from './mailer';
import { ITemplateRequest } from './models/ITemplateRequest';

/**
 * Send email with a template
 *
 * @param {Object} mailInfo
 * @param {Any} mandrillOptions
 * @returns {Object}
 */
export async function sendEmailWithTemplate(mailInfo: ITemplateRequest, mandrillOptions: Partial<SendTemplateMessageRequest> = {}): Promise<unknown> {
  const client = getClient();
  let content: SendTemplateMessageRequest = mapTemplateEmail(mailInfo);
  content = _.merge(mandrillOptions, content);

  return sendTemplate(content, client);
}
