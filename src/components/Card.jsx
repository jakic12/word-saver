import React from "react";

import "../styles/card.scss";

const Card = ({ children, onClick, className }) => {
  return (
    <div
      className={`card${onClick ? ` clickable` : ``}${
        className ? ` ` + className : ``
      }`}
      {...(onClick ? { onClick } : {})}
    >
      {children}
    </div>
  );
};

export default Card;
