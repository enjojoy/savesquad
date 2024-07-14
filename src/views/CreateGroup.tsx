import { Datepicker } from "flowbite-react";
import { FC, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import EnsResolver from "../components/EnsResolver";
import { ethers } from "ethers";
import {
  ABI_ROOTSTOCK_POOL_CONTRACT,
  ROOTSTOCK_POOL_CONTRACT,
} from "../../pages/constants";
import { config } from "../App";

const CreateGroup = ({ groups, setGroups, file, setFile }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [currency, setCurrency] = useState("USDC");
  const [contribution, setContribution] = useState(0);
  const [handle, setHandle] = useState("");
  const [members, setMembers] = useState<String[]>([]);
  const [percentageDone, setPercentageDone] = useState(0);
  const [picHash, setPicHash] = useState("");

  // useEffect(()=>{
  //   console.log(handle);
  // }, [handle])

  // setContribution(0)

  async function createPoolTransaction(
    name,
    imageCID,
    amount,
    frequency,
    dueDate,
    members
  ) {
    const provider = new ethers.BrowserProvider(window.ethereum!);
    const signer = await provider.getSigner();

    const rootStockPoolContract = new ethers.Contract(
      ROOTSTOCK_POOL_CONTRACT,
      ABI_ROOTSTOCK_POOL_CONTRACT,
      signer
    );

    // rootStockPoolContract.``

    rootStockPoolContract.createPool(
      name,
      imageCID,
      amount,
      frequency,
      dueDate,
      members
    );
  }

  // console.log("GROUPS:", groups);
  const updateGroups = ({
    name,
    description,
    amount,
    contribution,
    members,
    picHash,
    currency,
  }) => {
    const group = {
      name: name,
      desc: description,
      amount: amount,
      contributed: contribution,
      members: members,
      picHash: picHash,
      currency: currency,
    };
    // console.log("New group:", group);
    setGroups((prev) => {
      const newGroups = [...prev, group];
      localStorage.setItem("groups", JSON.stringify(newGroups));
      return newGroups;
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //1. Create new group on Dynamic and add all the members there
  //   //2. Create the group in database with the rest of data(Or retrieve from SC?)
  //   // Assuming groups is an array of group objects

  //   try {
  //   } catch (e) {
  //     console.error("[createPoolTx] err = ", e);
  //   }

  //   // Clear the input fields after submission
  //   // updateGroups({
  //   //   name,
  //   //   description,
  //   //   amount,
  //   //   currency,
  //   //   contribution,
  //   //   members,
  //   //   picHash,
  //   // });
  // };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const progressCallback = (progressData: any) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      setPercentageDone(percentageDone);
      console.log(percentageDone);
    };
    console.log("File to upload:", file);
    const output = await lighthouse.upload(
      [file],
      "cc17de30.9c81d6383aa5420bb81b027aaa5a5c5d",
      false,
      null,
      progressCallback
    );
    const picHash = output.data.Hash;
    console.log("HASH: ", picHash);
    setPicHash(picHash);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2 className="text-2xl font-press-start mb-4">New squad</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          updateGroups({
            name,
            description,
            amount,
            currency,
            contribution,
            members,
            picHash,
          });
        }}
        // onSubmit={(e) => {
        //   e.preventDefault();

        //   console.log(description);

        //   createPoolTransaction(
        //     name,
        //     picHash,
        //     amount,
        //     frequency,
        //     expirationDate,
        //     members
        //   );

        // }}
      >
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded "
            required
          />
        </div>
        <div className="flex flex-row w-full">
          <div className="mb-4 w-3/4 px-2">
            <label className="block mb-2">Squat Goal Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded   "
              required
            />
          </div>
          <div className="mb-4 w-1/4 px-2">
            <label className="block mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="USDC">USDC</option>
              <option value="rBTC">rBTC</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div className="mb-4 w-1/2 px-2">
            <label className="block mb-2">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="weekly">Weekly</option>
              {/* <option value="bi-weekly">Bi-weekly</option> */}
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-4 w-1/2 px-2">
            <label className="block mb-2">Milestone date</label>
            <Datepicker />
          </div>
        </div>

        <div className="mb-4">
          <h4>Add squad member</h4>
          <p>Please enter email, eth address or ens handle</p>
          <div className="flex flex-row">
            <EnsResolver members={members} setMembers={setMembers} />

            {/* <input
           type="text"
           value={handle}
           onChange={(e) => setHandle(e.target.value)}
           className=" p-2 rounded w-full"
           required></input>
           <button className="bg-azure p-4 ml-2 font-press-start text-white rounded">+</button> */}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <input
              className="font-press-start rounded"
              type="file"
              onChange={handleFileChange}
            />
            <button
              className="font-press-start bg-azure text-white m-2 p-2 rounded"
              onClick={handleSubmitFile}
            >
              Upload
            </button>
          </div>

          <button
            type="submit"
            className={"bg-azure p-4 mt-6 font-press-start text-white rounded"}
          >
            Create squad
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
function usePrepareContractWrite(arg0: unknown): { config: any } {
  throw new Error("Function not implemented.");
}
