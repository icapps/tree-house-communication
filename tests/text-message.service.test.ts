import { MessageListInstance } from 'twilio/lib/rest/api/v2010/account/message';

import { sendTextMessage, setTwilioAccountSid, setTwilioAuthToken } from '../src';

jest.mock('twilio', () => {
  return jest.fn().mockImplementation(() => {
    return {
      messages: {
        create: jest.fn().mockResolvedValue({}),
      } as unknown as MessageListInstance,
    };
  });
});

describe('text message service', () => {
  beforeEach(() => {
    setTwilioAccountSid('fake-account-id-for-testing');
    setTwilioAuthToken('fake-auth-token-for-testing');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendTextMessage', () => {
    it('Should send the text message correctly', async () => {
      const message = await sendTextMessage('+32476555555', '+32486229083', 'this is a test from icapps treehouse-communications');
      expect(message.errorMessage).not.toBeDefined();
    });

    it('Should throw an error when the provided api key is invalid', async () => {
      setTwilioAccountSid('');

      try {
        await sendTextMessage('+32476555555', '+32486229083', 'this is a test from icapps treehouse-communications');
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual('No twilio accountSid provided');
      }
    });

    it('Should throw an error when the provided api key is invalid', async () => {
      setTwilioAuthToken('');

      try {
        await sendTextMessage('+32476555555', '+32486229083', 'this is a test from icapps treehouse-communications');
      } catch (err) {
        expect(err.message).toEqual('No twilio authToken provided');
      }
    });
  });
});
