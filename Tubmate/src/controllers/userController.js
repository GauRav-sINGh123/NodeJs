import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/userModel.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';


export const registerUser= asyncHandler(async (req, res) => {
  const {fullName,email,username,password}=req.body;
  
  if(
    [fullName,email,username,password].some((field)=>field?.trim()==="")
  ){
    throw new ApiError(400,"All fields are required");
  }
  if(email.includes("@")===false){
    throw new ApiError(400,"Invalid email");
  }
  
  const existingUser=await User.findOne({
    $or:[
      {email},
      {username}
    ]
  })

  if(existingUser){
    throw new ApiError(409,"User already exists");
  }
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
 

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }
  

  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
      throw new ApiError(400, "Avatar file failed to upload")
  }
 
   const user=await User.create({
    fullName,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
   })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
     if(!createdUser){
      throw new ApiError(500,"Something went while registering user");
     }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User created successfully"),
   )
})