import * as CoinBases from './coinbase'
import { Blockchain } from './core';

function log(blockChain: Blockchain<any>) {
    console.log(
        JSON.stringify(blockChain, null, '\t')
    )
}

log(CoinBases.Basix.basixCoin)