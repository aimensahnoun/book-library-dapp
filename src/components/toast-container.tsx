// Dependencies import
import { useAtom } from "jotai";
import { useAutoAnimate } from '@formkit/auto-animate/react'


// Utils import
import { transactionHashesAtom } from "@/utils/global-state";
import Transaction from "./transaction";



const TranscationToast = () => {

    const [animationParent] = useAutoAnimate()

    const [transactionHashes] = useAtom(transactionHashesAtom)

    return <div ref={animationParent as any} className="absolute w-[22.6rem] h-fit z-20 bottom-0 right-0 bg-brandBg rounded-t-lg flex flex-col-reverse gap-y-2 ">
        {
            transactionHashes.map((transactin: string) => {
                return <Transaction key={transactin} hash={
                    transactin
                } />
            })
        }
    </div>
}


export default TranscationToast;