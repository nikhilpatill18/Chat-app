import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from './useAuthStore'
export const useChatStore = create((set, get) => (
    {
        messages: [],
        users: [],
        selectedUser: null,
        isUserloading: false,
        isMessageLoading: true,
        getusers: async () => {
            try {
                set({ isUserloading: true })
                const users = await axiosInstance.get('/message/users')
                console.log(users.data.data)
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
                console.log(messages.data.data)
                // console.log(isMessageLoading)
                set({ messages: messages.data.data })
            } catch (error) {
                toast.error("unable to laod the messages")
            }
            finally {
                set({ isMessageLoading: false })
            }
        },
        // todo to optimize this later
        setselectedUser: async (selectedUser) => {
            set({ selectedUser: selectedUser })
            console.log(selectedUser, "chatstore")
        },
        sendmessage: async (messageData) => {
            const { selectedUser, messages } = get()
            try {
                const response = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
                // console.log(response.data.data)
                set({ messages: [...messages, response.data.data] })
            } catch (error) {
                console.log(error)
                toast.error("Unbale to send the message")

            }

        },
        updatemessages: () => {
            const { selectedUser } = get()
            if (!selectedUser) return
            const socket = useAuthStore.getState.socket
            socket.on("newmessage", (newmessage) => {
                if (!newmessage) return
                set({ messages: [...get().messages, newmessage.data.data] })
            })
        },
        unsubscribemessage: () => {
            const socket = useAuthStore.getState.socket
            socket.off("newmessage")


        }

    }
))