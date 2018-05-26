import test from 'ava'
import Fecha from 'fecha'

import { Basix } from '../coinbase'
import { Block } from '../core';

function clone(orig: typeof Basix.basixCoin): typeof Basix.basixCoin {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
}

let initialBasixCoin = clone(Basix.basixCoin)

function generateBasix(): Basix.BasixCoinDescriptor {
    return {
        amount: Math.random() * 5000
    }
}

test.before(() => {
    for (let index = 1; index < 5; index++)
        initialBasixCoin.addBlock(
            new Block(index, new Date(), generateBasix())
        )
    Object.freeze(initialBasixCoin)
})

let basixCoin: typeof initialBasixCoin
test.beforeEach(() => {
    basixCoin = clone(initialBasixCoin)
})

test('unmodified blockchain should be valid', t => {
    t.true(basixCoin.isChainValid)
})

test('adding a new block to the blockchain should still be valid', t => {
    basixCoin.addBlock(new Block(basixCoin.chain.length, new Date(), generateBasix()))
    t.true(basixCoin.isChainValid)
})

test('modifying block value should result in a invalid chain', t => {
    basixCoin.chain[1].data.amount += 100
    t.false(basixCoin.isChainValid)
})

test('modifying block value + force update the hash should result in a invalid chain', t => {
    const block = basixCoin.chain[2]
    block.data.amount += 150
    block.hash = block.calculateHash()
    t.false(basixCoin.isChainValid)
})