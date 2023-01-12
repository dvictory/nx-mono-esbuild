// import * as dotenv from 'dotenv'
// dotenv.config()

import { fastify } from 'fastify';
import appService from './app';
// import closeWithGrace from 'close-with-grace';

// Instantiate fastify with some config
const app = fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
// const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
//   if (err) {
//     app.log.error(err)
//   }
//   await app.close()
// })

app.addHook('onClose', (instance, done) => {
  // closeListeners.uninstall()
  done();
});

// Start listening.
app.listen({ port: +process.env.PORT || 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
