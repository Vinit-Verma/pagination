import React from "react";

const Card = ({ item }) => {
  return (
    <div className="card-wrapper">
      <div className="img-div">
        <img src={item.image} alt="dbz" />
      </div>
      <div className="content-div">
        <span>{item.name}</span>
      </div>
    </div>
  );
};

export default Card;
