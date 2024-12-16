import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const Messaageinput = () => {
    const [text, setText] = useState("")
    const [imagepreview, setImagepreview] = useState(null)
    const fileinputref = useRef(null)
    const { sendmessage } = useChatStore()

    const handleimagechange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error("Please Selecet the image")
            return
        }
        const reader = new FileReader(file)
        reader.onloadend = () => {
            setImagepreview(reader.result)
        }
        reader.readAsDataURL(file)

    }
    const removeimage = () => {
        setImagepreview(null)
        if (fileinputref.current) fileinputref.current.value = ""
    }

    const handelsendmessage = async (e) => {
        e.preventDefault()
        if (!text.trim() && !imagepreview) {
            return
        }
        try {
            await sendmessage({ text: text.trim(), image: imagepreview ? imagepreview : "" })
            //clear the form
            setText("")
            setImagepreview(null)
            if (fileinputref.current) fileinputref.current.value = ""

        } catch (error) {
            console.log(error)
            // toast.error("Unbvale to send the message")

        }

    }
    return (
        <div className='p-4 w-full'>
            {
                imagepreview && (
                    <div className='mb-3 flex items-center gap-2'>
                        <div className='relative'>
                            <img src={imagepreview} alt="preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-300' />
                            <button onClick={removeimage} className='absolute -top-1.5 -right-1.5 w-5 h-5  rounded-full bg-base-300 flex items-center justify-center'>
                                <X className='size-3' />

                            </button>

                        </div>

                    </div>
                )
            }
            <form onSubmit={handelsendmessage} className='flex items-center gap-2'>

                <div className='flex-1 flex gap-2'>
                    <input type="text" className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='type a message..' value={text} onChange={(e) => setText(e.target.value)} />


                    <input type="file" accept='image/*' className='hidden' ref={fileinputref} onChange={handleimagechange} />


                    <button className={`hidden sm:flex btn btn-circle1 ${imagepreview ? "text-emerald-500" : "text-slate-300"}`} onClick={() => fileinputref.current?.click()} type='button'>
                        <Image size={20} />
                    </button>
                </div>
                <button type='submit' className='btn btn-sm btn-circle' disabled={!text.trim() && !imagepreview}>
                    <Send size={22} />
                </button>
            </form>
        </div>
    )
}

export default Messaageinput
