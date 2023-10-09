import React from "react";
import { talk } from "@/interfaces/interfaces";

const TalkComponent = ({
  startTime,
  endTime,
  title,
  speaker,
  description,
  targetAudience,
  room,
}: talk) => {
  return (
    <div
      className="bg-stone-200 rounded-md "
      style={{
        marginBottom: "4px",
        padding: "5px",
      }}
    >
      <div>
        <p>{startTime}</p>
        <p>{title}</p>
        <p>{speaker}</p>
        <p>{description}</p>
        <p>{targetAudience}</p>
        <p>room</p>
      </div>
    </div>
  );
};

export default TalkComponent;
