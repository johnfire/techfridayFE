import React from "react";
import { speaker, talk } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { targetAudiences, STAR_SIZE, TEXT_BOLD, BUTTON_STYLE_TIGHT, BASIS_URL } from "@/constants";
import axios from "axios";

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
  // if (targetAudience === targetAudiences[0])
  //   talkSymbol = (
  //     // <Image
  //     //   src="/star-green.svg"
  //     //   alt="green"
  //     //   width={STAR_SIZE}
  //     //   height={STAR_SIZE}
  //     //   priority
  //     // />
  //   );

  // if (targetAudience === targetAudiences[1])
  //   talkSymbol = (
  //     // <Image
  //     //   src="/star-yellow.svg"
  //     //   alt="yellow"
  //     //   width={STAR_SIZE}
  //     //   height={STAR_SIZE}
  //     //   priority
  //     // />
  //   );

  // if (targetAudience === targetAudiences[2])
  //   talkSymbol = (
  //     // <Image
  //     //   src="/star-red.svg"
  //     //   alt="red"
  //     //   width={STAR_SIZE}
  //     //   height={STAR_SIZE}
  //     //   priority
  //     // />
  //   );

  // const workingLink = `https://${meetingLink}`; // link to video meeting. not on our site
  const workingLink = `go here `; // link to video meeting. not on our site

  const handleSpeakerButtonPress = () => {
    const payload = {
      params: {
        id: speakerId,
      },
    };

    axios
      .get(`https://techfriday.tandkcybernetics.net/techfridayAPI/getOneSpeaker`, payload)
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
        <div> Title: {title}</div>
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
          <Link href={workingLink}>{meetingLink}</Link>
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
