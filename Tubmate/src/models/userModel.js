import mongoose from 'moongose';
import jwt from 'jsonwebtoken'
import bycrpt from 'bcrypt'

const userSchema=new mongoose.userSchema({
     username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
     },
     fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
     },
     avatar:{
        type:String,
        required:true
     },
     coverImage:{
        type:String,
     },
     watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
     }],
     password:{
        type:String,
        required:[true,"Password is required"],
     },
     refreshToken:{
        type:String
     }
     
},{timestamps:true});

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next();
   
   this.password=await bycrpt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bycrpt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
       {
           _id: this._id,
           email: this.email,
           username: this.username,
           fullName: this.fullName
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
       }
   )
}
userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
       {
           _id: this._id,
           
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
   )
}

export const User=mongoose.model('user',userSchema);