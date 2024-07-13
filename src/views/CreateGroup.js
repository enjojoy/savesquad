import { Datepicker } from "flowbite-react";
import { useState } from "react";

const CreateGroup = ({ groups, setGroups }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expirationDate, setExpirationDate] = useState("")
  const [frequency, setFrequency] = useState("weekly");
  const [currency, setCurrency] = useState("USDC");
  const [contribution, setContribution] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    //1. Create new group on Dynamic and add all the members there
    //2. Create the group in database with the rest of data(Or retrieve from SC?)
    // Assuming groups is an array of group objects
    const newGroup = { name, description, amount };
    setGroups([...groups, newGroup]);
    // Clear the input fields after submission
    setName("");
    setDescription("");
    setAmount("");
  };

  return (
    <div>
      <h2 className="text-2xl font-press-start mb-4">New squad</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="bg-azure p-4 mt-6 font-press-start text-white rounded">
          Create squad
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;

