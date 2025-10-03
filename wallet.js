const { Wallet } = require('ethers');
const wallet = Wallet.createRandom();
console.log(wallet.address);
console.log(wallet.privateKey);
