import React from "react";
import { speaker, talk } from "@/interfaces/interfaces";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { targetAudiences, STAR_SIZE, BASIS_URL } from "@/constants";
import axios from "axios";

const BUTTON_STYLE = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
const BUTTON_STYLE_TIGHT = "border-2 bg-blue-900 items-center text-white w-full";
const TEXT_BOLD = " w-full h-8 text-lg font-semibold";
const SMALL_BORDER = "border-2 border-black border-solid  mb-5";
const MEDIUM_BORDER = "border-4 border-black border-solid";

const TalkComponent = ({
  startTime,
  endTime,
  title,
  speakerName,
  speakerId,
  description,
  targetAudience,
  meetingLink, // link to video meeting. not on our site
  language,
  room,
}: talk) => {
  let talkSymbol: any = "*";
  // let displayTitle: string = title || "";

  const spacesNeeded: number = 140 - title.length;

  function spaces(x: number) {
    var res = "";
    while (x--) res += " ";
    return res;
  }

  // const displayTitle = title + " ".repeat(spacesNeeded);

  function addSpace(displayTitle: string, maxLength: number) {
    return displayTitle.length >= maxLength
      ? displayTitle
      : displayTitle + " ".repeat(maxLength - displayTitle.length);
  }

  const displayTitle = addSpace(title, 140);

  console.log("length is ", displayTitle.length);

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

  const workingLink = `https://${meetingLink}`; // link to video meeting. not on our site
  // const workingLink = `go here `; // link to video meeting. not on our site

  const handleSpeakerButtonPress = () => {
    const payload = {
      params: {
        id: speakerId,
      },
    };

    axios
      .get(`${BASIS_URL}/techfridayAPI/getOneSpeaker/`, payload)
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
      className="bg-white rounded-md w-11/12 h-11/12 flex justify-center items-center"
      style={{
        marginBottom: "4px",
        padding: "5px",
      }}
    >
      <div className="flex flex-col justify-between ">
        <div className={TEXT_BOLD}> {displayTitle}</div>
        <div>
          <button
            onClick={handleSpeakerButtonPress}
            className={BUTTON_STYLE_TIGHT}
          >
            {" "}
            Speaker: &nbsp;&nbsp; {speakerName}
          </button>
        </div>
        <hr />
        <div className="flex flex-row justify-between ">
          <p> Start:&nbsp; {startTime}</p>
          <p> End:&nbsp; {endTime}</p>
        </div>
        <hr />
        <div className=" bg-white flex flex-row justify-between ">
          {talkSymbol}
          <div>{language}</div>
          {/* <div> {room}</div> */}
        </div>
        <hr />
        <div>Description:</div>
        <div>{description}</div>
        <hr />
        {meetingLink && (
          <div className={BUTTON_STYLE_TIGHT}>
            <a href={workingLink}>{meetingLink}</a>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default TalkComponent;
