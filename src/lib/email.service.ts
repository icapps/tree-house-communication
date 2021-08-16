import * as _ from 'lodash';

import { mapTemplateEmail } from '../mapper/templateMapper';
import { sendTemplate, getClient } from './mailer';
import { ITemplateRequest, SendTemplateParams } from './models/ITemplateRequest';

/**
 * Send email with a template
 *
 * @param {Object} mailInfo
 * @param {Any} mandrillOptions
 * @returns {Object}
 */
export async function sendEmailWithTemplate(mailInfo: ITemplateRequest, mandrillOptions: Partial<SendTemplateParams> = {}): Promise<unknown> {
  const client = getClient();

  let content: SendTemplateParams = mapTemplateEmail(mailInfo);
  content = _.merge(mandrillOptions, content);
  return sendTemplate(content, client);
}
