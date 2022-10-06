import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import {z} from 'zod';

import {prisma} from './core/prismaClient';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // default port to listen
import helmet from 'helmet';

app.use(
	helmet({
		crossOriginResourcePolicy: {policy: 'cross-origin'},
	})
);

app.disable('x-powered-by');
app.use(
	cors({
		preflightContinue: true,
	})
);

app.get('/', async (_, res) => {
	res.send({status: 'running'});
});

app.get('/datastream', async (_, res) => {
	const data = await prisma.lil.findMany({
		orderBy: {
			blockNumber: 'desc',
		},
		skip: 0,
		take: 100,
	});
	res.setHeader('Cache-Control', 'public, max-age=13');
	res.send(data);
});

app.get('/alerts', async (req, res) => {
	console.log('Got /alerts');
	const wallet = req.query.wallet;
	const walletSchema = z.string().length(42);
	walletSchema.parse(wallet);

	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Connection', 'keep-alive');
	res.flushHeaders();

	const alerts = await prisma.alerts.findMany({});

	const dbCheck = setInterval(async () => {
		console.log(alerts);
		res.write(JSON.stringify(alerts));
	}, 14e3);

	res.on('close', () => {
		clearInterval(dbCheck);
		res.end();
	});
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
