import { Progress } from "flowbite-react";
import { SendTransactionSection } from "./SendTransaction";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import {
  ABI_ROOTSTOCK_POOL_CONTRACT,
  ROOTSTOCK_POOL_CONTRACT,
} from "../../pages/constants";

import { useState, useEffect } from "react";

const GroupView = ({ group }) => {
  console.log("GROUP VIEW:", group);
  const [poolInfo, setPoolInfo] = useState(null);
  useEffect(() => {
    const fetchPoolInfo = async () => {
      try {
        const response = await fetch("/api/getPools");
        const data = await response.json();
        setPoolInfo(data);
        console.log("Pool Info:", data);
      } catch (error) {
        console.error("Error fetching pool info:", error);
      }
    };

    fetchPoolInfo();
  }, []);

  const pool = poolInfo?.data.pools[0] || undefined;
  // console.log(pool)
  const DisplayImage = ({ cid }) => {
    const imageUrl = `https://gateway.lighthouse.storage/ipfs/${group.picHash}`;
    return (
      <img
        className="rounded max-h-[100px]"
        src={imageUrl}
        alt="Lighthouse Image"
      />
    );
  };

  const {
    write: deposit,
    data,
    isLoading,
    isSuccess,
    error,
  } = useWriteContract({
    address: ROOTSTOCK_POOL_CONTRACT,
    abi: ABI_ROOTSTOCK_POOL_CONTRACT,
    functionName: "deposit",
    args: [pool?.id, amount],
  });

  const handleDeposit = () => {
    deposit();
  };

  return (
    // <div className="flex flex-col">

    //   <div className="flex justify-end">

    //   </div>
    // </div>
    // <div className=" w-4/5 py-3">
    //   <Progress size={"lg"} progress={0}></Progress>
    // </div>
    //  <div>contributed: {group.contributed} / {group.amount}</div>
    //  <SendTransactionSection address={0xb76080b3025f0fAAF8A2223C037C351d6AF6A1AA}></SendTransactionSection>
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="bg-gray-200 ">
        <h1 className="font-press-start p-2 text-3xl">{group.name}</h1>
        <p>{group.desc}</p>
        <div>
          <h2>Countdown</h2>
          <DisplayImage
            cid={"bafkreian6mpwkdf6otutsa4fh7e7e24mwukdddqxwasdfo6txkjl2o2zxm"}
          />
        </div>
      </div>

      <div className="bg-gray-200 flex items-center justify-center">
        Pool/Balance/Rewards
        <p>Goal: {pool?.amount}</p>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to deposit"
          className="border p-2"
        />
        <button
          onClick={handleDeposit}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Deposit
        </button>
      </div>
      <div className="bg-gray-200 flex items-center justify-center">
        My Transactions
      </div>
      <div className="bg-gray-200 flex items-center justify-center">
        <div className="flex flex-col">
          {group.members.map((member, index) => (
            <div key={index}>
              <p className="font-press-start">{member.domain}:</p>
              <p>{member.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupView;
