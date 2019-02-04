
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

  };

  // Optional mandrill properties
  tags?: [];
  subaccount?: string;
  google_analytics_domains?: [];

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
