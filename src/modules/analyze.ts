/*

ok, so gonna type here to think out loud.
this is going to have all the individual fns to calculate individual numerical values for hueristics that will go into whether or not a cheater is actually cheating

the factors we need to consider -
1. precision ratios
2. game windows
3. descrepencies btw playlists
4. basic stats check
*/

export function analyzeActivityWindow(
  startTime: Date,
  endTime: Date,
  membershipId: string,
  characterId: string
) {
  // query DB for given character ID
  // analyze individual games parallely
}
