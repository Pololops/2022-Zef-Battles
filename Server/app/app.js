import express from 'express';
import cors from 'cors';

import router from './routers/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: process.env.CORS_DOMAINS ?? true,
};
app.use(cors(corsOptions));

app.use(router);

export default app;
