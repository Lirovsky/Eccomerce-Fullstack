import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";

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
      html: verifyEmailTemplate({
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

export async function verifyEmailController(request, response) {
  try {
    // get the user ID
    const { code } = request.query;
    const user = await UserModel.findOne({ _id: code });

    if (!user) {
      response.status(400).json({
        message: "Code is required",
        error: true,
        success: false,
      });
    }
    const updatedUser = await UserModel.findOne({ _id: code }, { verify_email: true });

    return response.status(200).json({
      message: "User verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginController(request, response) {
  try {
    // get the user ID
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      response.status(400).json({
        message: "User does not exist",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      response.status(400).json({
        message: "User is not verified",
        error: true,
        success: false,
      });
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(400).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    response.cookie("accessToken", accessToken, cookieOptions);
    response.cookie("refreshToken", refreshToken, cookieOptions);

    return response.status(200).json({
      message: "User logged in successfully",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(request, response) {
  try {
    const userid = request.userId;

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    response.clearCookie("accessToken", cookieOption);
    response.clearCookie("refreshToken", cookieOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.status(200).json({
      message: "User logged out successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId;
    const image = request.file;

    const upload = await uploadImageClodinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.status(200).json({
      message: "Avatar uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId;
    const { name, email, mobile, password } = request.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return response.status(200).json({
      message: "User updated successfully",
      success: true,
      error: false,
      data: updateUser,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
