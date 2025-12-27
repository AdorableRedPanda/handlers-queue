import { Hono } from 'hono';

import { handle } from './handle';

const server = new Hono();

server.get('/', handle);

export { server };
