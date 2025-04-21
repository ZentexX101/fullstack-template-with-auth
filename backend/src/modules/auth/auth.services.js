const { StatusCodes } = require("http-status-codes"); // Import HTTP status codes
const AppError = require("../../errors/AppError"); // Custom error handling class
const { generateToken } = require("../../helper/utils/tokenUtils"); // Function to generate authentication token
const User = require("./auth.model"); // Importing the User model
const OtpModel = require("../../helper/otpSchema");
const { oauth2Client } = require("../../helper/utils/googleConfig"); // Google OAuth2 client configuration
const { default: axios } = require("axios"); // Axios for making HTTP requests
const { sendMailForOTP } = require("../../helper/mailing");


//  Generates a random password with a given length, defaulting to 8 characters.
//  The password includes letters, numbers, and special characters.
const generateRandomPassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";

  // Generate the password by selecting random characters from charset
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};


// Creates a new user in the database.
// The user data containing name, email, password, etc.
const createUser = async (data) => {
  if (!data.password) {
    data.password = generateRandomPassword();
  }
  const user = await User.create(data);
  const token = generateToken(user._id, user.role);

  return { user, token };
};

// Handles user login by verifying data and generating an authentication token.
// The login data containing email and password.
const userLogin = async (data) => {
  // Find the user by email and explicitly select the password field
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user || data.password !== user.password) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password.");
  }

  // Remove the password field from the returned user object
  const { password, ...userWithoutPassword } = user.toObject();

  const token = generateToken(user._id, user.role);

  return { token, role: user.role, user: userWithoutPassword };
};

// Logs in or registers a user via Google OAuth.
// data contain the authorization code.
const loginWithGoogle = async (data) => {
  // Exchange the authorization code for access tokens
  const googleResponse = await oauth2Client.getToken(data.code);
  oauth2Client.setCredentials(googleResponse.tokens); // Set the retrieved tokens for OAuth2 client

  // Fetch user information from Google's API
  const userResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
  );

  const { email, name, id } = userResponse?.data;

  // Check if user already exists in the database
  let user = await User.findOne({ email });

  // If user exists, return existing user and generate a token
  if (user) {
    console.log("User already exists");
    const token = generateToken(user._id, user.role);
    return { token, user };
  }

  // If user doesn't exist, create a new one
  const password = generateRandomPassword(); 
  user = await User.create({ email, name, password, googleId: id });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not created successfully");
  }

  const token = generateToken(user._id, user.role);
  return { token, user };
};


// Get the user profile from database
// The user object containing the user's id and role.
const getUser = async (user) => {
  // Check if the user object has a valid _id
  if (!user._id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Access denied. Insufficient permissions."
    );
  }

  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found.");
  }

  return foundUser;
};

// Finds a user by their email.
const findUserWithEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  return user;
};

// Generates a 6-digit OTP (One Time Password).
const generateOtp = () => {
  // Generate a 6-digit OTP by generating a random number between 100000 and 999999
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Sends an OTP email to the user for password reset.
const sendOtp = async (email) => {
  const otp = generateOtp();
  console.log(otp, "Generated OTP");

  // OTP expiration time (10 minutes from now)
  const expiresAt = new Date(Date.now() + 10 * 60000);

  const record = new OtpModel({ email, otp, expiresAt });
  await record.save();

  // HTML template for the OTP email
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f8ff;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                max-width: 600px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.7);
                padding: 20px;
                border-radius: 16px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                margin: 20px;
            }
            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #dddddd;
            }
            .header h1 {
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 18px;
                color: #555555;
            }
            .otp-box {
                display: inline-block;
                padding: 15px 30px;
                border-radius: 8px;
                background: linear-gradient(145deg, #e0f7fa, #ffffff);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px 0;
            }
            .otp {
                font-size: 24px;
                color: #333333;
                font-weight: bold;
                letter-spacing: 2px;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                border-top: 1px solid #dddddd;
                margin-top: 20px;
                color: #999999;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset OTP</h1>
            </div>
            <div class="content">
                <p>Your OTP for password reset is:</p>
                <div class="otp-box">
                    <span class="otp">${otp}</span>
                </div>
                <p>This OTP is valid for 10 minutes. Please use it promptly.</p>
            </div>
            <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Send the OTP email to the user using the sendMailForOTP function
  await sendMailForOTP(
    email,
    "Password Reset OTP",
    `Your OTP is: ${otp}`,
    htmlTemplate
  );
  console.log(`OTP sent to: ${email}`);
  return otp;
};

// Function to verify OTP for password reset
const verifyOtp = async (email, otp) => {
  const record = await OtpModel.findOne({ email, otp });

  // Check if the OTP is valid and not expired
  if (record && record.expiresAt > new Date()) {
    // Delete the OTP record after it has been successfully used
    await OtpModel.deleteOne({ _id: record._id });
    return true; 
  }

  // Return false if OTP is invalid or expired
  return false;
};

// function to reset password
const resetPassword = async (email, newPassword) => {
  // Attempt to find and update the user
  const updatedUser = await User.findOneAndUpdate(
    { email: email }, 
    { password: newPassword }, 
    { new: true } 
  );

  if (!updatedUser) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `User with email "${email}" not found.`
    );
  }

  return {
    message: "Password reset successfully.",
    email: updatedUser.email,
    password: "****", // Mask the password for security reasons
  };
};

module.exports = {
  createUser,
  userLogin,
  getUser,
  loginWithGoogle,
  sendOtp,
  verifyOtp,
  resetPassword,
  findUserWithEmail,
};
