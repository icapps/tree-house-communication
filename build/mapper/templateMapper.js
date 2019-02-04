"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapTemplateEmail(mailInfo) {
    const mergeVars = [];
    const recipients = [];
    mailInfo.to.map((recipient) => {
        const userMergeVars = { rcpt: null, vars: [] };
        userMergeVars.rcpt = recipient.email;
        recipients.push({ email: recipient.email });
        if (recipient.content) {
            recipient.content.forEach((content) => {
                userMergeVars.vars.push({ name: content.name, content: content.value });
            });
            if (userMergeVars.vars.length > 0) {
                mergeVars.push(userMergeVars);
                console.log(mergeVars);
            }
        }
    });
    const mailingRequest = {
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
exports.mapTemplateEmail = mapTemplateEmail;
