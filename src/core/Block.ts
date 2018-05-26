import { SHA256, WordArray } from 'crypto-js';

export class Block<T extends {} = {}> {

    public hash: string

    constructor(
        public index: number,
        public timestamp: Date,
        public data: T,
        public previousHash?: string,
    ) {
        this.hash = this.calculateHash()
    }

    calculateHash = () => SHA256(
        this.index + this.timestamp.toString() + JSON.stringify(this.data) + this.previousHash
    ).toString()
}