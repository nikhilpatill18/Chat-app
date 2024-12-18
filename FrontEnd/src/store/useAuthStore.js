import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

export const useAuthStore = create(
    (set, get) => (
        {
            authUser: null,
            isSigningup: false,
            isLogining: false,
            isUpdatingProfile: false,
            isChecking: true,
            islogingout: false,
            onlineUsers: [],
            socket: null,
            checkAuth: async () => {
                try {

                    const res = await axiosInstance.get("/auth/check")
                    set({ authUser: res.data })
                    get().connectSocket()

                }
                catch (err) {
                    // console.log("erroe in check auth", err);
                    set({ authUser: null })
                }
                finally {
                    set({ isChecking: false })
                }
            },

            signup: async (data) => {
                try {
                    set({ isSigningup: true })
                    const respoonse = await axiosInstance.post("/auth/signup", data)
                    set({ authUser: respoonse.data })
                    toast.success("Acccont created Successfully")
                    get().connectSocket()

                } catch (error) {
                    toast.error("Error creating account")

                }
                finally {
                    set({ isSigningup: false })
                }

            }
            ,
            logout: async () => {
                try {
                    set({ islogingout: true })
                    const respoonse = await axiosInstance.get("/auth/logout")
                    set({ authUser: null })
                    toast.success("Logout SuccessFully")
                    get().disconnectSocket()


                } catch (error) {
                    // console.log("Error in logging out", error)
                    toast.error("Logout Failed")
                }
                finally {
                    set({ islogingout: false })
                }

            }
            ,
            login: async (data) => {
                try {
                    set({ isLogining: true })
                    const reponse = await axiosInstance.post("/auth/login", data)
                    // console.log(reponse.data.data._id, "login")
                    set({ authUser: reponse.data })
                    toast.success("login SucessFully")
                    get().connectSocket()

                } catch (error) {
                    console.log(error)
                    set({ isLogining: false })
                    set({ authUser: null })
                    toast.error("Invaid email or password")


                }
                finally {
                    set({ isLogining: false })
                }

            },
            updateprofile: async (data) => {
                try {
                    set({ isUpdatingProfile: true })
                    const user = await axiosInstance.put("/auth/update-profile", data)
                    set({ authUser: user.data })
                    toast.success("Profile Updated")

                } catch (error) {
                    set({ isUpdatingProfile: false })
                    // console.log(error)
                    toast.error("unbale to update profile")

                }
                finally {
                    set({ isUpdatingProfile: false })
                }

            },
            connectSocket: () => {

                const { authUser } = get()
                // console.log(authUser.data._id)
                if (!authUser || get().socket?.connected) return
                const socket = io("http://localhost:5001", {
                    query: {
                        userId: authUser.data._id
                    }
                })
                socket.connect()
                set({ socket: socket })
                socket.on("getonlineusers", (usersids) => {
                    set({ onlineUsers: usersids })

                })
            },
            disconnectSocket: () => {
                if (get().socket?.connected) get().socket.disconnect();
            }

        }
    )
)