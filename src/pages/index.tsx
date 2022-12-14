// NextJs import
import Head from 'next/head'

// Custom Components import
import BookList from '@/components/book-list'

// Dependecies import
import { useAtom } from 'jotai'
import { useContractEvent } from 'wagmi'

// Utils import
import { Event, eventsAtom, navbarHeightAtom, transactionHashesAtom } from '@/utils/global-state'
import { contractConfig } from '@/constants/contract'



export default function Home() {



  const [navBarHeight] = useAtom(navbarHeightAtom)
  const [eventList, setEventList] = useAtom(eventsAtom)
  const [transactinsHashes, setTransactinsHashes] = useAtom(transactionHashesAtom)

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
      const newHashes = transactinsHashes.filter((hash) => hash != node.transactionHash)
      setTransactinsHashes(newHashes)
    }
  })

  useContractEvent({
    ...contractConfig,
    eventName: 'BookBorrowed',
    listener: (bookId, user, node) => {


      const newEvent: Event = {
        type: 'borrow',
        bookId: bookId.toString(),
        user: user.toString(),
        transcationHash: node.transactionHash,
      }

      setEventList([...eventList, newEvent])
      const newHashes = transactinsHashes.filter((hash) => hash != node.transactionHash)
      setTransactinsHashes(newHashes)
    }
  })

  useContractEvent({
    ...contractConfig,
    eventName: 'BookReturned',
    listener: (bookId, user, node) => {


      const newEvent: Event = {
        type: 'return',
        bookId: bookId.toString(),
        user: user.toString(),
        transcationHash: node.transactionHash,
      }

      setEventList([...eventList, newEvent])
      const newHashes = transactinsHashes.filter((hash) => hash != node.transactionHash)
      setTransactinsHashes(newHashes)
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
