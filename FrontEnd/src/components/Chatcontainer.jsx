import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import Chatheader from './Chatheader'
import Messaageinput from './Messaageinput'
import Messageskeleton from './Messageskeleton'

const Chatcontainer = () => {
    const { getmessage, selectedUser, messages, isMessageLoading } = useChatStore()
    useEffect(() => {
        getmessage(selectedUser._id)
    }, [selectedUser._id, getmessage])
    if (isMessageLoading) {
        return (

            <div className='flex-1 flex flex-col overflow-auto'>
                {/* <Chatheader /> */}
                <Messageskeleton />
                <Messaageinput />

            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            < Chatheader />
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>

            </div>
            <Messaageinput />

        </div >
    )
}

export default Chatcontainer
