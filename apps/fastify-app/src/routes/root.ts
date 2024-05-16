import { FastifyPluginAsync } from 'fastify';
import { isEven } from '@dbd/is-even';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true, test: 'hello', even: isEven(2) };
  });

  fastify.get('/error', async function (request, reply) {
    try {
      throw new Error('oops - see my map?');
    } catch (e) {
      return { stack: e.stack };
    }
  });
};

export default root;
