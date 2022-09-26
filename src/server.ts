import * as dotenv from 'dotenv';
import express from 'express';

import {alchemy} from './core/alchemy';
import {prisma} from './core/prismaClient';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // default port to listen
const helmet = require('helmet');

app.use(helmet());

app.disable('x-powered-by');

app.get('/', async (req, res) => {
	console.log(req.method);

	const nfts = await alchemy.nft.getNftsForOwner('mulford.eth');

	const returnData: unknown[] = [];

	nfts.ownedNfts.map(async nft => {
		returnData.push(nft.media[0]);
	});
	console.log(returnData.length, 'my filter');
	console.log(nfts.totalCount, 'api count');

	// hello
	res.send(returnData);
});

app.get('/datastream', async (_, res) => {
	// fetch database, write out
	const data = await prisma.lil.findMany({});
	console.log(data);
	res.send([{...data, items: data.length}]);
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
