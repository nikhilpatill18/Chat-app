import { ApiError } from '../utils/apierror.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { Apiresponse } from '../utils/Apiresponse.js'
import { uploadoncloudinary } from '../utils/fileupload.js'


// signup route
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {

        // check all the feild are present are not
        if (!fullname || !email || !password) {
            return res.status(400).json({ "message": "All feilds are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ "message": "password must be more than 6 length" })
        }
        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({ "message": "user alreasy found" })
        }

        const newuser = await User.create({
            email,
            fullname,
            password,
        })

        //select user  without password and refresh token
        const createduser = await User.findById(newuser._id).select("-password -refreshtoken")
        if (!createduser) {
            throw new ApiError(400, "something went wrong while crating user")
        }

        //created  accesstoken and refresh token
        const { accessToken, refreshtoken } = await genrateaccesstokenandrefreshtoken(newuser._id)
        const option = {
            httpOnly: true,
            secure: true
        }
        // send cookie and response as json data
        return res.status(200).cookie("accesstoken", accessToken, option).cookie("refreshtoken", refreshtoken, option).json(
            new Apiresponse(200, createduser, "Accout created succcessfully")
        )
    } catch (error) {

    }

}


//genrate access token and refresh token methods
const genrateaccesstokenandrefreshtoken = async function (id) {
    try {
        const user = await User.findById(id)
        // console.log("id", user)
        const accessToken = await user.genrateaccessToken()
        const refreshtoken = await user.genraterefreshToken()
        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })
        // console.log(accessToken, refreshtoken)
        return { accessToken, refreshtoken }
    }
    catch (err) {
        throw new ApiError(500, err)

    }
}

//logout route
export const logout = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, {
        $unset: {
            refreshtoken: 1
        }
    },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accesstoken", options)
        .clearCookie("refreshtoken", options)
        .json(new Apiresponse(200, {}, "User logout Out Sucssfully"))

}

//login route
export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const looedInuser = await User.findOne({ email: email }).select("-refreshtoken")

        if (!looedInuser) {
            return res.status(404).json({ message: "user not found" })
        }

        const checkpass = await looedInuser.isPasswordCorrect(password)
        if (!checkpass) {
            return res.status(401).json({ message: "Passsword is incorrect" })
        }
        const { accessToken, refreshtoken } = await genrateaccesstokenandrefreshtoken(looedInuser._id)

        const options = {
            httpOnly: true,
            secure: true,
        }
        return res.status(200).cookie("accesstoken", accessToken, options).cookie("refeshtoken", refreshtoken, options).json(new Apiresponse(200, { looedInuser }, "user login sucessfully"))






    } catch (error) {
        console.log(error)

    }

}

// update profil controller
// testing left in postman
export const updateprofile = async (req, res) => {
    try {

        const profilepic = req.body;
        const userid = req.user?._id
        const response = await uploadoncloudinary(profilepic)

        const updateduser = await User.findByIdAndUpdate(userid, {
            profilepic: response.secure_url
        },
            {
                new: true
            }
        )
        if (!updateduser) {
            return res.status(500).json({ message: "unable to uplaod the file" })
        }
        return res.status(200).json(new Apiresponse(200, updateduser, "file upload sucessfully"))



    } catch (error) {
        console.log(error)

    }

}


//auth user

//testing done
export const authuser = (req, res) => {
    try {

        res.status(200).json(new Apiresponse(200, req.user, "authenticated user"))

    } catch (error) {
        console.log(error, "auth user contoller")
        res.status(500).json({ message: "internal server error" })
    }
}