const forgotPasswordTemplate = ({ name, otp }) => {
  return `
        <h1>Hi ${name},</h1>
        <p>Here is your OTP for resetting your password: <b style="background:yellow; font-size:20px; padding:20px; text-align:center; font-weight:800">${otp}</b></p>
        <p>Regards,</p>
        <p>Team BookMyShow</p>
    `;
};
export default forgotPasswordTemplate;
