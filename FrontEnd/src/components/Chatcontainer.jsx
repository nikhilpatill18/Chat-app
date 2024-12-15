import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import Chatheader from './Chatheader'

const Chatcontainer = () => {
    const { getmessage, selectedUser, messages, isMessageLoading } = useChatStore()

    if (isMessageLoading) {
        return <div>Loading..</div>
    }
    useEffect(() => {
        getmessage(selectedUser._id)
    }, [selectedUser._id, getmessage])
    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <Chatheader />

            <p>message..</p>
            <Messageinput />

        </div>
    )
}

export default Chatcontainer
