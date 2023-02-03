import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Notification() {
  toast("Wow so easy!");

  return (
    <>
      <ToastContainer />
    </>
  );
}
