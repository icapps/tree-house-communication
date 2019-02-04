import { ITemplateRequest } from '../lib/goodModels/ITemplateRequest';
import { IMandrilTemplateRequest, IMergeVars, IRecipient } from '../lib/models/IMandrilTemplateRequest';

// tslint:disable-next-line:max-line-length
export function mapTemplateEmail(mailInfo: ITemplateRequest) : IMandrilTemplateRequest {

  // Map merge vars
  const mergeVars : IMergeVars[] = [];
  const recipients : IRecipient[] = [];

  mailInfo.to.map((recipient) => {
    const userMergeVars : IMergeVars = { rcpt: null, vars: [] };
    userMergeVars.rcpt = recipient.email;

    recipients.push({ email: recipient.email });
    if (recipient.content) {
      recipient.content.forEach((content : { name: string, value: string }) => {
        userMergeVars.vars.push({ name: content.name, content: content.value });
      });
      if (userMergeVars.vars.length > 0) {
        mergeVars.push(userMergeVars);
        console.log(mergeVars);
      }
    }
  });

// Build request object for mandrill
  const mailingRequest : IMandrilTemplateRequest = {
    template_name: mailInfo.templateName,
    template_content: [],
    message: {
      from_email: mailInfo.from.email,
      subject: mailInfo.subject,
      to: recipients,
      merge_vars: mergeVars,
      global_merge_vars: [],
    },
  };

  console.log('mailingREQ: ', mailingRequest);
  return mailingRequest;
}
