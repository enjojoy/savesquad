import { FMT_BYTES, Web3 } from "web3";
import {
  ROOTSTOCK_POOL_CONTRACT,
  ABI_ROOTSTOCK_POOL_CONTRACT,
} from "../constants.js";
const axios = require("axios");

const abi = ABI_ROOTSTOCK_POOL_CONTRACT;
const CREATED_POOL_EVENT =
  "0xcf5dabb333c25e3f3baa31327b8bfdbb6ef6719c270ea1f422a8ef1f71d64d27";
const DEPOSIT_POOL_EVENT =
  "0x1599c0fcf897af5babc2bfcf707f5dc050f841b044d97c3251ecec35b9abf80b";

const web3 = new Web3(
  "https://rpc.testnet.rootstock.io/Z5XaHGYmGgPwxBIVmIjY7Yfpz4wKRI-T"
);

const contract = new web3.eth.Contract(abi, ROOTSTOCK_POOL_CONTRACT);

// const abi = JSON.parse(fs.readFileSync("ABI.json", "utf8"));

const poolCreatedEvent = abi.find(
  (item) => item.name === "PoolCreated" && item.type === "event"
);
const depositedEvent = abi.find(
  (item) => item.name === "Deposited" && item.type === "event"
);

const payload = {
  jsonrpc: "2.0",
  id: 0,
  method: "eth_getLogs",
  params: [
    {
      address: "0x170615F501120302803320983bdCAD2f4F7034FD",
      fromBlock: "earliest",
    },
  ],
};

async function getPools() {
  const response = await axios.post(
    `https://rpc.testnet.rootstock.io/Z5XaHGYmGgPwxBIVmIjY7Yfpz4wKRI-T`,
    payload
  );
  // console.log(response.data);

  // response.data;

  const result = response.data.result;

  const respuesta = {
    pools: {},
  };

  let decodedEvent;
  let data;
  let poolId;

  for (let i = 0; i < result.length; i++) {
    const e = result[`${i}`];

    // console.log("elemento:", e);
    switch (e.topics[0]) {
      case CREATED_POOL_EVENT:
        decodedEvent = web3.eth.abi.decodeLog(
          poolCreatedEvent.inputs,
          e.data,
          CREATED_POOL_EVENT
        );

        poolId = parseInt(decodedEvent.poolId);

        const details = await contract.methods.getPoolDetails(poolId).call();
        const members = details["6"];

        data = {
          poolId: poolId,
          name: decodedEvent.name,
          imgCID: decodedEvent.imageCID,
          amount: parseInt(decodedEvent.amount),
          frequency: parseInt(decodedEvent.frequency),
          dueDate: parseInt(decodedEvent.dueDate),
          members: members,
          currency: decodedEvent.currency,
          deposits: [],
        };

        respuesta.pools[poolId] = data;

      case DEPOSIT_POOL_EVENT:
        decodedEvent = web3.eth.abi.decodeLog(
          depositedEvent.inputs,
          e.data,
          DEPOSIT_POOL_EVENT
        );

        data = {
          depositor: decodedEvent.depositor,
          amount: parseInt(decodedEvent.amount),
        };

        if (data.amount == 320) break;

        poolId = parseInt(decodedEvent.poolId);

        respuesta.pools[poolId].deposits.push(data);

      default:
        break;
    }
  }

  return respuesta;
}

export default async function handler(req, res) {
  /// look blockscout

  /// get events para el id

  const response = await getPools();

  res.status(200).json({ data: response });
}

/// hacer otro para trier por account
