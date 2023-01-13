import { FastifyPluginAsync } from 'fastify';
import { isEven } from '@dbd/is-even';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    try {
      const now = new Date().getTime();
      const even = isEven(now);
      return `${now} is ${even ? '' : 'Not'} Even!`;
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  });
};

export default example;
