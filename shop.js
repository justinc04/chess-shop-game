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
      "Castle through check",
      "Double move a bare king"
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
    price: 10,
    type: "turn",
    description: "Capture a piece and all surrounding pawns"
  },
  {
    name: "Super Pawn",
    price: 2,
    type: "turn",
    description: "Move a pawn forward 2 squares after its first move"
  },
  {
    name: "Teleport",
    price: 11,
    type: "turn",
    description: "Move a piece to any empty square",
    restrictions: [
      "Teleport the king",
      "Checkmate",
      "Promotion"
    ]
  },
  {
    name: "Promotion",
    price: 7,
    type: "turn",
    description: "Promote a pawn on the last rank"
  },
  {
    name: "Jump",
    price: 7,
    type: "turn",
    description: "Jump over one piece in the path of movement",
    restrictions: [
      "Capture"
    ]
  }
];
