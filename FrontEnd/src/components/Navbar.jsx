import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { LogOut, MessagesSquare, Settings, User } from 'lucide-react'

const Navbar = () => {
    const { authUser, islogingout, logout } = useAuthStore()
    return (
        <header className=' bg-base-100 border-b border-base-300 w-full fixed top-0 z-40 backdrop-blur-lg bg-base-100/80'>
            <div className='container mx-auto px-4 h-16'>
                <div className='flex justify-between items-center h-full'>
                    <div className='flex items-center g-8'>
                        <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                            <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                                <MessagesSquare className='w-5 h-5 text-primary' />
                            </div>
                            <h1 className='text-lg font-bold'>
                                Talk
                            </h1>
                        </Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Link to='/setting' className='btn btn-sm gap-2 transition-colors'>
                            <Settings className='w-4 h-4' />
                            <span className='hidden sm:inline'>Setting</span>
                        </Link>
                        {
                            authUser && (
                                <>
                                    <Link to='/profil' className='btn btn-sm gap-2 transition-colors'>
                                        <User className='w-4 h-4' />
                                        <span className='hidden sm:inline'>Profil</span>
                                    </Link>
                                    <button className='btn flex gap-2 items-center' onClick={logout}>
                                        <LogOut className='size-5' />
                                        <span className='hidden sm:inline'>Logout</span>
                                    </button>

                                </>
                            )
                        }

                    </div>

                </div>

            </div>
        </header>
    )
}

export default Navbar
