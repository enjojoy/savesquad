import { useState } from "react";
import { useSendTransaction } from "wagmi";

 function Component() {

  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  

  return (
    <div className="max-w-md mx-auto bg-purple p-4 rounded-lg shadow-lg ">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-brown rounded-lg">
          <div>
            <p className="text-sm text-gray-400">USDC</p>
            <input
              type="number"
              value={sellAmount}
              onChange={(e) => {setSellAmount(e.target.value)
                setBuyAmount(e.target.value)
              }}
              className=" border-transparent focus:border-transparent focus:ring-0 text-3xl text-white bg-transparent border-none outline-none focus:outline-none focus:border-none"
              placeholder="0"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex relative inline-block w-64 justify-end">
</div>

          </div>
        </div>
        <div className="flex items-center justify-center">
        </div>
        <div className="flex items-center justify-between p-4 bg-brown rounded-lg">
          <div>
            <p className="text-sm  text-gray-400">wUSDC</p>
            <p className="text-3xl p-2 text-white">{buyAmount}</p>
          </div>
         
        </div>
        <button className="w-full bg-brown text-white font-press-start text-white py-3 rounded-lg">SWAP</button>
      </div>
    </div>
  )
}

const Dashboard = ({user, network}) => {

    console.log("USER DASHBOARD:", user);
    console.log("NETWORK:", network);



  return (
    <div className="w-full h-full flex-col  flex center items-center justify-center">
      <h1 className="font-press-start text-4xl mb-6 text-center">CREATE A NEW SQUAD OR FEED THE MONSTERS</h1>
      {network !== 31 && 
      <Component/>
      }
    </div>
  );
};

export default Dashboard;