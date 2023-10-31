import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between w-full">
      <p>© 2023 Qvest Digital AG. All rights reserved</p>
      <div className="flex flex-row justify-end w-full">
        <a href="https://www.tarent.de/presse">presse </a>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <a href="https://www.tarent.de/impressum">impressum</a>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <a href="https://www.tarent.de/datenschutz">datenschutz</a>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
  );
};

export default Footer;
