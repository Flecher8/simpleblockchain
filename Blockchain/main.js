// Тест работает ли комисия ( просто обычные операции )
const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("9b53c43967d013067445f38978719792575124e5292f940a2562f572cf7fd9cf");
const myWalletAddress = myKey.getPublic("hex");

const friendKey = ec.keyFromPrivate("303ab4d14f3445598ef05c8241fb1ad2d51c0f6b9fc2f285afba85dcb56e9328");
const friendAddress = friendKey.getPublic("hex");

const friend2Key = ec.keyFromPrivate("9e9a29b3b4277b32b70d2392995611b652b31dfa8efbc50d191b80ebccd3fa0a");
const friend2Address = friend2Key.getPublic("hex");

let myCoin = new Blockchain();

console.log(myCoin);

console.log("\n Starting the miner...");
myCoin.minePendingTransactions("121331");

console.log(myCoin);

console.log("\n Balance of my is, ", myCoin.getBalanceOfAddress(myWalletAddress));
console.log("\n Balance of friend1 is, ", myCoin.getBalanceOfAddress(friendAddress));
console.log("\n Balance of friend2 is, ", myCoin.getBalanceOfAddress(friend2Address));
console.log();

const tx1 = new Transaction(myWalletAddress, friendAddress, 100);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);
console.log("transaction 1");
console.log();

const tx2 = new Transaction(myWalletAddress, friendAddress, 100);
tx2.signTransaction(myKey);
myCoin.addTransaction(tx2);
console.log("transaction 2");
console.log();

const tx3 = new Transaction(myWalletAddress, friendAddress, 100);
tx3.signTransaction(myKey);
myCoin.addTransaction(tx3);
console.log("transaction 3");
console.log();

console.log("\n Starting the miner...");
myCoin.minePendingTransactions(friend2Address);

console.log("\n Balance of my is, ", myCoin.getBalanceOfAddress(myWalletAddress));
console.log("\n Balance of friend1 is, ", myCoin.getBalanceOfAddress(friendAddress));
console.log("\n Balance of friend2 is, ", myCoin.getBalanceOfAddress(friend2Address));
console.log();

console.log("Is blockchain valid?: " + myCoin.isChainValid());
console.log();

myCoin.chain[2].transactions[0].amout = 10;

console.log("Coin");
console.log(myCoin);
console.log();

console.log("Is blockchain valid?: " + myCoin.isChainValid());
console.log();

const tx4 = new Transaction(myWalletAddress, friendAddress, 100);
tx4.signTransaction(myKey);
myCoin.addTransaction(tx4);
console.log("transaction 4");
console.log();

const tx5 = new Transaction(myWalletAddress, friendAddress, 100);
tx5.signTransaction(myKey);
myCoin.addTransaction(tx5);
console.log("transaction 5");
console.log();

const tx6 = new Transaction(myWalletAddress, friendAddress, 100);
tx6.signTransaction(myKey);
myCoin.addTransaction(tx6);
console.log("transaction 6");
console.log();

console.log("\n Starting the miner...");
myCoin.minePendingTransactions(friend2Address);

console.log("Coin");
console.log(myCoin);
console.log();

console.log("Is blockchain valid?: " + myCoin.isChainValid());
console.log();
