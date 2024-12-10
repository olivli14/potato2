export const potatoABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_potato",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sourcream",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cheese",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_bacon",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_chives",
          "type": "uint256"
        }
      ],
      "name": "addIngredient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_potato",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sourcream",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_cheese",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_bacon",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_chives",
          "type": "uint256"
        }
      ],
      "name": "buyPotato",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getIngredients",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]