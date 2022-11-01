// React import
import { useState } from "react";

// Custom component import
import Button from "./button";

// Dependencies import
import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useAtom } from "jotai";

// Utils import
import { contractConfig } from "@/constants/contract";
import { transactionHashesAtom } from "@/utils/global-state";


type Props = {
    isOpen?: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
};

const AddBookModal: React.FC<Props> = ({ setIsModalOpen }) => {

    // Local state
    const [title, setTitle] = useState("");
    const [numOfCopies, setNumOfCopies] = useState("0");

    // Global State
    const [transactionHashes, setTransactionHashes] = useAtom(transactionHashesAtom);

    // Wagmi State
    const { config, } = usePrepareContractWrite({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'addBook',
        args: [title, parseInt(numOfCopies)],
        overrides: {
            gasLimit: ethers.BigNumber.from(1000000),
        },
        onError: (error) => {
            console.log(error);
            alert(JSON.stringify(error.message))
        },

    })

    const addBook = useContractWrite({
        ...config as any,
        onSuccess(data, variables, context) {
            setIsModalOpen(false);
        },
    })

  



    return <div onClick={() => {
        setIsModalOpen(false)
    }} className="w-screen h-screen inset-0 fixed z-10 bg-black/40 flex items-center justify-center cursor-pointer">
        <div onClick={(e) => {
            e.stopPropagation()
        }} className="w-[40rem] h-[20rem] rounded-xl bg-modalBg p-4 flex flex-col gap-y-4">
            <span className="font-bold text-xl block mb-4">Add Book</span>
            <div className="flex flex-col gap-y-1">
                <label>Title:</label>
                <input className="bg-brandBg rounded-lg w-[20rem] p-1 outline-none" placeholder="The Great Gatsby"

                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}

                />
            </div>
            <div className="flex flex-col gap-y-1">
                <label>Number of copies:</label>
                <input className="bg-brandBg rounded-lg w-[20rem] outline-none p-1" type={
                    "number"
                }
                    onChange={(e) => {
                        e.target.value = Math.abs(parseInt(e.target.value)).toString()
                        setNumOfCopies(e.target.value)
                    }}

                    placeholder="15" />
            </div>

            <div className="mt-auto flex w-full items-center justify-center gap-x-4">
                <Button className="bg-brandBg shadow-brandBg/60 hover:shadow-brandBg/80 active:shadow-brandBg/100">Cancel</Button>
                <Button disabled={
                    parseInt(numOfCopies) === 0 || title.length == 0
                } className={`${parseInt(numOfCopies) === 0 || title.length == 0 ? "bg-gray-700 cursor-not-allowed shadow-none" : ""}`}
                    onClick={async () => {
                        if (addBook.writeAsync) {
                            const tx = await addBook.writeAsync()
                            setTransactionHashes([...transactionHashes, tx.hash])
                        }

                    }}
                >Submit</Button>
            </div>
        </div>
    </div>
}

export default AddBookModal