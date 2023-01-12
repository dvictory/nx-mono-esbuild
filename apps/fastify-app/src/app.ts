import { FastifyPluginAsync } from 'fastify';
import root from './routes/root';
import example from './routes/example/index';

export type AppOptions = {
  // Place your custom options for app below here.
};

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // void fastify.register(AutoLoad, {
  //   dir: join(__dirname, 'plugins'),
  //   options: opts
  // })

  fastify.register(root);
  fastify.register(example, { prefix: '/example' });
};

export default app;
export { app, options };
