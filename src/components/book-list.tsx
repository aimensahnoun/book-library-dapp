"use client"

import { contractConfig } from "@/constants/contract"
import { transactionHashesAtom } from "@/utils/global-state"
import { ethers } from "ethers"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi"
import Book from "./book"

import Button from "./button"

type Book = {
    name: string,
    count: number
}

const BookList = () => {

    // Local State
    const [bookList, setBookList] = useState<Book[]>([])

    // Global State
    const [transactionHashes, setTransactionHashes] = useAtom(transactionHashesAtom);

    // Wagmi State
    const { data: books, isLoading } = useContractRead({
        ...contractConfig,
        functionName: 'viewBookList',
        watch: true
    })



    useEffect(() => {
        if (books) {
            setBookList(books as any)
        }
    }, [books])


    return <div className="flex flex-col gap-y-4 p-4">

        {
            bookList?.map((book: Book, index: number) => {
                return <Book key={index} bookId={index} count={book.count} name={book.name} />
            })}
    </div>

}

export default BookList