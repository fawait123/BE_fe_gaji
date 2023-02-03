import axios from "axios";
import { notification } from "antd";
import Config from "./config";

const handleNotification = (type, title, text) => {
  notification[type]({
    message: title,
    description: text,
  });
};

const httpRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "http://172.20.10.2:8000/",
  // baseURL: "http://127.0.0.1:8000",
  baseURL: Config.baseURL,
});

httpRequest.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + window.localStorage.getItem("token");
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    // if (response?.config?.method === "post") {
    //   if (
    //     response?.config?.url !== "login" &&
    //     response?.config?.url !== "import-xls"
    //   ) {
    //     handleNotification("success", "Success", "Data successfully added");
    //   }
    // } else if (response?.config?.method === "put") {
    //   handleNotification("success", "Success", "Data successfully updated");
    // } else if (response?.config?.method === "delete") {
    //   handleNotification("success", "Success", "Data successfully deleted");
    // }
    return response;
  },
  (error) => {
    if (!error?.response) {
      handleNotification("error", "Error", "Something went wrong");
    }
    // if (error?.response?.data?.message) {
    //   handleNotification("error", "Error", error?.response?.data?.message);
    // }
    // if (error?.response?.status === 401) {
    //   handleNotification("error", "Error", error?.response?.data?.message);
    // }
    return Promise.reject(error);
  }
);

export default httpRequest;
