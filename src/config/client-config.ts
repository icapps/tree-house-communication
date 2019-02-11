const config =  {
  mandrillApiKey: '',
};

export const getMandrillApiKey = () => {
  return config.mandrillApiKey;
};

export const setMandrillApiKey = (key: string)  => {
  config.mandrillApiKey = key;
};
