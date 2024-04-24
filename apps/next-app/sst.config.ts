import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';
import DopplerSDK from '@dopplerhq/node-sdk';
const doppler = new DopplerSDK({ accessToken: '' });

const vpcSubnets = {
  subnetType: SubnetType.PRIVATE_WITH_EGRESS,
};

export default {
  config(_input) {
    return {
      name: 'sst-next-app',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(async function Site({ stack }) {
      const res = await doppler.secrets.list('forward-apps', 'dev', {
        accepts: 'application/json',
      });
      const envVars = {};
      Object.keys(res.secrets).forEach(function (key) {
        envVars[key] = res.secrets[key].computed;
      });
      console.log(envVars);

      const site = new NextjsSite(stack, 'site', {
        warm: 1,
        // buildCommand: 'npx --yes open-next@2.0.5 build --build-command "nx run next-app:foo"',
        buildCommand: 'npx --yes open-next@2.0.5 build --build-command "echo fake-building"',
        environment: {
          API_URL: 'https://api.getfwd.dev',
        },
        customDomain: {
          alternateNames: [],
          domainName: 'nextjs.sst.dbd-dev.com',
          // domainAlias: '*.sst.dbd-dev.com',
          hostedZone: 'sst.dbd-dev.com',
        },
        // cdk: {
        //   server: {
        //     vpc: Vpc.fromLookup(stack, 'VPC', {
        //       vpcId: 'vpc-xxxxxxxxxx',
        //     }),
        //     vpcSubnets: vpcSubnets,
        //   },
        // },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
