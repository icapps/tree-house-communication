const config = {
  mandrillApiKey: '',
  twilioAccountSid: '',
  twilioAuthToken: '',
};

/**
 * Get Mandrill Api Key
 * @returns {String}
 */
export const getMandrillApiKey = (): string => config.mandrillApiKey;

/**
 * Set Mandrill Api Key
 * @param {String} key
 * @returns {String}
 */
export const setMandrillApiKey = (key: string): string => (config.mandrillApiKey = key);

/**
 * Get Twilio Account SID
 * @returns {String}
 */
export const getTwilioAccountSid = (): string => config.twilioAccountSid;

/**
 * Set Twilio Account SID
 * @param {String} key
 * @returns {String}
 */
export const setTwilioAccountSid = (key: string): string => (config.twilioAccountSid = key);

/**
 * Get Twilio Auth Token
 * @returns {String}
 */
export const getTwilioAuthToken = (): string => config.twilioAuthToken;

/**
 * Set Twilio Auth Token
 * @param {String} key
 * @returns {String}
 */
export const setTwilioAuthToken = (key: string): string => (config.twilioAuthToken = key);
