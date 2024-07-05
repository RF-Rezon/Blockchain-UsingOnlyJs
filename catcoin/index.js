import sha256 from 'crypto-js/sha256';
class Block {
    constructor(timestamp, data, previousHash = "") {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class BLockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }
    generateGenesisBlock (){
        return new Block("5-Jul-2024", "GENESIS", "0000");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

const blockChain = new BLockchain();
const block1 = new Block("6-Jul-2024", { cash: 100 });
const block2 = new Block("7-Jul-2024", { cash: 200 });

blockChain.addBlock(block1)
blockChain.addBlock(block2)
console.log(blockChain);