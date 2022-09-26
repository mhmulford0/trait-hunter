import * as dotenv from 'dotenv';

import {Alchemy, Network} from 'alchemy-sdk';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const settings = {
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

app.get('/', async (req, res) => {
	console.log(req.method);

	const nfts = await alchemy.nft.getNftsForOwner('mulford.eth');

	const returnData: unknown[] = [];

	nfts.ownedNfts.map(async nft => {
		returnData.push(nft.media[0]);
	});
	console.log(returnData.length, 'my filter');
	console.log(nfts.totalCount, 'api count');

	res.send(returnData);
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
