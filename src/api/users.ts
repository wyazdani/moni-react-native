import apiRequest from ".";

const updateUserApi = async (data: any) =>
  await apiRequest("PUT", "users", data, true, false, true);

const changePasswordApi = async (data: any) =>
  await apiRequest("POST", "users/change-password", data);

const deleteAccountApi = async () =>
  await apiRequest("DELETE", "users/delete-account");

export { changePasswordApi, deleteAccountApi, updateUserApi };
