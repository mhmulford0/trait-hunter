import * as dotenv from 'dotenv';

dotenv.config();

import {ethers} from 'ethers';

import oracleAbi from './abi/oracle.json';
import head from './heads.json';

import {Network, Alchemy} from 'alchemy-sdk';

const settings = {
	apiKey: 'hx0S1XgmMkpi_zwTwB9zWhFFCZK3U16r',
	network: Network.ETH_MAINNET,
};

const provider = new ethers.providers.WebSocketProvider(process.env.RPC_URL || '');
// const signer = provider.getSigner();

const CONTRACT_ADDRESS = '0x6c3810649c140d2f43Ec4D88B2f733e1375E4C74';
const oracleContract = new ethers.Contract(CONTRACT_ADDRESS, oracleAbi, provider);

const main = async () => {
	provider.on('block', async () => {
		const blockNum = await provider.getBlockNumber();

		const returnObj = {
			background: 0,
			blockNumber: blockNum,
			body: 0,
			glasses: 0,
			head: 0,
		};
		const nextLil = await oracleContract.fetchNextNoun({blockTag: 'pending'});

		returnObj.background = nextLil[4].background;
		returnObj.body = nextLil[4].body;
		returnObj.glasses = nextLil[4].glasses;
		returnObj.head = nextLil[4].head;
		const test = head.heads.at(nextLil[4].head);
		console.log(test?.filename.split('-')[1]);
	});
};

void main().then().catch();
