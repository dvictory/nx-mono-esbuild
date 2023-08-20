import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'sst-next-app',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        warm: 5,
        buildCommand: 'npx --yes open-next@2.0.5 build --build-command "nx run next-app:foo"',
        environment: {
          API_URL: 'https://api.getfwd.dev',
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
