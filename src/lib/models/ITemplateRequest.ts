export interface Recipient {
  // A single recipient's information.
  to?: unknown[];

  // The email address of the recipient
  email: string;

  // The optional display name to use for the recipient
  name?: string;

  // The header type to use for the recipient, defaults to "to" if not provided
  type?: string;
}

export interface MergeVarInfo {
  // The merge variable's name. Merge variable names are case-insensitive and may not start with _
  name: string;

  // {Mixed} the merge variable's content
  content: unknown;
}

export interface MergeVar {
  // The email address of the recipient that the merge variables should apply to
  rcpt: string;

  // The recipient's merge variables
  vars: MergeVarInfo[];
}

interface RecipientMetaData {
  // The email address of the recipient that the metadata is associated with
  rcpt: string;

  // An associated array containing the recipient's unique metadata. If a key exists in both the per-recipient metadata and the global metadata, the per-recipient metadata will be used.
  values: unknown[];
}

interface Attachment {
  // The MIME type of the attachment
  type: string;

  // The file name of the attachment
  name: string;

  // The content of the attachment as a base64-encoded string
  content: string;
}

interface Image {
  // The MIME type of the image - must start with "image/"
  type: string;

  // The Content ID of the image - use <img src="cid:THIS_VALUE"> to reference the image in your HTML content
  name: string;

  // The content of the image as a base64-encoded string
  content: string;
}

interface Message {
  // The full HTML content to be sent
  html?: string;

  // Optional full text content to be sent
  text?: string;

  // The message subject
  subject?: string;

  // The sender email address.
  from_email: string;

  // Optional from name to be used
  from_name?: string;

  // An array of recipient information.
  to: Recipient[];

  // Optional extra headers to add to the message (most headers are allowed)
  headers?: Record<string, unknown>;

  // Whether or not this message is important, and should be delivered ahead of non-important messages
  important?: boolean;

  // Whether or not to turn on open tracking for the message
  track_opens?: boolean;

  // Whether or not to turn on click tracking for the message
  track_clicks?: boolean;

  // Whether or not to automatically generate a text part for messages that are not given text
  auto_text?: boolean;

  // Whether or not to automatically generate an HTML part for messages that are not given HTML
  auto_html?: boolean;

  // Whether or not to automatically inline all CSS styles provided in the message HTML - only for HTML documents less than 256KB in size
  inline_css?: boolean;

  // Whether or not to strip the query string from URLs when aggregating tracked URL data
  url_strip_qs?: boolean;

  // Whether or not to expose all recipients in to "To" header for each email
  preserve_recipients?: boolean;

  // Set to false to remove content logging for sensitive emails
  view_content_link?: boolean;

  // An optional address to receive an exact copy of each recipient's email
  bcc_address?: string;

  // A custom domain to use for tracking opens and clicks instead of mandrillapp.com
  tracking_domain?: string;

  // A custom domain to use for SPF/DKIM signing instead of mandrill (for "via" or "on behalf of" in email clients)
  signing_domain?: string;

  // A custom domain to use for the messages's return-path
  return_path_domain?: string;

  // Whether to evaluate merge tags in the message. Will automatically be set to true if either merge_vars or global_merge_vars are provided.
  merge?: boolean;

  // The merge tag language to use when evaluating merge tags, either mailchimp or handlebars
  merge_language?: string;

  // Global merge variables to use for all recipients. You can override these per recipient.
  global_merge_vars?: MergeVarInfo[];

  // Per-recipient merge variables, which override global merge variables with the same name.
  merge_vars?: MergeVar[];

  // An array of string to tag the message with.
  // Stats are accumulated using tags, though we only store the first 100 we see, so this should not be unique or change frequently.
  // Tags should be 50 characters or less.
  // Any tags starting with an underscore are reserved for internal use and will cause errors.
  // A single tag - must not start with an underscore
  tags?: string[];

  // The unique id of a subaccount for this message - must already exist or will fail with an error
  subaccount?: string;

  // An array of strings indicating for which any matching URLs will automatically have Google Analytics parameters appended to their query string automatically.
  google_analytics_domains?: unknown[];

  // Optional string indicating the value to set for the utm_campaign tracking parameter. If this isn't provided the email's from address will be used instead.
  google_analytics_campaign?: unknown[] | string;

  // Metadata an associative array of user metadata. Mandrill will store this metadata and make it available for retrieval. In addition, you can select up to 10 metadata fields to index and make searchable using the Mandrill search api.
  metadata?: unknown[];

  // Per-recipient metadata that will override the global values specified in the metadata parameter.
  recipient_metadata?: RecipientMetaData[];

  // An array of supported attachments to add to the message
  attachments?: Attachment[];

  // An array of embedded images to add to the message
  images?: Image[];
}

/**
 * Describes the info for the send function
 */
export interface SendParams {
  // The information on the message to send
  message: Message;

  // Async enable a background sending mode that is optimized for bulk sending. In async mode, messages/send will immediately return a status of "queued" for every recipient. To handle rejections when sending in async mode, set up a webhook for the 'reject' event. Defaults to false for messages with no more than 10 recipients; messages with more than 10 recipients are always sent asynchronously, regardless of the value of async.
  async?: boolean;

  // Ip_pool the name of the dedicated ip pool that should be used to send the message. If you do not have any dedicated IPs, this parameter has no effect. If you specify a pool that does not exist, your default pool will be used instead.
  ip_pool?: string;

  // Send_at when this message should be sent as a UTC timestamp in YYYY-MM-DD HH:MM:SS format. If you specify a time in the past, the message will be sent immediately. An additional fee applies for scheduled email, and this feature is only available to accounts with a positive balance.
  send_at?: string;
}

/**
 * Describes the info for the sendTemplate function
 */
export interface SendTemplateParams extends SendParams {
  // The immutable name or slug of a template that exists in the user's account. For backwards-compatibility, the template name may also be used but the immutable slug is preferred.
  template_name: string;

  // An array of template content to send.
  // Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block
  // The injection of a single piece of content into a single editable region
  template_content?: {
    // The name of the mc:edit editable region to inject into
    name: string;

    // The content to inject
    content: string;
  }[];
}

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
