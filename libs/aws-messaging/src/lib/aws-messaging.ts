import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns';
import { snsClient } from './aws-client';

export function awsMessaging(): string {
  return 'aws-messaging';
}

export async function publishMessage(
  topicArn: string,
  message: string
): Promise<PublishCommandOutput | undefined> {
  let params = {
    // Message: message, // MESSAGE_TEXT
    TopicArn: topicArn, //TOPIC_ARN
    Message: JSON.stringify({ default: message }),
    MessageStructure: 'json',
  };
  try {
    const data = await snsClient.send(new PublishCommand(params));
    return data; // For unit tests.
  } catch (err) {
    // @ts-ignore
    console.log('Error', err.stack);
    throw err;
  }
}
