
export interface IMandrilTemplateRequest {
  template_name: string;
  template_content: [];
  message: {
    subject: string;
    from_email: string;
    to: IRecipient[];
    global_merge_vars: IGlobalMergeVars[];
    merge_vars: IMergeVars[];

    // optional properties
    html?: string;
    text?: string;
    important?: Boolean;
    track_opens?: Boolean;
    track_clicks?: Boolean;
    auto_text?: Boolean;
    auto_html?: Boolean;
    inline_css?: Boolean;
    url_strip_qs?: Boolean;
    preserve_recipients?: Boolean;
    view_content_link?: Boolean;
    bcc_address?: string;

  };

  // Optional mandrill properties
  tags?: [];
  subaccount?: string;
  google_analytics_domains?: [];
  async?: Boolean;
  send_at?: string;
}

export interface IRecipient {
  email: string;
}

interface IGlobalMergeVars {
  name: string;
  content: string;
}

export interface IMergeVars {
  rcpt: string;
  vars: {
    name: string;
    content: string;
  }[];
}
