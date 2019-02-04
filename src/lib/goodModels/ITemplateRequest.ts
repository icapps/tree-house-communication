export interface ITemplateRequest {
  templateName: string;
  subject: string;
  from: { email: string, name?: string };
  to: ITo[];
  globalContent: { name: string, value: string }[];
}

export interface ITo {
  email: string;
  name?: string;
  type?: string;
  content? : {
    name: string;
    value: string;
  }[];
}
