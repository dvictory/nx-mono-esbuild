import { awsMessaging, publishMessage } from './aws-messaging';
import { snsClient, sqsClient } from './aws-client';
import {
  CreateTopicCommand,
  SubscribeCommand,
  DeleteTopicCommand,
} from '@aws-sdk/client-sns';
import {
  CreateQueueCommand,
  DeleteQueueCommand,
  ReceiveMessageCommand,
  GetQueueAttributesCommand,
} from '@aws-sdk/client-sqs';
const TOPIC_NAME = 'events';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe('awsMessaging', () => {
  let arn: string | undefined;
  let qUrl: string | undefined;
  let qArn: string | undefined;

  beforeAll(async () => {
    const params = { Name: TOPIC_NAME };
    try {
      // Create Topic
      const data = await snsClient.send(new CreateTopicCommand(params));
      console.log('Success.', data);
      arn = data.TopicArn;

      // Create Q
      const qData = await sqsClient.send(
        new CreateQueueCommand({ QueueName: TOPIC_NAME })
      );
      qUrl = qData.QueueUrl;

      const attr = await sqsClient.send(
        new GetQueueAttributesCommand({
          QueueUrl: qUrl,
          AttributeNames: ['QueueArn'],
        })
      );
      if (attr.Attributes === undefined) return;

      qArn = attr.Attributes['QueueArn'];

      const subParams = {
        Protocol: 'sqs' /* required */,
        TopicArn: arn,
        Endpoint: qArn,
        Attributes: {
          RawMessageDelivery: 'true',
        },
      };

      // Subscribe Q to Topic
      await snsClient.send(new SubscribeCommand(subParams));
      return data; // For unit tests.
    } catch (err) {
      console.log('Error', err.stack);
      return;
    }
  });

  afterAll(async () => {
    try {
      const params = { TopicArn: arn };
      const data = await snsClient.send(new DeleteTopicCommand(params));
      await sqsClient.send(new DeleteQueueCommand({ QueueUrl: qUrl }));
      return data; // For unit tests.
    } catch (err: any) {
      console.log('Error', err.stack);
      return;
    }
  });

  it('should work', () => {
    expect(awsMessaging()).toEqual('aws-messaging');
  });

  it('should publish message', async () => {
    if (arn) {
      let resp = await publishMessage(arn, JSON.stringify({ id: 2 }));
      await sleep(2000);
      const data = await sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: qUrl,
          MessageAttributeNames: ['All'],
        })
      );
      console.log(data);
      if (data.Messages && data.Messages[0].Body)
        expect(JSON.parse(data.Messages[0].Body).id).toEqual(2);
    }
  });
});
