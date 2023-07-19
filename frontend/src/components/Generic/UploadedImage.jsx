import React from "react";

const UploadedImage = (props) => {
  return (
    <div>
      <img
        src={props.image}
        alt={props.alt}
        className="Uploaded-image img-responsive"
      />
    </div>
  );
};

export default UploadedImage;
