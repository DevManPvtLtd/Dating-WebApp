import React from "react";

const ReviewCard = (props) => {
  return (
    <>
      <div className="reviewCard-Container">
        <div className="reviewCard-plack">
          <img
            src={props.image}
            alt={props.alt}
            className="reviewCard-image rounded-circle"
          />
          <span className="reviewCard-name">{props.name}</span>
        </div>
        <hr className="reviewCard-hr" />
        <div className="reviewCard-text">{props.review}</div>
      </div>
    </>
  );
};

export default ReviewCard;
