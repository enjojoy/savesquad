import { Datepicker } from "flowbite-react";
import { useState } from "react";
import lighthouse from '@lighthouse-web3/sdk'

const CreateGroup = ({ groups, setGroups, file, setFile }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expirationDate, setExpirationDate] = useState("")
  const [frequency, setFrequency] = useState("weekly");
  const [currency, setCurrency] = useState("USDC");
  const [contribution, setContribution] = useState(0);

  // setContribution(0)

  console.log("GROUPS:", groups);
  const updateGroups = ({ name, description, amount, currency, contribution }) => {
    const group = {
      name: name,
      desc: description,
      amount: amount,
      currency: currency,
      contributed: contribution
    };
    console.log("New group:", group)
    setGroups((prev) => {
      const newGroups = [...prev, group];
      localStorage.setItem('groups', JSON.stringify(newGroups));
      return newGroups;
    }
    )


    // TODO: Create a smart contract in celo?
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //1. Create new group on Dynamic and add all the members there
  //   //2. Create the group in database with the rest of data(Or retrieve from SC?)
  //   // Assuming groups is an array of group objects

  //   // Clear the input fields after submission
  //   updateGroups({name, description, amount, currency})
  // };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
      console.log(percentageDone)
    }
      console.log("File to upload:", file)
      const output = await lighthouse.upload([file], "cc17de30.9c81d6383aa5420bb81b027aaa5a5c5d", false, null, progressCallback)
      const picHash = output.data.Hash;
      console.log("HASH: ", picHash);
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
    
  
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2 className="text-2xl font-press-start mb-4">New squad</h2>
      < form onSubmit={(e)=>{ 
        e.preventDefault();

        console.log(description)
        updateGroups({ name, description, amount, currency, contribution })
      }}>
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

        <div className="flex flex-row w-full" >

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
<div>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmitFile}>Upload</button>
</div>

        <button type="submit" className="bg-azure p-4 mt-6 font-press-start text-white rounded">
          Create squad
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;

