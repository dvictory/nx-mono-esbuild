import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true };
  });

  fastify.get('/error', async function (request, reply) {
    try {
      throw new Error('oops - see my map?')
    } catch (e) {
      return { stack: e.stack };
    }

  });
};

export default root;
