const config =  {
  mandrillApiKey: 'YY5pkBrTRAXKodN-0CL38g',
};

export function getMandrillApiKey() {
  return config.mandrillApiKey;
}

export function setMandrillApiKey(key: string) {
  config.mandrillApiKey = key;
}
