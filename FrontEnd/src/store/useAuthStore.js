import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
// import { authuser } from '../../../BackEnd/src/controller/auth.controller.js'

export const useAuthStore = create(
    (set) => (
        {
            authUser: null,
            isSigningup: false,
            isLogining: false,
            isUpdatingProfile: false,
            isChecking: true,
            islogingout: false,
            checkAuth: async () => {
                try {

                    const res = await axiosInstance.get("/auth/check")

                    set({ authUser: res.data })

                }
                catch (err) {
                    console.log("erroe in check auth", err);
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


                } catch (error) {
                    console.log("Error in logging out", error)
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
                    set({ authUser: reponse.data })
                    toast.success("login SucessFully")

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
                    set({ authUser: user })
                    toast.success("Profile Updated")

                } catch (error) {
                    set({ isUpdatingProfile: false })
                    console.log(error)
                    toast.error("unbale to update profile")

                }

            }

        }
    )
)