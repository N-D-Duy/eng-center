import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, ProgressBar } from "react-bootstrap";
import { storage } from "../../config/firebaseConfig";
import imageTempData from "../temp";


import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { userImageDefault } from "../../config/imageDefault";
export const FirebaseImageUpLoad = ({ onImageChange, onSetURL, onFail }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  //const [isUploading, setIsUploading] = useState(false);

  const handleUploadImage = (image) => {
    const randomName = Math.random().toString(36).substring(2, 15);
    console.log(randomName);
    imageTempData.uploadImage.name = randomName;
    const imgRef = ref(storage, `images/${randomName}`);
    uploadBytes(imgRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onSetURL(downloadURL);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      console.log(file);
      reader.onload = () => {
        setProfileImage(reader.result);
        onImageChange(file);
        setUploadProgress(0);
        handleUploadImage(file);
      };

      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setProfileImage(null);
    onImageChange(null);
  };

  return (
    <div className="row mb-3">
      <label
        htmlFor="profileImage"
        className="col-md-4 col-lg-3 col-form-label"
      >
        Profile Image
      </label>
      <div className="col-md-8 col-lg-9">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        ) : (
          <img src= { userImageDefault } alt="Profile" style={{ maxWidth: "200px", maxHeight: "200px" }}/> // Ảnh mặc định khi chưa có ảnh
        )}
        <div className="pt-2">
          <div
            className="btn btn-primary btn-sm"
            title="Upload new profile image"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <i className="bi bi-upload"></i>
          </div>
          {/* <div
            className="btn btn-danger btn-sm ms-2"
            title="Remove my profile image"
            onClick={handleRemoveImage}
          >
            <i className="bi bi-trash"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};
