import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
export const useChatStore = create((set) => (
    {
        messages: [],
        users: [],
        selectedUser: null,
        isUserloading: false,
        isMessageLoading: false,
        getusers: async () => {
            try {
                set({ isUserloading: true })
                const users = await axiosInstance.get('/message/users')
                // console.log(users.data)
                set({ users: users.data.data })
            } catch (error) {
                console.log(error)
                toast.error("unable to laod the users")
            }
            finally {
                set({ isUserloading: false })
            }
        },
        getmessage: async (userId) => {
            try {
                set({ isMessageLoading: true })
                const messages = await axiosInstance.get(`/message/${userId}`)
                set({ messages: messages.data })
            } catch (error) {
                toast.error("unable to laod the messages")
            }
            finally {
                set({ isMessageLoading: false })
            }
        },
        // toto to optimize this later
        setselectedUser: async (selectedUser) => {
            set({ selectedUser: selectedUser })

        }

    }
))