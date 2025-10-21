import apiRequest from ".";

const updateUserApi = async (data: any) =>
  await apiRequest("PUT", "users", data, true, false, true);

const deleteAccountApi = async () =>
  await apiRequest("DELETE", "users/delete-account");

export { deleteAccountApi, updateUserApi };

