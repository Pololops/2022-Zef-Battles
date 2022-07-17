import dotenv from 'dotenv';
dotenv.config();

import Debug from 'debug';
const debug = Debug('Server:log');

import app from './app/app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
	debug(`✅ Server started on http://localhost:${port}`);
});
