import { Api, StackContext, Table } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export function MyStack({ stack }: StackContext) {
  // Create a DynamoDB table
  const votes_table = new Table(stack, 'Votes', {
    fields: {
      what: 'string',
      count: 'number',
    },
    primaryIndex: { partitionKey: 'what' },
    cdk: {
      table: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  // Create a HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [votes_table],
      },
    },
    routes: {
      //"GET /votes": "functions/src/get-votes.handler",
      //"POST /votes": "functions/src/set-votes.handler",
    },
  });

  // Show the endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
