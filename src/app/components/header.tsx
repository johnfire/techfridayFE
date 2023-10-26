import React from "react";
import Image from "next/image";

import { STAR_SIZE, TECH_FRIDAY_GRAPHIC_SIZE } from "@/constants";

const Header = () => {
  return (
    <div className=" flex flex-col lg:flex-row  justify-between bg-amber-100 m-3 rounded-md border-2 border-blue-900">
      <div className=" flex flex-col justify-between  ">
        <br />
        <div className="text-2xl font-extrabold ">
          <p>Tech Friday!</p>
          <p>Programm 2023</p>
        </div>

        <div className="flex flex-col ">
          <p> Legende:</p>
          <br />
          <div className="flex flex-row  items-center">
            <Image
              src="/star-green.svg"
              alt="green"
              width={STAR_SIZE}
              height={STAR_SIZE}
              priority
            />
            <p>Für Nicht-Devs verstandlich</p>
          </div>
          <div className="flex flex-row  items-center">
            <Image
              src="/star-yellow.svg"
              alt="yellow"
              width={STAR_SIZE}
              height={STAR_SIZE}
              priority
            />
            <p>Für Tech und Dev-Interesse verstandlich</p>
          </div>
          <div className="flex flex-row  items-center">
            <Image
              src="/star-red.svg"
              alt="red"
              width={STAR_SIZE}
              height={STAR_SIZE}
              priority
            />
            <p>Für Softwareentwicker</p>
          </div>
        </div>
      </div>

      <Image
        src="/tech-friday-logo.svg"
        alt="Vercel Logo"
        width={TECH_FRIDAY_GRAPHIC_SIZE}
        height={TECH_FRIDAY_GRAPHIC_SIZE}
        priority
      />
    </div>
  );
};

export default Header;
