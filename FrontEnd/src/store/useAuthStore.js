import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create(
    (set) => (
        {
            authUser: null,
            isSigningup: false,
            isLogining: false,
            isUpdatingProfile: false,
            isChecking: true,
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

        }
    )
)