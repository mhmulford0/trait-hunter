import 'dotenv/config';
import {ethers} from 'ethers';
import {alchemy} from './core/alchemy';
import {AuctionState} from './core/AuctionState';

import oracleAbi from './abi/oracle.json';
import head from './heads.json';
import traitData from './nouns-image-data.json';

if (!process.env.PRIVATE_KEY) {
	throw new Error('No private key found');
}

if (!process.env.API_KEY) {
	throw new Error('API key required');
}

const provider = new ethers.providers.WebSocketProvider(
	`wss://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`
);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = '0x6c3810649c140d2f43Ec4D88B2f733e1375E4C74';

const oracleContract = new ethers.Contract(CONTRACT_ADDRESS, oracleAbi, provider);
const oracleContractWithSigner = oracleContract.connect(signer);

alchemy.ws.on('block', async () => {
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

		if (headTrait === 'moose') {
			console.log('FOUND A 🦌 moose');
			console.log('Starting Auction');

			console.log('SEND IT 🚀🚀🚀🚀 REAL MONEY SETTLE 💵 ');
			await oracleContractWithSigner.settleAuction(nextLil?.[0]);
		}

		if (headTrait === 'shark') {
			console.log('FOUND A 🦈 shark');
			console.log('Starting Auction');

			console.log('SEND IT 🚀🚀🚀🚀 REAL MONEY SETTLE 💵 ');
			await oracleContractWithSigner.settleAuction(nextLil?.[0]);
		}

		if (headTrait === 'mushroom') {
			console.log('FOUND A 🍄 mushroom');
			console.log('Starting Auction');

			console.log('SEND IT 🚀🚀🚀🚀 REAL MONEY SETTLE 💵 ');
			await oracleContractWithSigner.settleAuction(nextLil?.[0]);
		}
	} catch (err) {
		console.log(err);
	}
});
