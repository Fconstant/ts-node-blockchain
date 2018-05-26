import { Block, Blockchain } from '../core'

export namespace Basix {
    export type BasixCoinDescriptor = {
        amount: number;
    }
    export const basixCoin = new Blockchain<BasixCoinDescriptor>("Basix")
}
