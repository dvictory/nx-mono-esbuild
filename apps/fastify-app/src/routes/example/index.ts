import { FastifyPluginAsync } from 'fastify';
import { isEven } from '@dbd/is-even';

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const now = new Date().getTime();
    const even = isEven(now);
    return `${now} is ${even ? '' : 'Not'} Even`;
  });
};

export default example;
