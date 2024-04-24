//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');
const { setupHoneybadger } = require('@honeybadger-io/nextjs');

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

const honeybadgerNextJsConfig = {
  // Disable source map upload (optional)
  disableSourceMapUpload: false,

  // Hide debug messages (optional)
  silent: false,

  // More information available at @honeybadger-io/webpack: https://github.com/honeybadger-io/honeybadger-js/tree/master/packages/webpack
  webpackPluginOptions: {
    // Required if you want to upload source maps to Honeybadger
    apiKey: process.env.NEXT_PUBLIC_HONEYBADGER_API_KEY,

    // Required if you want to upload source maps to Honeybadger
    assetsUrl: process.env.NEXT_PUBLIC_HONEYBADGER_ASSETS_URL,

    revision: process.env.NEXT_PUBLIC_HONEYBADGER_REVISION,
    endpoint: 'https://api.honeybadger.io/v1/source_maps',
    ignoreErrors: false,
    retries: 3,
    workerCount: 5,
    deploy: {
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
      repository: 'https://url.to.git.repository',
      localUsername: 'username',
    },
  },
};

module.exports = withNx(setupHoneybadger(nextConfig, honeybadgerNextJsConfig));
//module.exports = setupHoneybadger(nextConfig, honeybadgerNextJsConfig);
//module.exports = withNx(nextConfig);
//module.exports = setupHoneybadger(withNx(nextConfig), honeybadgerNextJsConfig);
