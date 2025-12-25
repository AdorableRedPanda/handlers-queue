import { Hono } from 'hono';
import { ping } from './ping';
import { handle } from './handle';

const server = new Hono();

server.get('/', ping);
server.post('/handle', handle);

export { server };