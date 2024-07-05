import sha256 from 'crypto-js/sha256';
class Block {
    constructor(timestamp, data, previousHash){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

const block = new Block("5-Jul-2024", {cash: 100}, "ABCD");

class BLockchain {
    constructor(){
        this.chain = [];
    }
    addBlock(preViousBlock){
        this.chain.push(preViousBlock)
    }
}
const blockChain = new BLockchain();

blockChain.addBlock(block)

console.log(blockChain);