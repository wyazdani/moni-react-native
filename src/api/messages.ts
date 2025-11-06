import apiRequest from ".";

const getMessagesApi = async () => await apiRequest("GET", "messages");

export { getMessagesApi };
