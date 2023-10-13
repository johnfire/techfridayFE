"use client";

import React, { useEffect } from "react";
import TalkComponent from "./talkComponent";
import { talk } from "@/interfaces/interfaces";

type Props = {
  list: talk[];
  dataState: boolean;
};

const RoomColumn = ({ list, dataState }: Props) => {
  useEffect(() => {}, [list, dataState]);

  return (
    <div className="flex flex-col bg-amber-400 rounded-md w-full p-1">
      {list.map((item: talk) => (
        <TalkComponent {...item} />
      ))}
    </div>
  );
};

export default RoomColumn;
