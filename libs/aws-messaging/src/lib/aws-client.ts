import { SNSClient } from '@aws-sdk/client-sns';
import { SQSClient } from '@aws-sdk/client-sqs';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';

// Set the AWS Region.
const REGION = 'us-east-1'; //e.g. "us-east-1"
const END_POINT = 'http://127.0.0.1:4566';
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION, endpoint: END_POINT });
const sqsClient = new SQSClient({ region: REGION, endpoint: END_POINT });
const ebClient = new EventBridgeClient({ region: REGION });

export { snsClient, sqsClient, ebClient };
