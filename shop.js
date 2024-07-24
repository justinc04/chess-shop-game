export const shopItems = [
  {
    name: "Capture",
    price: 1,
    type: "turn",
    description: "Capture a piece"
  },
  {
    name: "Check",
    price: 1,
    type: "turn",
    description: "Check the opponent's king"
  },
  {
    name: "Checkmate",
    price: 8,
    type: "turn",
    description: "Checkmate the opponent's king"
  },
  {
    name: "Double Move",
    price: 14,
    type: "turn",
    description: "Move twice in a row",
    restrictions: [
      "Castle out of check",
      "Castle through check"
    ]
  },
  {
    name: "Castle",
    price: 2,
    type: "permanent",
    description: "Castle your king"
  },
  {
    name: "Collateral",
    price: 12,
    type: "turn",
    description: "Capture a piece and all surrounding pawns"
  },
  {
    name: "Royal Mint",
    price: 9,
    type: "permanent",
    description: "Earn an extra $1 per turn",
    function: "royalMint"
  },
  {
    name: "Super Pawn",
    price: 2,
    type: "turn",
    description: "Move a pawn forward 2 squares after its first move"
  },
  {
    name: "Teleport",
    price: 10,
    type: "turn",
    description: "Move a piece to any empty square",
    restrictions: [
      "Teleport the King",
      "Checkmate",
      "Promotion"
    ]
  },
  {
    name: "Promotion",
    price: 5,
    type: "turn",
    description: "Promote a pawn on the last rank"
  }
];
