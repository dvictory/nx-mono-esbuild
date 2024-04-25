import pino from 'pino';
import { isEven } from '@dbd/is-even';

const logger = pino();

export async function GET(request: Request) {
  logger.info('fetching api data');
  return new Response('Hello, from API!!!' + ':' + new Date().toISOString() + ':' + isEven(2));
}

export const revalidate = 0;
