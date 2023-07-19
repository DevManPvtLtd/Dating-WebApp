import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

const DropDown = (props) => {
  const [option, setOption] = useState("Select an option");
  const { items } = props;
  const handleItemClick = (e, item) => {
    e.preventDefault();
    setOption(item);
  };

  return (
    <Dropdown className="DropDown-container">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="DropDown-toggle"
      >
        {option}
      </Dropdown.Toggle>

      <Dropdown.Menu className="DropDown-menu">
        {items.map((item, index) => (
          <Dropdown.Item key={index} onClick={(e) => handleItemClick(e, item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
