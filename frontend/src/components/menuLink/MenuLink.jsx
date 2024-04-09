import React from "react";
import "./menuLink.scss";


const MenuLink = ({onClick ,Icon, text }) => {
  return (
    <div onClick={onClick} className="menuLink">
      {Icon}
      <span className="menuLinkText">{text}</span>
    </div>
  );
};

export default MenuLink;
