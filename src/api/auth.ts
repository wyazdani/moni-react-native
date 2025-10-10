import apiRequest from ".";

const register = async (data: any) =>
  await apiRequest("POST", "auth/signup", data, true, true);

const login = async (data: any) =>
  await apiRequest("POST", "auth/login", data, true, true);

const forgotPassword = async (data: any) =>
  await apiRequest("POST", "auth/forgot-password", data, true, true);

const verifyOTP = async (data: any) =>
  await apiRequest("POST", "auth/verify-otp", data, true, true);

const resendOTP = async (data: any) =>
  await apiRequest("POST", "auth/resend-otp", data, true, true);

const createPassword = async (data: any) =>
  await apiRequest("POST", "auth/create-password", data, true, true);

const deleteAccountApi = async () => await apiRequest('DELETE', 'delete-account')

export {
  createPassword, deleteAccountApi, forgotPassword,
  login,
  register,
  resendOTP,
  verifyOTP
};

