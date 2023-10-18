const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log();
console.log("Private key: ", privateKey);
console.log();
console.log("Public key: ", publicKey);
// my
// Private key:  9b53c43967d013067445f38978719792575124e5292f940a2562f572cf7fd9cf

//Public key:  049c336ddade1d9b8748f858b5b9083eb0ea338fa1fa73ee707f757552c569d52b56901fb28b989c781d9251d1a912d9ff1697e0b74f6c05310a84e56fd10bc441
// friend 1
//Private key:  303ab4d14f3445598ef05c8241fb1ad2d51c0f6b9fc2f285afba85dcb56e9328

//Public key:  04ce55077d499b5cf82bfa1c23191b1c7fc1786392bb1082c9d4aa7eb2c528b437b776c2ef7c63f5bd2670a799f5848ec965f02ee679f1ab9c964a833f1e1b7e22
// friend 2
//Private key:  9e9a29b3b4277b32b70d2392995611b652b31dfa8efbc50d191b80ebccd3fa0a

//Public key:  0497663c7bacd27ce5b0b3994dccf0b881dfce1e21d98c66ce9c6333d0c2d57b567b76fac98e8aa664bf0d50bb1f2a817484407aab0a2b44576ee2b9933e15e2da
