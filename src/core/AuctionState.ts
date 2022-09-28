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
