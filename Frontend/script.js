const contractAddress = "0x09d8777cf535AF12e2Dc119C5c90B81146d5d931 ";
const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "NFTGifted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                }
            ],
            "name": "NFTMinted",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getTokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "giftNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "tokenURI",
                    "type": "string"
                }
            ],
            "name": "mintNFT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

let web3;
let contract;

async function connectBlockchain() {  
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("MetaMask not detected! Please install MetaMask.");
    }
}

async function mintNFT() {
    const recipient = document.getElementById("recipientAddress").value;
    const tokenURI = document.getElementById("tokenURI").value;
    
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.mintNFT(recipient, tokenURI).send({ from: accounts[0] });
        document.getElementById("mintStatus").innerText = "NFT Minted Successfully!";
    } catch (error) {
        document.getElementById("mintStatus").innerText = "Error: " + error.message;
    }
}

async function giftNFT() {
    const receiver = document.getElementById("receiverAddress").value;
    const tokenId = document.getElementById("tokenId").value;
    
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.giftNFT(receiver, tokenId).send({ from: accounts[0] });
        document.getElementById("giftStatus").innerText = "NFT Gifted Successfully!";
    } catch (error) {
        document.getElementById("giftStatus").innerText = "Error: " + error.message;
    }
}

// Connect to blockchain on load
window.onload = connectBlockchain;
