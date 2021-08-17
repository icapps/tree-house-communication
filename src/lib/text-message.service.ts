import * as twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

import { getTwilioAccountSid, getTwilioAuthToken } from '../config/client-config';

/**
 * Return a default MailClient (Mandrill in this case)
 */
function getClient(): twilio.Twilio {
  const accountSid = getTwilioAccountSid();
  const authToken = getTwilioAuthToken();
  if (!accountSid) throw new Error('No twilio accountSid provided');
  if (!authToken) throw new Error('No twilio authToken provided');
  return twilio(accountSid, authToken);
}

/**
 * Send text messages to phone numbers
 * @returns {Object}
 * @param fromNumber
 * @param toNumber
 * @param message
 */
export function sendTextMessage(fromNumber: string, toNumber: string, message: string): Promise<MessageInstance> {
  const client: twilio.Twilio = getClient();
  return client.messages.create({
    body: message,
    from: fromNumber,
    to: toNumber,
  });
}
