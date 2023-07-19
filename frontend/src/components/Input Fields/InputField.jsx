import React from "react";
import { useState } from "react";
const InputField = (props) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <input
      type={props.type}
      className={props.classes}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
    ></input>
  );
};

export default InputField;
