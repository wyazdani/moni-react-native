import { BASE_URL } from "@/constants";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { removeUserData } from "../redux/slices/authSlice";
import { store } from "../redux/store";

type METHOD_TYPES = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const errorHandler = (
  error: any,
  showErrors: boolean,
  disableRedirection?: boolean
) => {
  console.log("error: ", JSON.stringify(error?.response, null, 2));
  if (error?.name != "CanceledError" && showErrors)
    Toast.show(
      error?.response?.data?.message || "Something Went Wrong!",
      Toast.SHORT
    );
  if (!disableRedirection && error?.response?.status == 401) {
    // navigationRef.dispatch(CommonActions.reset({
    //     index: 0,
    //     routes: [
    //         {
    //             name: 'RegisterOption',
    //         }
    //     ],
    // }))
    store.dispatch(removeUserData());
  }
};

const apiRequest = async (
  method: METHOD_TYPES,
  endpoint: string,
  data?: object,
  showErrors: boolean = true,
  disableRedirection?: boolean,
  isMultipart?: boolean,
  controller?: AbortController
) => {
  try {
    const headers: any = {
      accept: "application/json",
      "content-type": "application/json",
    };
    if (isMultipart) headers["content-type"] = "multipart/form-data";
    const token = store.getState()?.auth?.user?.token;
    if (token) headers.authorization = `Bearer ${token}`;
    console.log("endpoint: ", `${BASE_URL}${endpoint}`);
    return await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers,
      signal: controller?.signal,
    });
  } catch (error) {
    errorHandler(error, showErrors, disableRedirection);
  }
};

export default apiRequest;
