import { testAtom } from "@/utils/global-state"
import { useAtom } from "jotai"

const Navbar = () => {

    const [test, setTest] = useAtom(testAtom)

    return <nav>
        {test}
    </nav>
}

export default Navbar

