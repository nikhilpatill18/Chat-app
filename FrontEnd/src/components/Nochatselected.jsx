import React from 'react'
import { MessageCircle } from 'lucide-react'

const Nochatselected = () => {
    return (
        <div className='w-full flex  flex-col flex-1 justify-center items-center  p-16 bg-base-100/50'>
            <div className='max-w-md text-center space-y-6'>
                <div className='flex justify-center gap-4 mb-4'>
                    <div className='relative'>
                        <div className='w-16 h-16 flex items-center justify-center bg-primary/10 animate-pulse rounded-2xl'>
                            <MessageCircle className='w-8 h-8 text-primary' />

                        </div>

                    </div>

                </div>
                <h2 className='text-2xl font-bold'>Welcome to talk</h2>
                <p className='text-base-content/60'>start a talk with your friend from side bar 😁</p>

            </div>


        </div>
    )
}

export default Nochatselected
