const nearAPI = require("near-api-js");
const { providers } = require("near-api-js");
const { KeyPair, utils } = nearAPI;
const { BN } = require("bn.js");

// network configuration
const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");
// console.log("provider: ", provider);
const TxHash = "Ap35wvxXiYces8te7p96MiykgosnMsTMHvXA3FHPx3ne";
const accountId = "paritomar.testnet";

const connectToNear = async () => {
  const networkId = "testnet";
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  const KeyPair = nearAPI.KeyPair.fromRandom("ed25519");
  // console.log("KeyPair: ", KeyPair);

  const { publicKey } = KeyPair;
  const accountId = "paritomar.testnet";
  await keyStore.setKey(networkId, accountId, KeyPair);

  const near = await nearAPI.connect({
    networkId,
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
  });
  // console.log("near: ", near);

  const account = await near.account(accountId);
  console.log("account: ", account);

  const state = await account.state();
  // console.log("state: ", state);
  const balance = state.amount;
  console.log("balance: ", balance);
  //   estimateFees(account, "paritomar.testnet", "1")

  return { near, account, publicKey };
};

const createWallet = async () => {
  const { publicKey } = await connectToNear();
  console.log("public key", publicKey.toString());
  return publicKey.toString();
};

async function estimateFee() {
  const networkId = "testnet";
  const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
  const near = await nearAPI.connect({
    networkId,
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
  });
  const account = await near.account("paritomar.testnet");
  const gas = new BN("300000000000000");
  const amount = new BN("1000000000000000000000000");
  const fee = await account.connection.provider.query(
    `compute_gas("${account.accountId}", [{"transfer": {"deposit": "0"}}])`
  );

  console.log(`Fee: ${fee.toString()}`);
  const totalFee = gas.mul(fee);
  const totalAmount = amount.add(totalFee);
  console.log(`Total fee: ${totalFee.toString()}`);
  console.log(`Total amount: ${totalAmount.toString()}`);
}

const transfer = async (account, receiver, amount) => {
  const amountToSend = utils.format.parseNearAmount(amount);
  await account.sendMoney(receiver, amountToSend);
  return true;
};

// get tx status
async function getState(txHash, accountId) {
  const result = await provider.txStatus(txHash, accountId);
  console.log("result: ", result);
}

// createWallet();
// connectToNear();
// transfer(account, "paritomar.testnet", "1");
// estimateFee()
async function main() {
  createWallet();
  connectToNear();
  getState(TxHash, accountId);
}

main();
