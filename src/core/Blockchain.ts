import { Block } from './Block';

const genesisBlockData = Symbol("GENESIS");

export class Blockchain<T extends {} = {}> {
    
    public chain: Block<T>[] = [this.createGenesisBlock()]

    constructor(public readonly name: string) {}

    get latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    private createGenesisBlock() {
        return new Block<T>(
            0,
            new Date(),
            genesisBlockData as any
        )
    }

    addBlock(newBlock: Block<T>): this {
        const { latestBlock } = this
        newBlock.previousHash = latestBlock.hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
        return this
    }

    get isChainValid() {
        const len = this.chain.length
        for (let i = 1; i < len; i++) {
            const curBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]

            if (curBlock.hash !== curBlock.calculateHash()) {
                return false
            }

            if (curBlock.previousHash !== prevBlock.hash) {
                return false
            }
        }
        return true
    }

}