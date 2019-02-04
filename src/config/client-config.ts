const config =  {
  mandrillApiKey: 'secret key comes here',
};

export function getMandrillApiKey() {
  return config.mandrillApiKey;
}

export function setMandrillApiKey(key: string) {
  config.mandrillApiKey = key;
}
