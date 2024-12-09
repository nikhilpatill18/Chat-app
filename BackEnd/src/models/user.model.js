import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    profilPic: {
        type: String,
        default: ""
    },
    refreshtoken: {
        type: String
    }


}, { timestamps: true });


//haasing the password using bcrypt
userschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


//genrate refresh token methoas as the plugin
userschema.methods.genraterefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

//genrate access token methoas as the plugin
userschema.methods.genrateaccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//checking user password is correct or not

userschema.methods.isPasswordCorrect = async function (candidatePassword) {
    try {
        // console.log(this.password)
        // Compare the candidate password with the hashed password stored in the DB
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        console.log(err)
        throw new Error('Error comparing passwords');
    }
};

const User = mongoose.model('User', userschema)
export default User