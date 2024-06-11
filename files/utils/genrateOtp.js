  //otp generated frunction
export function generateOTP() {
    // Define the length of the OTP
    const otpLength = 6;
  
    // Generate a random 6-digit number
    const otp = Math.floor(Math.random() * Math.pow(10, otpLength));
  
    // Ensure the OTP is exactly 6 digits by padding with zeros if necessary
    const formattedOTP = otp.toString().padStart(otpLength, "0");
  
    return formattedOTP;
  }