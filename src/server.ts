import * as dotenv from 'dotenv';
import express from 'express';

import {prisma} from './core/prismaClient';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // default port to listen
const helmet = require('helmet');

app.use(helmet());

app.disable('x-powered-by');

app.get('/', async (_, res) => {
	res.send({status: 'running'});
});

app.get('/datastream', async (_, res) => {
	const data = await prisma.lil.findMany({});

	res.send(data);
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
