import sha256 from 'crypto-js/sha256';
class Block {
    constructor(timestamp, data, previousHash = "") {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    mineBlock(difficulty){
        while(
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ){
            this.nonce++; 
            this.hash = this.calculateHash();
        }
        console.log("Mining Done!: " + this.hash)
        console.log("Loop: " + this.nonce + 1 + " times")
    }

    calculateHash() {
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }
}

class BLockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.difficulty = 5;
    }
    generateGenesisBlock (){
        return new Block("5-Jul-2024", "GENESIS", "0000");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        // Instructor said to add mine instead of hash 👆
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }
    isBlockChainValidate(){
        for(let i=1; i< this.chain.length; i++){
            const currentBlock = this.chain[i]; 
            const previousBlock = this.chain[i - 1]; 

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if(currentBlock.previousHash !== previousBlock.hash) return false;

            return true;
        }
    }
}

const blockChain = new BLockchain();

const block1 = new Block("6-Jul-2024", { cash: 100 });
blockChain.addBlock(block1)

const block2 = new Block("7-Jul-2024", { cash: 200 });
blockChain.addBlock(block2)

// console.log(blockChain.isBlockChainValidate());

// blockChain.chain[1].data = "Hacked";
// console.log(blockChain.isBlockChainValidate());

console.log(blockChain);