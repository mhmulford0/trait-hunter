import * as dotenv from 'dotenv';
import {ethers} from 'ethers';

import oracleAbi from './abi/oracle.json';
import {alchemy} from './core/alchemy';
import {prisma} from './core/prismaClient';
import head from './heads.json';
import traitData from './nouns-image-data.json';

dotenv.config();

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

			const headInfo = head.heads.at(nextLil[4].head);
			const bgTrait = traitData.bgcolors.at(nextLil[4].background);
			const accessory = traitData.images.accessories.at(nextLil[4].accessory);
			const glasses = traitData.images.glasses.at(nextLil[4].glasses);
			const headTrait = headInfo?.filename.split('-')[1];

			const accessoryTrait = accessory?.filename.slice(accessory.filename.indexOf('-') + 1);
			const glassesTrait = glasses?.filename.slice(glasses.filename.indexOf('-') + 1);

			console.log(`accessory: ${accessoryTrait}`);
			console.log(`background: # ${bgTrait}`);
			console.log(`glasses: ${glassesTrait}`);
			console.log(`head: ${headTrait}`);

			if (accessoryTrait && bgTrait && headTrait) {
				await prisma.lil.create({
					data: {
						accessory: accessoryTrait,
						backgroundColor: bgTrait,
						blockNumber,
						glasses: glassesTrait,
						head: headTrait,
					},
				});
			}

			if (headTrait === 'panda') {
				console.log('FOUND A 🐼 PANDA');
				console.log('Starting Auction');
			}

			if (headTrait === 'peyote') {
				console.log('FOUND A 🌻 PEYOTE');
				console.log('Starting Auction');
			}
		} catch (err) {
			// console.log(err);
		}
	});
};

main();
