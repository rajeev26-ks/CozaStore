import userDataSchema from "../modal/userSchema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendResetEmail } from "../utils/emailService.js";
import nodemailer from "nodemailer";

// import crypto from "crypto";
// import bcrypt from "bcrypt";
// import User from "../modal/userSchema.js";
// import { sendResetEmail } from "../utils/emailService.js";


// 📧 EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rs2652002@gmail.com",
    pass: "qlyhfzfrqkwcyefx",
  },
});




// ================= SIGNUP =================
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findEmail = await userDataSchema.findOne({ email });

        if (findEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const encPass = await bcrypt.hash(password, 10);

        const data = await userDataSchema.create({
            ...req.body,
            password: encPass,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const user = await userDataSchema.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




export const findUsers = async (req, res) => {
    try {
        const data = await userDataSchema.find()
        return res.json({
            status: 200,
            success: true,
            message: "Here all the users data.",
            body: data,
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            success: false,
            message: error,
            body: {}
        })
    }
}


export const findUserByIdByBody = async (req, res) => {
    try {
        const data = await userDataSchema.findById(req.body.id)
        console.log(data, "singleUser")
        return res.json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data
        })
    } catch (error) {
        console.log(error)
    }
}



export const findUserByIdByParams = async (req, res) => {
    try {
        const data = await userDataSchema.findById({ id: req.params.id })
        console.log(data, "user by params")
        return res.json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data
        })
    } catch (error) {
        console.log(error)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const data = await userDataSchema.findByIdAndDelete({ id: req.params.id })
        const count = await userDataSchema.countDocuments()
        console.log(data,"user deleted")
        return res.json({
            success: true,
            status: 200,
            message: "user deleted successfully",
            body: count, data
        })
    } catch (error) {
        console.log(error)
    }
}



export const userUpdate = async(req,res)=>{
    try {
        const encPass = await bcrypt.hash(req.body.password,10)
        const data = await userDataSchema.findByIdAndUpdate({_id:req.body.id},{...req.body,password:encPass},{new:true})
        console.log(data," updated user")
        return res.json({
             success:true,
            status:200,
            message:"user update successfully",
            body:data
        })
    } catch (error) {
        console.log(error)
    }
}





// controller/userController.js


// --- existing login/register functions stay here ---



export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
   const user = await userDataSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({ message: "If that email exists, a reset link was sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken   = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    console.log("📧 Sending email to:", user.email);
    console.log("🔗 Reset link:", resetLink);
    console.log("🔑 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "loaded ✅" : "MISSING ❌");
    console.log("🔑 CLIENT_URL:", process.env.CLIENT_URL);

    await sendResetEmail(user.email, resetLink);

    console.log("✅ Email sent successfully");

    res.status(200).json({ message: "If that email exists, a reset link was sent." });
  } catch (err) {
    console.error("❌ forgotPassword error:", err); // full error in terminal
    res.status(500).json({ message: err.message }); // full message to frontend
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token }       = req.params;
    const { newPassword } = req.body;

    const user = await userDataSchema.findOne({
      resetPasswordToken:   token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    user.password             = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken   = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("❌ resetPassword error:", err);
    res.status(500).json({ message: err.message });
  }
};