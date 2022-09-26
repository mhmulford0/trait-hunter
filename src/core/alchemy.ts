import {Alchemy, Network} from 'alchemy-sdk';

const settings = {
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
