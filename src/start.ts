import * as dotenv from 'dotenv';

import {Alchemy, Network} from 'alchemy-sdk';
import {ethers} from 'ethers';
import head from './heads.json';

import oracleAbi from './abi/oracle.json';

dotenv.config();

const settings = {
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const provider = new ethers.providers.WebSocketProvider(
	`wss://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`
);

const CONTRACT_ADDRESS = '0x6c3810649c140d2f43Ec4D88B2f733e1375E4C74';
const oracleContract = new ethers.Contract(CONTRACT_ADDRESS, oracleAbi, provider);

/* 
signature for fetchNextNoun
  return (
    [0] blockhash(block.number - 1),
    [1] nounId,
    [2] svg,
    [3] auctionState,
    [4] nextNounSeed

  );
*/

export enum AuctionState {
	NOT_STARTED,
	ACTIVE,
	OVER_NOT_SETTLED,
	OVER_AND_SETTLED,
}

const main = () => {
	alchemy.ws.on('block', async blockNumber => {
		console.log(blockNumber);

		try {
			const nextLil = await oracleContract.fetchNextNoun({blockTag: 'pending'});

			if (nextLil[3] === AuctionState.ACTIVE) {
				console.log('Auction is ACTIVE');
				return;
			}

			const headTrait = head.heads.at(nextLil[4].head);
			const traitName = headTrait?.filename.split('-')[1];
			console.log(`Head On the Block: ${traitName}`);

			if (traitName === 'panda') {
				console.log('FOUND A 🐼 PANDA');
				console.log('Starting Auction');
			}

			if (traitName === 'unicorn') {
				console.log('FOUND A 🦄 UNICORN');
				console.log('Starting Auction');
			}

			if (traitName === 'peyote') {
				console.log('FOUND A 🌻 PEYOTE');
				console.log('Starting Auction');
			}
		} catch {
			throw new Error('Error with bot');
		}
	});
};

main();
