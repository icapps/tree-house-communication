export interface MailClient {
  messages: {
    send: Function;
    sendTemplate: Function;
  };
}

export interface MailOptions {
  message: {
    html?: string;
    text?: string;
    subject?: string;
    from_email: string;
    from_name?: string;
    to: {
      email: string;
      name?: string;
      type?: 'to'
    }[];
    headers?: {};
    bcc_address?: string;
    merge?: boolean;
    merge_language?: 'mailchimp' | 'handlebars';
    merge_vars: IMergeVars[];
    global_merge_vars?: {
      name: string;
      content: string;
    }[];
    attachments?: {
      type: string;
      name: string;
      content: string; // base64 content
    }[];
  };
  async?: boolean;
  send_at?: string;
  ip_pool?: string;
}

export interface TemplateMailOptions extends MailOptions {
  template_name: string;
  template_content?: {
    name: string;
    content: string;
  }[];
}

export interface ITemplateRequest {
  templateName: string;
  templateContent?: any[];
  subject: string;
  from:  { email: string, name?: string } | string;
  to: (ITo | string)[];
  globalContent?: { name: string, value: string }[];
}

export interface ITo {
  email: string;
  name?: string;
  type?: string;
  content?: {
    name: string;
    value: string;
  }[];
}

export interface IRecipient {
  email: string;
}

export interface IMergeVars {
  rcpt: string;
  vars: {
    name: string;
    content: string;
  }[];
}
