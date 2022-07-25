export interface ITemplateRequest {
  templateName: string;
  templateContent?: {
    name: string;
    content: string;
  }[];
  subject: string;
  from: { email: string; name?: string } | string;
  to: (ITo | string)[];
  globalContent?: { name: string; value: string }[];
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
