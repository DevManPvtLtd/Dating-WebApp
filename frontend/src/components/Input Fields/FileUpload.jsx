import React from "react";
import plus from "../../assets/plus.png";
const FileUpload = () => {
  return (
    <div>
      <label className="FileUpload-container" for="upload-button">
        <img src={plus} alt="image" className="FileUpload-icon" />
        <input type="file" id="upload-button" hidden />
      </label>
    </div>
  );
};

export default FileUpload;
