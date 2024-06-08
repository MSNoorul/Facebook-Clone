import React from "react";
import "./menuLink.scss";


const MenuLink = ({onClick ,Icon, text,className }) => {
  return (
    <div onClick={onClick} className={`menuLink ${className}`}>
      {Icon}
      <span className="menuLinkText">{text}</span>
    </div>
  );
};

export default MenuLink;
