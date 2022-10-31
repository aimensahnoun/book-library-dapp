// Dependencies import
import { useAtom } from "jotai"
import { MdRssFeed } from "react-icons/md"
import { BiAddToQueue } from "react-icons/bi"
import { BsBook } from "react-icons/bs"

// Utils import
import { Event, eventsAtom, navbarHeightAtom } from '@/utils/global-state';
import Button from "./button";
import { POLYSCAN_URL } from "@/constants";

const SideBar = () => {

    // Global state
    const [navHeight] = useAtom(navbarHeightAtom);
    const [eventList] = useAtom(eventsAtom)

    console.log(eventList)

    const renderIcon = (type: string) => {
        if (type === 'add') {
            return <BiAddToQueue className='text-[1.5rem]' />
        } else {

        }
    }

    return <aside style={{
        height: `calc(100vh - ${navHeight + 1}px)`,
    }} className={`w-[31rem] bg-brandBg border-l-[1px] border-l-gray-700 p-4 overflow-y-scroll`}>
        <div className="flex items-center gap-x-2 justify-center w-full mb-6">
            <MdRssFeed className="text-[1.5rem]" />
            <span className="font-bold text-lg">Activity Feed</span>

        </div>
        <div className="flex flex-col-reverse gap-y-2 flex-wrap justify-center">
            {
                eventList.map((event: Event, index) => {
                    return <div key={event.transcationHash} className="flex items-center gap-x-4">
                        {
                            event.type === "add" ? <BiAddToQueue className='text-[1.5rem]' /> : <BsBook className="text-[1.5rem]" />
                        }
                        <div className="flex flex-col">
                            <span className="font-bold">{event.name} <span className="font-normal">{event.type === "add" ? "has been added" : (event.type == "borrow" ? "A book has been borrowed" : "A book has been returned")}</span> </span>
                            <a className="text-blue-500" href={`${POLYSCAN_URL}/${event.transcationHash}`} target={"_blank"} rel="noreferrer">View transaction</a>
                        </div>
                    </div>
                })
            }
        </div>
    </aside>
}

export default SideBar