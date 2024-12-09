import { ApiError } from '../utils/apierror.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { Apiresponse } from '../utils/Apiresponse.js'


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
export const logout = (req, res) => {
    res.send("logout")

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