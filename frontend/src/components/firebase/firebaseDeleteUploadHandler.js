import React from "react";
import imageTempData from "../temp";
import { storage } from "../../config/firebaseConfig";

export const HandleDeleteImage = (onSuccess, onFail) => {
  if (imageTempData.uploadImage.name != null) {
    storage
      .ref("images")
      .child(imageTempData.uploadImage.name)
      .delete()
      .then(() => {
        console.log("Image deleted successfully");
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
        onFail(error);
      });
  }
};
export default HandleDeleteImage;
