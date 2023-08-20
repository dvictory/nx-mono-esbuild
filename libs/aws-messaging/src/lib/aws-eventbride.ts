import { PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { ebClient } from './aws-client';

// Set the parameters.
export const params = {
  Entries: [
    {
      Detail: '{ "key1": "value1", "key2": "value2" }',
      DetailType: 'appRequestSubmitted',
      Source: 'com.company.app',
      EventBusName: 'default',
    },
  ],
};

export const run = async () => {
  try {
    const data = await ebClient.send(new PutEventsCommand(params));
    console.log('Success, event sent; requestID:', data);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
    return;
  }
};
// Uncomment this line to run execution within this file.
run();
