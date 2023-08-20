import type { SSTConfig } from 'sst';
import { MyStack } from './stacks/MyStack';

export default {
  config() {
    return {
      name: 'sst-app',
      stage: 'dev',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      architecture: 'arm_64',
    });

    app.stack(MyStack);
  },
} satisfies SSTConfig;
