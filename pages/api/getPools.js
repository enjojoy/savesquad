import { FMT_BYTES, Web3 } from "web3";
const fs = require("fs");
const path = require("path");

const axios = require("axios");

const CREATED_POOL_EVENT =
  "0xcf5dabb333c25e3f3baa31327b8bfdbb6ef6719c270ea1f422a8ef1f71d64d27";
const DEPOSIT_POOL_EVENT =
  "0x1599c0fcf897af5babc2bfcf707f5dc050f841b044d97c3251ecec35b9abf80b";

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageCID",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "currency",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageCID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "members",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ammount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "ammount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastTimeDeposited",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "getDepositsFromMember",
    outputs: [
      {
        internalType: "uint256",
        name: "ammount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
    ],
    name: "getPoolDetails",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageCID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balancr",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "members",
        type: "address[]",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isMember",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageCID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "frequency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dueDate",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "currency",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "stakeRewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const web3 = new Web3(
  "https://rpc.testnet.rootstock.io/Z5XaHGYmGgPwxBIVmIjY7Yfpz4wKRI-T"
);

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

  console.log("\n\n\n\n", "Empieza", "\n\n\n\n");
  const result = response.data.result;

  const respuesta = {
    poolsCreation: [],
    deposites: [],
  };

  let decodedEvent;
  let data;

  for (let i = 0; i < result.length; i++) {
    const e = result[`${i}`];

    // console.log("elemento:", e);
    switch (e.topics[0]) {
      case CREATED_POOL_EVENT:
        console.log("pool event");
        decodedEvent = web3.eth.abi.decodeLog(
          poolCreatedEvent.inputs,
          e.data,
          CREATED_POOL_EVENT
        );

        data = {
          poolId: parseInt(decodedEvent.poolId),
          name: decodedEvent.name,
          imgCID: decodedEvent.imageCID,
          amount: parseInt(decodedEvent.amount),
          frequency: parseInt(decodedEvent.frequency),
          dueDate: parseInt(decodedEvent.dueDate),
          creator: decodedEvent.creator,
          currency: decodedEvent.currency,
        };

        respuesta.poolsCreation.push(data);

      case DEPOSIT_POOL_EVENT:
        console.log("deposited event");

        decodedEvent = web3.eth.abi.decodeLog(
          depositedEvent.inputs,
          e.data,
          DEPOSIT_POOL_EVENT
        );

        const data = {
          poolId: parseInt(decodedEvent.poolId),
          depositor: decodedEvent.depositor,
          amount: parseInt(decodedEvent.amount),
        };

        if (data.amount == 320) break;

        respuesta.deposites.push(data);

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
