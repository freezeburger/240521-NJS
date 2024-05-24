import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { PORT } from '../config.js';

const app = express();
export const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'..', 'index.html'));
});

export const start = () => {
    server.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`);
    });
}
