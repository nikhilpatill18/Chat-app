import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'

const Profilpage = () => {
    const { updateprofile, isUpdatingProfile, authUser } = useAuthStore()

    const handelsubmit = async (e) => {
        const file = e.target.files[0]
        if (!file) return;
        // const reader = new FileReader();
        // reader.readAsDataURL(file)
        // reader.onload = async () => {
        //     const base64image = reader.result;
        //     await updateprofile({ profilepic: base64image })
        // }
        // update image funcnality to be added further
        await updateprofile({ profilepic: file })

    }
    return (
        <div className='h-screenn pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8 '>
                <div className='bg-base-300 rounded-xl p-6 space-y-6'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Profile</h1>
                        <p className='mt-t'>Your Information</p>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            <img src={authUser?.profilPic || "#"} alt="" className={'rounded-full  size-32 object-cover border-4'} />
                            <label htmlFor="avatarupload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                                <Camera className='w-5 h-5 text-base-200' />
                                <input type="file" id='avatarupload' className='hidden' accept='image/*' onChange={handelsubmit} disabled={isUpdatingProfile} />
                            </label>
                        </div>
                        <p className='text-sm text-zinc-400'>
                            {
                                isUpdatingProfile ? "Uploading..." : "Click to uplaod the profile"
                            }
                        </p>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profilpage
