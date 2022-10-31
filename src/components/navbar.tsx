// Dependencies import
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAtom } from "jotai"

// Utils import
import { testAtom } from "@/utils/global-state"

const Navbar = () => {

    const [test, setTest] = useAtom(testAtom)

    return <nav className='flex p-4 items-center justify-between w-full border-b-[1px] border-b-gray-700'>
        <span className='font-bold text-lg'>Book Library | LimeAcademy</span>
        <ConnectButton />
    </nav>
}

export default Navbar

