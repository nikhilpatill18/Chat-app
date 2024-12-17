import { MessageCircle, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeletion from './SidebarSkeletion'
import { useAuthStore } from '../store/useAuthStore'


const Sidebar = () => {
    const { getusers, users, selectedUser, isUserloading, setselectedUser } = useChatStore()
    // console.log("users", users)

    const onlineuser = []
    useEffect(() => {
        getusers()

    }, [getusers])
    const { onlineUsers } = useAuthStore()

    if (isUserloading) return <SidebarSkeletion />
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font font-medium hidden lg:block'>
                        Contact
                    </span>
                </div>
                {/* todo:online filter toggle */}
            </div>
            <div className='overflow-y-auto w-full py-3'>
                {
                    users.map((user) =>
                    (
                        <button key={user._id} onClick={() => setselectedUser(user)} className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user.profilePic || "/avatar.png"} alt={"u"} className='size-12 object-cover rounded-full' />
                                {
                                    onlineUsers.includes(user._id) && (<span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-200'></span>)
                                }
                            </div>
                            {/* user info only visibile on larger screen */}
                            <div className='hidden lg:block text-left min-w-0'>
                                <div className='font-medium truncate'>
                                    {user.fullname}
                                </div>
                                <div className='text-sm text-zinc-400'>
                                    {
                                        onlineUsers.includes(user._id) ? "Online" : "offline"
                                    }

                                </div>

                            </div>
                        </button>
                    )
                    )
                }

            </div>

        </aside>
    )
}

export default Sidebar
