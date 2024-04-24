import pino from 'pino';

const logger = pino();

export async function GET(request: Request) {
  logger.info('fetching api data');
  return new Response('Hello, from API!!!' + ':' + new Date().toISOString());
}
