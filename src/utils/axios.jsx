import { notification } from "antd";
import axios from "axios";
import { CallSilent, CloseSquare, TickSquare } from "react-iconly";
import Config from "./config";

const httpRequest = axios.create({
  baseURL: Config.baseURL,
});

httpRequest.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "Bearer " + window.localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    if (response?.config?.method !== "get") {
      notification.success({
        message: "Success",
        description: response.data.message,
        icon: <TickSquare set="curved" className="remix-icon" />,
      });
    }
    return response;
    // if (response?.config?.method === "post") {
    //   if (
    //     response?.config?.url !== "login" &&
    //     response?.config?.url !== "import-xls"
    //   ) {
    //     notification.success({
    //       message: "Success",
    //       description: response.data.message,
    //       icon: <TickSquare set="curved" className="remix-icon" />,
    //     });
    //   }
    // } else if (response?.config?.method === "put") {
    //   notification.success({
    //     message: "Success",
    //     description: response.data.message,
    //     icon: <TickSquare set="curved" className="remix-icon" />,
    //   });
    // } else if (response?.config?.method === "delete") {
    //   notification.success({
    //     message: "Success",
    //     description: response.data.message,
    //     icon: <TickSquare set="curved" className="remix-icon" />,
    //   });
    // } else if (response?.config?.method !== "get") {
    //   notification.success({
    //     message: "Success",
    //     description: response.data.message,
    //     icon: <TickSquare set="curved" className="remix-icon" />,
    //   });
    // }
    // return response;
  },
  (error) => {
    if (typeof error.response === "undefined") {
      notification.error({
        message: "Network Error",
        description:
          "Something is temporarily wrong with your network connection. Please make sure your network connection",
        icon: <CallSilent set="curved" className="remix-icon" />,
      });
    }
    if (error?.response?.data?.message) {
      notification.error({
        message: "Failed",
        description: error?.response?.data?.message,
        icon: <CloseSquare set="curved" className="remix-icon" />,
      });
    }
    if (error?.response?.status === 401) {
      notification.error({
        message: "Failed",
        description: error?.response?.data?.message,
        icon: <CloseSquare set="curved" className="remix-icon" />,
      });
      window.localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
