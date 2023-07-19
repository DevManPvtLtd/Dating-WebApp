import React from "react";

const CustomButton = (props) => {
  return (
    <div className={props.BodyClass} onClick={props.onclick}>
      <span className={props.TextClass} style={props.styles}>
        {props.text}
      </span>
    </div>
  );
};

export default CustomButton;
