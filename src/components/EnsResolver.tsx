import { useState, useEffect } from "react";
import { isAddress } from "viem/utils";
import { useEnsAddress, useEnsName } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";

// import { Container, Layout } from '@/components/templates'

export default function EnsResolver({ members, setMembers }) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  // Resolve potential ENS names (dot separated strings)
  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: debouncedInput.includes(".") ? debouncedInput : undefined,
    chainId: 1,
  });

  // Resolve ENS name from address
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address: isAddress(debouncedInput) ? debouncedInput : undefined,
    chainId: 1,
  });

  useEffect(() => {
    if (ensAddress && !isAddress(input)) {
      setInput(ensAddress);
    }

    console.log(members);
  }, [ensAddress, members]);

  // Set the address (address if provided directly or resolved address from ENS name)
  const address =
    input !== debouncedInput
      ? undefined
      : isAddress(debouncedInput)
      ? debouncedInput
      : ensAddress;

  const handleAddMember = (e) => {
    e.preventDefault();
    console.log("MEMBERS:", members);

    if (address && !members.some((member) => member.address === address)) {
      const member = { domain: ensName, address };
      setMembers([...members, member]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full">
        <div className="mt-2">
          <AddressInput
            onChange={setInput}
            value={input}
            placeholder="Input your address"
          />
        </div>

        {/* <input
          id="address-input"
          type="text"
          placeholder="nick.eth"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded"
        /> */}
        {ensAddressIsLoading && (
          <div style={{ marginTop: "5px" }}>Loading...</div>
        )}
        {ensNameIsLoading && <div style={{ marginTop: "5px" }}>Loading...</div>}
        {/* {ensAddress && <div style={{ marginTop: '5px' }}>Resolved Address: {address}</div>} */}
        <button
          className="ml-2 p-e2 px-4 text-white rounded bg-azure"
          onClick={handleAddMember}
        >
          +
        </button>
      </div>

      {members && (
        <div style={{ marginTop: "20px" }}>
          {members.map((member, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              {typeof member.domain === undefined ||
              member.domain === null ||
              member.domain == "" ? (
                <span>
                  <strong>{member.domain}</strong>: {member.address}
                </span>
              ) : (
                <span>
                  <strong>{member.address}</strong>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
