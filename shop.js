export const shopItems = [
  {
    name: "Capture",
    price: 1,
    description: "Capture an enemy piece",
    type: "turn"
  },
  {
    name: "Check",
    price: 1,
    description: "Check the opponent's king",
    type: "turn"
  },
  {
    name: "Checkmate",
    price: 12,
    description: "Checkmate the opponent's king",
    type: "turn"
  },
  {
    name: "Double Move",
    price: 14,
    description: "Move twice in a row",
    type: "turn"
  },
  {
    name: "Castle",
    price: 2,
    description: "Castle your king",
    type: "turn"
  },
  {
    name: "Atomic Capture",
    price: 12,
    description: "Capture an enemy piece and destroy the attacking piece and all surrounding pieces (except Kings)",
    type: "turn"
  },
  {
    name: "Royal Mint",
    price: 9,
    description: "Earn an extra $1 per turn",
    type: "permanent",
    function: "royalMint"
  },
  {
    name: "Super Pawn",
    price: 2,
    description: "Move a pawn 2 squares forward after its first move",
    type: "turn"
  }
];
