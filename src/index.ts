import { server } from './server';

const PORT = Number(Bun.env.PORT);

Bun.serve({
	fetch: server.fetch,
	port: PORT,
	hostname: '0.0.0.0',
});

console.info(`🚀🚀🚀 Server running: http://localhost:${PORT}/ 🚀🚀🚀`);
