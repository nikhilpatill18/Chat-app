import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import Imagepattern from '../components/Imagepattern'
import toast from 'react-hot-toast'

const Login = () => {
    const [showpassword, setShowpassword] = useState(false)
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })
    const { login, isLogining } = useAuthStore()
    const handlesubmit = (e) => {
        e.preventDefault()
        login(formdata)
    }

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* left side */}

            <div className='flex flex-col justify-center items-center p-6 sm:12 '>
                <div className='w-full max-w-md space-y-8 '>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <span className='size-6 text-primary'></span>
                            </div>
                            <h1 className='text-2xl font-bold mt-2 group-hover:text-success'>Create Account</h1>
                            <p className='text-base-content/60'>Get Started with your free account</p>

                        </div>

                    </div>
                    <form onSubmit={handlesubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute flex items-center pl-3 left-0 inset-y-0  pointer-events-none'>
                                    <Mail className='size-5 text-base-content/60' />
                                </div>
                                <input type="text" className='input input-bordered w-full pl-10' placeholder='you@example.com' value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />


                            </div>


                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute flex items-center pl-3 left-0 inset-y-0  pointer-events-none'>
                                    <Lock className='size-5 text-base-content/60' />
                                </div>
                                <input type={showpassword ? "text" : "password"} className='input input-bordered w-full pl-10' placeholder='' value={formdata.password} onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} />

                                <span className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={(e) => setShowpassword(!showpassword)}>
                                    {
                                        showpassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className='size-5 text-base-content/40' />
                                    }
                                </span>
                            </div>


                        </div>

                        <button type='submit' className='btn btn-primary w-full' disabled={isLogining}>

                            {
                                isLogining ? (
                                    <>
                                        <span className='loading loading-dots bg-primary loading-lg'>Loading..</span>
                                    </>
                                ) : 'Login Account'
                            }

                        </button>
                    </form>

                    <div className='text-center'>
                        <p className='text-base-content/40'>
                            Don't Have an Account {" "}<Link className='link link-primary link-hover' to="/signup">Sign up</Link>
                        </p>

                    </div>
                </div>
            </div>
            {/* right side */}

            <Imagepattern title='Be the creative' subtitle={"Connect your friends , share moments , and stay in touch with your loved Ones"} />
        </div>
    )
}

export default Login
