import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generatetoken } from "../utils/generatetToken.js";
import { delmediafromcloudinary, uploadmedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.toLowerCase().trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return generatetoken(res, newUser, `Welcome ${newUser.name}`);
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Sanitize inputs
    email = email?.toLowerCase().trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email and password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email and password",
      });
    }

    return generatetoken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (req,res) => {
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:"user logged out"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"faled to logout"
    })
  }
}

export const getuserprofile = async (req, res) => {
  try {
    const userId = req.id  
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user"  
    })
  }
}

export const updateprofile =  async (req, res) => {
  try {
    const userId = req.id  
    const {name} = req.body
    const profilephoto = req.file 
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      })
    }

    let photoUrl = user.photoUrl
    if (profilephoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0]
        await delmediafromcloudinary(publicId)
      }
      const cloudresponse = await uploadmedia(profilephoto.path)
      photoUrl = cloudresponse.secure_url
    }

    const updatedata = {name, photoUrl}
    const updatedUser = await User.findByIdAndUpdate(userId, updatedata, {new:true}).select("-password")
    
    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully"
    })
  } catch (error) { 
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message
    })
  }
}