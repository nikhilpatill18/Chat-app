import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import Chatheader from './Chatheader'
import Messaageinput from './Messaageinput'
import Messageskeleton from './Messageskeleton'
import { useAuthStore } from '../store/useAuthStore.js'
import { formatedate } from '../lib/formatdate.js'

const Chatcontainer = () => {
    const { getmessage, selectedUser, messages, isMessageLoading, updatemessages, unsubscribemessage } = useChatStore()
    const { authUser } = useAuthStore()
    useEffect(() => {
        getmessage(selectedUser._id)
        // updatemessages()


        return () => unsubscribemessage()

    }, [selectedUser._id, getmessage, unsubscribemessage, updatemessages])

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
            {/* < Chatheader /> */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {
                    messages.map((message) => (
                        <div key={message._id} className={`chat  ${message.reciverId === selectedUser._id ? 'chat-end' : 'chat-start'}`}>
                            <div className='chat-image'>
                                <div className='size-10 rounded-full'>
                                    <img src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'} alt="" />
                                </div>
                            </div>
                            <div className='chat-footer'>
                                <time className='text-sm opacity-50'>
                                    {formatedate(message.createdAt)}
                                </time>

                            </div>
                            <div className='chat-bubble flex'>
                                {message.image && (
                                    <img src={message.image} alt="Attachment" className='"sm:max-w-[200px] rounded-md mb-2' />
                                )}
                                {
                                    message.text && <p>{message.text}</p>
                                }

                            </div>
                        </div>
                    ))
                }

            </div>
            <Messaageinput />

        </div >
    )
}

export default Chatcontainer
