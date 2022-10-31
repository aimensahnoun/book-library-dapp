// Custom component import
import Button from "./button"

// Dependencies import
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useAtom } from "jotai";

// Utils import
import { transactionHashesAtom } from "@/utils/global-state";
import { contractConfig } from "@/constants/contract";
import { ethers } from "ethers";

const Book = ({ name, count, bookId }: { name: string, count: number, bookId: number }) => {

    // Global State
    const [transactionHashes, setTransactionHashes] = useAtom(transactionHashesAtom);

    // Wagmi State
    const { address } = useAccount()

    const { data: hasUserBorrowedBook } = useContractRead({
        ...contractConfig,
        functionName: "checkBorrower",
        args: [bookId],
        overrides: {
            from: address,
        },
        watch: true
    })

    const { config: borrowBookConfig } = usePrepareContractWrite({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'borrowBook',
        args: [bookId],
        overrides: {
            gasLimit: ethers.BigNumber.from(1000000),
        },
        onError: (error) => {
            console.log(error);
            alert(JSON.stringify(error.message))
        },

    })

    const { config: returnBookConfig } = usePrepareContractWrite({
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName: 'returnBook',
        args: [bookId],
        overrides: {
            gasLimit: ethers.BigNumber.from(1000000),
        },
        onError: (error) => {
            console.log(error);
            alert(JSON.stringify(error.message))
        },

    })

    const borrowBook = useContractWrite({
        ...borrowBookConfig as any,
    })

    const returnBook = useContractWrite({
        ...returnBookConfig as any,
    })

    if (bookId === 1) {
        console.log(hasUserBorrowedBook)
    }

    return <div className="w-full h-[5rem] rounded-lg bg-modalBg flex items-center justify-between p-4" key={bookId}>
        <div className="flex flex-col gap-y-2">
            <span className="font-bold text-xl">{name}</span>
            <span className="font-medium text-xs">Remaining copies: {count.toString()}</span>
        </div>
        <div>
            {
                address &&
                <Button onClick={async () => {
                    let hash: string;
                    if (hasUserBorrowedBook && returnBook.writeAsync) {
                        const tx = await returnBook.writeAsync()
                        hash = tx.hash
                    } else if (borrowBook.writeAsync) {
                        const tx = await borrowBook.writeAsync()
                        hash = tx.hash
                    }

                    setTransactionHashes((prev) => {
                        return [...prev, hash]
                    })

                }} >{!hasUserBorrowedBook ? "Borrow Book" : "Return Book"}</Button>
            }
        </div>
    </div>
}

export default Book