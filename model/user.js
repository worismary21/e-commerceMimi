import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';





const usersSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    }

},{
    timestamps: true
})



usersSchema.methods.comparePasswords = async function(entered){
    return bcrypt.compare(entered, this.password)
}

usersSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", usersSchema)

export default User
