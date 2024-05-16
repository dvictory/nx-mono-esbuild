//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');

const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  // https://github.com/nrwl/nx/issues/16658 - added tryin to get nx run next-app:build to work
  transpilePackages: ['@dbd/is-even'],
  webpack: (config, options) => {
    // config.devtool = 'hidden-source-map'; // TODO DV not sure why this hear
    return config;
  },
};

module.exports = withNx(nextConfig);
