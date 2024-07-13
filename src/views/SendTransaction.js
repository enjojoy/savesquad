import {
    Account,
    Chain,
    Hex,
    Transport,
    WalletClient,
    PublicClient,
    parseEther,
} from "viem";

import { Button } from "flowbite-react";
import { useState } from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getChain } from "@dynamic-labs/viem-utils";



export const SendTransactionSection = (address) => {
    const { primaryWallet } = useDynamicContext();

    const [txnHash, setTxnHash] = useState("");

    if (!primaryWallet) return null;

    const onSubmit = async (event, address) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const amount = formData.get("amount");
        const provider = await primaryWallet.connector.getSigner();
        if (!provider) return;

        const transaction = {
            account: primaryWallet.address,
            chain: getChain(await provider.getChainId()),
            to: address,
            value: amount ? parseEther(amount) : undefined,
        };

        const hash = await provider.sendTransaction(transaction);

        const client =
            await primaryWallet.connector.getPublicClient();

        const { transactionHash } = await client.getTransactionReceipt({
            hash,
        });
        setTxnHash(transactionHash);
    };

    return (
        <form className="flex justify-end gap-x-2  m-4" onSubmit={onSubmit}>
            <input name="amount" className=" h-fit" type="text" required placeholder="0.05" />
            <Button type="submit" className="mt-5  w-28 justify p-0 m-0" color={"green"}>
                Contribute
            </Button>
            <span data-testid="transaction-section-result-hash">{txnHash}</span>
        </form>
    );
};