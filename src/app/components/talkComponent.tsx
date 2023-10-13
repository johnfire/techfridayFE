import React from "react";
import { speaker, talk } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { targetAudiences, STAR_SIZE, TEXT_BOLD, BUTTON_STYLE_TIGHT } from "@/constants";
import axios from "axios";

const TalkComponent = ({
  startTime,
  endTime,
  title,
  speakerName,
  speakerId,
  description,
  targetAudience,
  meetingLink,
  language,
  room,
}: talk) => {
  let talkSymbol: any = null;
  if (targetAudience === targetAudiences[0])
    talkSymbol = (
      <Image
        src="/star-green.svg"
        alt="green"
        width={STAR_SIZE}
        height={STAR_SIZE}
        priority
      />
    );

  if (targetAudience === targetAudiences[1])
    talkSymbol = (
      <Image
        src="/star-yellow.svg"
        alt="yellow"
        width={STAR_SIZE}
        height={STAR_SIZE}
        priority
      />
    );

  if (targetAudience === targetAudiences[2])
    talkSymbol = (
      <Image
        src="/star-red.svg"
        alt="red"
        width={STAR_SIZE}
        height={STAR_SIZE}
        priority
      />
    );

  const workingLink = `https://${meetingLink}`;

  const handleSpeakerButtonPress = () => {
    const payload = {
      params: {
        id: speakerId,
      },
    };

    axios
      .get("http://localhost:8000/techfridayAPI/getOneSpeaker", payload)
      .then((response: any) => {
        const displayData: any = `${response.data.speaker} <br/>${response.data.email} <br/>${response.data.bio}`;
        Swal.fire({
          title: "Speaker Information",
          html: displayData,
          confirmButtonText: "Danke",
        });
      })
      .catch((error: any) => {});
  };
  return (
    <div
      className="bg-white rounded-md "
      style={{
        marginBottom: "4px",
        padding: "5px",
      }}
    >
      <div className="flex flex-col justify-between ">
        <div className={TEXT_BOLD}> Title: {title}</div>
        <div>
          <button onClick={handleSpeakerButtonPress}> Speaker: &nbsp;&nbsp; {speakerName}</button>
        </div>
        <hr />
        <div className="flex flex-row justify-between ">
          <p> Start:&nbsp; {startTime}</p>
          <p> End:&nbsp; {endTime}</p>
        </div>
        <hr />
        <div>Description:</div>
        <div>{description}</div>
        <hr />
        <div>
          <Link
            href={workingLink}
            className={BUTTON_STYLE_TIGHT}
          >
            {meetingLink}
          </Link>
        </div>
        <hr />
        <div className="flex flex-row justify-between ">
          {talkSymbol}
          <div>{language}</div>
          <div> {room}</div>
        </div>
      </div>
    </div>
  );
};

export default TalkComponent;
