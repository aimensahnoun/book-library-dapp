// NextJs import
import Head from 'next/head'

// Custom Components import
import BookList from '@/components/book-list'

// Dependecies import
import { useAtom } from 'jotai'
import { useContractEvent } from 'wagmi'

// Utils import
import { Event, eventsAtom, navbarHeightAtom } from '@/utils/global-state'
import { contractConfig } from '@/constants/contract'



export default function Home() {



  const [navBarHeight] = useAtom(navbarHeightAtom)
  const [eventList, setEventList] = useAtom(eventsAtom)

  useContractEvent({
    ...contractConfig,
    eventName: 'BookAdded',
    listener: (bookId, name, count, node) => {

      const info = {
        bookId,
        name,
        count,
        node
      }

      const newEvent: Event = {
        type: 'add',
        bookId: bookId.toString(),
        name: name.toString(),
        transcationHash: node.transactionHash,
      }

      setEventList([...eventList, newEvent])

    }
  })

  return (
    <div style={{
      height: "calc(100vh - " + navBarHeight + "px)",
    }} className='w-full overflow-y-scroll'>
      <Head>
        <title>Book Library | LimeAcademy</title>
        <meta name="description" content="A book library Dapp for LimeAcademy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <BookList />

    </div>
  )
}
