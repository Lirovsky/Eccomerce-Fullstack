import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTempalte from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";

export async function registerUserController(request, response) {
  try {
    // request for required values
    const { name, email, password } = request.body;

    // checks if all fields exist
    if (!name || !email || !password) {
      response.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    // check if email already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      response.status(400).json({
        message: "Email already exists",
        error: true,
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // password encrypted
    const payload = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await UserModel(payload);
    const savedUser = await newUser.save();
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify your email",
      html: verifyEmailTempalte({
        name,
        url: verifyUrl,
      }),
    });

    return response.status(201).json({
      message: "User created successfully",
      error: false,
      success: true,
      data: savedUser,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
