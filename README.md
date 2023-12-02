# Trait Hunter

> _The hunter uses the Lil Block Party Oracle to ensure that your transaction will only settle on the desired trait_

## Set Up

**Requirements**:

- Node v20

You'll also need a `.env` file that follows the format of the `.env.example` file that has your Alchemy API key used for the websocket connection and a wallet private key used to settle the auction

## Update Targets

In `src/hunter.ts` you will find the code to settle and start auctions on specific traits. Right now only heads are being selected but the code is set up for most traits
