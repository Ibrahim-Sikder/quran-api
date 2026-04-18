import { serve } from '@hono/node-server';
import app from './app';

const portEnv = process.env.PORT;

const port =
    portEnv && !Number.isNaN(Number(portEnv))
        ? Number(portEnv)
        : 8000;
console.log(`Server running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});