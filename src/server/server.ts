import { Hono } from 'hono';

import { handle } from './handle';
import { ping } from './ping';

const server = new Hono();

server.get('/', ping);
server.post('/handle', handle);

export { server };
