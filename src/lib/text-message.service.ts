import * as twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

import { getTwilioAccountSid, getTwilioAuthToken } from '../config/client-config';

/**
 * Return a twilio client
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
 * @param {String} fromNumber
 * @param {String} toNumber
 * @param {String} message
 * @returns {Object}
 */
export function sendTextMessage(fromNumber: string, toNumber: string, message: string): Promise<MessageInstance> {
  const client: twilio.Twilio = getClient();
  return client.messages.create({
    body: message,
    from: fromNumber,
    to: toNumber,
  });
}
