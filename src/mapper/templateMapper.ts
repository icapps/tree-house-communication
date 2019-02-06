import * as _ from 'lodash';
import { ITo, ITemplateRequest } from '../lib/models/ITemplateRequest';
import { IMandrilTemplateRequest, IMergeVars, IRecipient } from '../lib/models/IMandrilTemplateRequest';

export function mapTemplateEmail(mailInfo: ITemplateRequest): IMandrilTemplateRequest {
  // Build request object for mandrill
  const mailingRequest: IMandrilTemplateRequest = {
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

const mapMergeVars = (recipient: ITo | string): IMergeVars => {
  if (_.isString(recipient)) {
    return;
  }
  const vars: any[] = [];
  if (recipient.content) {
    recipient.content.forEach(content => vars.push({
      name: content.name,
      content: content.value,
    }));
  }
  return {
    vars,
    rcpt: recipient.email,
  };
};

const mapRecipient = (recipient: ITo | string) : IRecipient => {
  if (_.isString(recipient)) {
    return {
      email: recipient,
    };
  }
  return {
    email: recipient.email,
  };
};
