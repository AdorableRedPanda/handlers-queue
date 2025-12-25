import { server } from './server';

const PORT = Number(Bun.env.PORT);

Bun.serve({
	fetch: server.fetch,
	hostname: '0.0.0.0',
	port: PORT,
});

console.info(`🚀🚀🚀 Server running: http://localhost:${PORT}/ 🚀🚀🚀`);
