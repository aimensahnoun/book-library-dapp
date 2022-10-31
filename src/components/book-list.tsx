"use client"

import { contractConfig } from "@/constants/contract"
import { useEffect, useState } from "react"
import { useContractRead ,useContractWrite ,usePrepareContractWrite} from "wagmi"

import Button from "./button"

type Book = {
    name: string,
    count: number
}

const BookList = () => {

    const [bookList, setBookList] = useState<Book[]>([])

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
                return <div className="w-full h-[5rem] rounded-lg bg-modalBg flex items-center justify-between p-4" key={index}>
                    <div className="flex flex-col gap-y-2">
                        <span className="font-bold text-xl">{book.name}</span>
                        <span className="font-medium text-xs">Remaining copies: {book.count.toString()}</span>
                    </div>
                    <div>
                        <Button>Borrow Book</Button>
                    </div>
                </div>
            })}
    </div>

}

export default BookList