import * as _ from 'lodash';
import { mapTemplateEmail } from '../mapper/templateMapper';
import { sendTemplate, getClient } from './mailer';
import { TemplateMailOptions, ITemplateRequest } from './models/ITemplateRequest';

/**
 * Send email with a template
 *
 * @param {Object} mailInfo
 * @param {Any} mandrillOptions
 * @returns {Object}
 */
export async function sendEmailWithTemplate(mailInfo: ITemplateRequest, mandrillOptions: any = {}): Promise<void> {
  const client = getClient();

  let content: TemplateMailOptions = mapTemplateEmail(mailInfo);
  content = _.merge(mandrillOptions, content);
  return sendTemplate(content, client);
}
