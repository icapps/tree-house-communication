import * as _ from 'lodash';
import { ITo, TemplateMailOptions, ITemplateRequest, IMergeVars, IRecipient } from '../lib/models/ITemplateRequest';

/**
 * Map template email
 * @param {Object} mailInfo
 * @returns {Object}
 */
export function mapTemplateEmail(mailInfo: ITemplateRequest): TemplateMailOptions {
  // Build request object for mandrill
  const mailingRequest: TemplateMailOptions = {
    template_name: mailInfo.templateName,
    template_content: [],
    message: {
      from_email: _.isString(mailInfo.from) ? mailInfo.from : mailInfo.from.email,
      subject: mailInfo.subject,
      to: mailInfo.to.map(mapRecipient),
      merge_vars: mailInfo.to.map(mapMergeVars),
      global_merge_vars: [],
    },
  };

  return mailingRequest;
}

/**
 * Map merge vars
 * @param {Object|String} recipient
 * @returns {Object}
 */
const mapMergeVars = (recipient: ITo | string): IMergeVars => {
  if (_.isString(recipient)) {
    return;
  }
  const vars: any[] = recipient.content ? recipient.content.map(content => ({
    name: content.name,
    content: content.value,
  })) : [];

  return {
    vars,
    rcpt: recipient.email,
  };
};

/**
 * Map recipient
 * @param {Object|String} recipient
 * @returns {Object}
 */
const mapRecipient = (recipient: ITo | string): IRecipient => {
  if (_.isString(recipient)) {
    return {
      email: recipient,
    };
  }
  return {
    email: recipient.email,
  };
};
