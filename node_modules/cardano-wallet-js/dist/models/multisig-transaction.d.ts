/// <reference types="node" />
import { AuxiliaryData, NativeScript, NativeScripts, PrivateKey, TransactionBody, TransactionHash, Vkeywitnesses } from "@emurgo/cardano-serialization-lib-nodejs";
import { CoinSelectionWallet } from "../wallet/coin-selection-wallet";
import { TokenWallet } from "../wallet/token-wallet";
export declare class MultisigTransaction {
    txBody: TransactionBody;
    vkeyWitnesses: Vkeywitnesses;
    nativeScripts: NativeScripts;
    metadata: AuxiliaryData;
    txHash: TransactionHash;
    constructor();
    static new(coinSelection: CoinSelectionWallet, txBody: TransactionBody, scripts: NativeScript[], privateKeys: PrivateKey[], numberOfWitnesses: number, config: any, encoding: BufferEncoding, metadata?: AuxiliaryData, tokens?: TokenWallet[]): MultisigTransaction;
    addKeyWitnesses(...privateKeys: PrivateKey[]): void;
    adjustFee(txBody: TransactionBody, coinSelection: CoinSelectionWallet, tokens: TokenWallet[], numberOfWitnesses: number, config: any, encoding: BufferEncoding): TransactionBody;
    build(): string;
    toBytes(): Uint8Array;
    static fromBytes(bytes: Uint8Array): MultisigTransaction;
    private static buff2hex;
    private static hexToBuff;
    private txFee;
    private fakeTx;
    private fakePrivateKey;
}
