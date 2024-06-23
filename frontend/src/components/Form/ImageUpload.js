import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Vui lòng chọn một ảnh trước khi upload!");
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedFilePath(response.data.filePath);
      setSelectedFile(null);
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete`, {
        data: { filePath: uploadedFilePath },
      });
      setUploadedFilePath(null);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file', error);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        id="fileInput" 
      />
      <button onClick={() => document.getElementById('fileInput').click()}>Chọn ảnh</button>
      {selectedFile && (
        <div>
          <p>Tên file: {selectedFile.name}</p>
          <button onClick={handleFileRemove}>Xóa</button>
        </div>
      )}
      <button onClick={handleUpload}>Upload</button>
      {uploadedFilePath && (
        <div>
          <p>Đã tải lên: {uploadedFilePath}</p>
          <button onClick={handleDelete}>Xóa ảnh đã tải lên</button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
