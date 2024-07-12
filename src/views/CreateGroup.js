import { Datepicker } from "flowbite-react";
import { useState } from "react";

const CreateGroup = ({ groups, setGroups }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expirationDate, setExpirationDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <h2 className="text-2xl font-press-start mb-4">New group</h2>
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
        <div className="mb-4">
          <label className="block mb-2">Amount of Crypto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded   "
            required
          />
        </div>

        <Datepicker />

        <button type="submit" className="bg-azure p-4 mt-6 font-press-start text-white rounded">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;

