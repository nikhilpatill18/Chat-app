import User from '../models/user.model.js'
import { Apiresponse } from '../utils/Apiresponse.js'
import { Message } from '../models/message.model.js'
import { uploadoncloudinary } from '../utils/fileupload.js'
import { io, getreciverid } from '../lib/soket.js'



// getting all ther other user 
export const sidebaruser = async (req, res) => {
    try {

        const myId = req.user?._id;
        const alluser = await User.find({
            _id: {
                $ne: myId
            }
        })
        // console.log(alluser)

        return res.status(200).json(new Apiresponse(200, alluser, "all userd found")
        )

    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "erroe while fetcing the user" })

    }
}


//gettting message of a particuclat user 

export const getmessage = async (req, res) => {
    try {

        const { id: senderId } = req.params

        const myId = req.user?._id

        const messages = await Message.find(
            {
                $or: [
                    { senderId: myId, reciverId: senderId },
                    {
                        senderId: senderId, reciverId: myId
                    }
                ]
            }
        )
        res.status(200).json(new Apiresponse(200, messages, "got alll the message"))

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Erroe while fetching the message" })

    }
}

// sending user messgae or image

export const sendmessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: reciverId } = req.params

        const senderId = req.user._id
        let imageurl;
        if (image) {
            // upload the image on the cloudinary server
            const uplaod = await uploadoncloudinary(image)
            console.log(uplaod)
            imageurl = uplaod.secure_url
        }
        console.log(image)

        const newMessage = await Message.create({
            senderId: senderId,
            reciverId: reciverId,
            text: text,
            image: imageurl
        })

        if (!newMessage) {
            res.status(500).json({ message: "while while sending the message" })
        }
        // console.log(newMessage)
        const reciversocketid = getreciverid(reciverId)
        // console.log(reciversocketid, "userid")
        if (reciversocketid) {
            io.to(reciversocketid).emit("newmessage", newMessage)
        }

        //todo realtime funcality thoruhgt the socket.io
        return res.status(200).json(new Apiresponse(200, newMessage, "message send sucessfully"))

    } catch (error) {
        console.log(error, "error in send mesaage controller")
        return res.status(500).json({ message: "while while sending the message" })


    }
}