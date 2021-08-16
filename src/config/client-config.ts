const config = {
  mandrillApiKey: '',
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
