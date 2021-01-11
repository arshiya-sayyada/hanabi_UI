const initialState = require('./data/state.json');
const state = convertState(initialState);

export { state, convertState };

function convertCard(card) {
  try {
    const [value, color] = card.toUpperCase().split("");
    return color + value;
  } catch {
    console.log(`ERROR converting: ${card}`);
  }
}

function convertState(schema) {
    const colors = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE"];

  return {
    isPlayerTurn: true,
    discarded: schema.discards.map(convertCard),
    hands: {
      self: new Array(5).fill(1).map((_, idx) => ({
        id: schema.cardIds[idx],
        card: convertCard(schema.cheatMyCards[idx]),
        hints: schema.predictions[0][idx]
      })),
      ["player" + 1]: schema.cards.map((card, idx) => ({
        id: schema.partnerCardIds[idx],
        card: convertCard(card),
        hints: schema.predictions[1][idx]
      }))
    },
    placed: Object.fromEntries(
      new Map(
        new Array(5)
          .fill(1)
          .map((_, idx) => [colors[idx], schema.piles[idx]])
      )
    ),
    deckComposition: schema.deckComposition,
    hintsLog: [],
    defuseCounter: schema.mulligansRemaining,
    hintCounter: schema.hintStonesRemaining,
    cardsLeft: schema.cardsRemainingInDeck,
    gameOver: false,
    selfId: 0,
    partnerId: 1,
    botName: 'test bot',
    notes: [],
    //otherBots: schema.otherBots,
    //seed: schema.seed,
    moveHistory: schema.moveHistory
  };
}
