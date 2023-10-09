"use client";
import React, { useEffect } from "react";
import TalkComponent from "./talkComponent";
import { talk } from "@/interfaces/interfaces";

type Props = {
  list: talk[];
  dataState: boolean;
};

const RoomColumn = ({ list, dataState }: Props) => {
  console.log("!!!!!!!!!!!!!!!!!do we get anything at all here???? ", list, dataState);
  useEffect(() => {
    console.log("!!!!!!!! data is ", list, dataState);
  }, [list, dataState]);

  return (
    <div
      className="flex flex-col bg-stone-400 rounded-md w-full"
      style={{
        padding: "4px",
      }}
    >
      <p> here is the list of talks for this room</p>
      {list.map((item: talk) => (
        <TalkComponent {...item} />
      ))}
    </div>
  );
};

export default RoomColumn;
