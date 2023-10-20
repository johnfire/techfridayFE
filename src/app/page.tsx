"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import RoomHeader from "./components/roomHeader";
import Header from "./components/header";
import RoomColumn from "./components/roomColumn";
import TalkComponent from "./components/talkComponent";
import { talk } from "@/interfaces/interfaces";
import { rooms, BASIS_URL } from "@/constants";

const TARENT_SYMBOL_SIZE: number = 200;

const BUTTON_STYLE = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
const BUTTON_STYLE_TIGHT = "border-2 bg-blue-900 items-center text-white";
const TEXT_BOLD = "text-lg font-semibold";
const SMALL_BORDER = "border-2 border-black border-solid  mb-5";
const MEDIUM_BORDER = "border-4 border-black border-solid";

// trying to find the problem here ..

function compareObjects(a: talk, b: talk) {
  if (a.startTime < b.startTime) {
    return -1;
  }
  if (a.startTime > b.startTime) {
    return 1;
  }
  return 0;
}

const MainDisplayPage = () => {
  const [dataState, setDataState] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<talk[]>([
    {
      title: "dummy",
      speakerName: "dummy",
      speakerId: 1,
      language: "dummy",
      meetingLink: "dummy",
      startTime: "dummy",
      endTime: "dummy",
      description: "dummy",
      room: "townhall1",
      targetAudience: "dummy",
    },
  ]);

  // console.log("here is the url stuff", `${BASIS_URL}/techfridayAPI/getAllTalks/`);
  let townhall1talks: talk[] = [];
  let townhall2talks: talk[] = [];
  let blauerAffe: talk[] = [];
  let n8schicht: talk[] = [];
  let auzbiroom: talk[] = [];

  useEffect(() => {
    axios
      .get(`${BASIS_URL}/techfridayAPI/getAllTalks/`)
      .then((response) => {
        console.log("here is the response", response);
        let meetingData: talk[] = [];
        for (let i = 0; i < response.data.length; i++) {
          meetingData.push(response.data[i]);
        }
        setMeetingData(meetingData);
        setDataState(true);
      })
      .catch((error) => {});
  }, []);

  if (dataState === false) return "loading";

  // townhall1talks = meetingData.filter((talk) => talk.room === rooms[0]);
  // townhall2talks = meetingData.filter((talk) => talk.room === rooms[1]);
  // blauerAffe = meetingData.filter((talk) => talk.room === rooms[2]);
  // n8schicht = meetingData.filter((talk) => talk.room === rooms[3]);
  // auzbiroom = meetingData.filter((talk) => talk.room === rooms[4]);
  // townhall1talks.sort(compareObjects);
  // townhall2talks.sort(compareObjects);
  // blauerAffe.sort(compareObjects);
  // n8schicht.sort(compareObjects);
  // auzbiroom.sort(compareObjects);

  // console.log("here is right before the render");

  // const setUpMeetingData = (meetingData: talk[]) => {
  townhall1talks = meetingData.filter((talk) => talk.room === rooms[0]);
  townhall2talks = meetingData.filter((talk) => talk.room === rooms[1]);
  blauerAffe = meetingData.filter((talk) => talk.room === rooms[2]);
  n8schicht = meetingData.filter((talk) => talk.room === rooms[3]);
  auzbiroom = meetingData.filter((talk) => talk.room === rooms[4]);
  townhall1talks.sort(compareObjects);
  townhall2talks.sort(compareObjects);
  blauerAffe.sort(compareObjects);
  n8schicht.sort(compareObjects);
  auzbiroom.sort(compareObjects);
  // };

  // setUpMeetingData(meetingData);

  if (dataState === true) {
    return (
      <main className="flex flex-col items-center min-h-screen w-full p-5">
        <div className="flex flex-row items-center justify-between w-full p-5">
          <Image
            src="/Qvest-digital-mockup.svg"
            alt="tarent"
            width={TARENT_SYMBOL_SIZE}
            height={TARENT_SYMBOL_SIZE}
            priority
          />

          <Link
            href="/attendeeRegistrationPage"
            className={BUTTON_STYLE}
          >
            Link to Attendee Registration
          </Link>
        </div>

        <div className=" items-center w-full justify-between font-mono text-sm ">
          <Header />
          <RoomHeader />
        </div>

        <div className="container w-full m-auto grid grid-cols-4 grid-rows-layout place-items-stretch justify-between gap-3">
          <div className="bg-amber-600 col-span-4 flex justify-center items-center">
            Keynote und Begrüßung
            <div>9:45 - 10:25</div>
          </div>
          <div className="bg-red-500 col-span-4 flex justify-center items-center">
            {" "}
            5 minuten RaumWechsel
          </div>

          <div className="bg-pink-300 w-full h-full flex justify-center items-center">
            <TalkComponent
              title={townhall1talks[0].title}
              speakerName={townhall1talks[0].speakerName}
              speakerId={townhall1talks[0].speakerId}
              language={townhall1talks[0].language}
              meetingLink={townhall1talks[0].meetingLink}
              startTime={townhall1talks[0].startTime}
              endTime={townhall1talks[0].endTime}
              description={townhall1talks[0].description}
              targetAudience={townhall1talks[0].targetAudience}
              room={townhall1talks[0].room}
            />
          </div>
          <div className="bg-blue-300 w-full h-full flex justify-center items-center">3</div>
          <div className="bg-blue-300 w-full h-full flex justify-center items-center">3</div>
          <div className="bg-pink-300 w-full h-full flex justify-center items-center">4</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-blue-3008 w-full h-full">7</div>
          <div className="bg-pink-300 w-full h-full">8</div>
          <div className="bg-blue-300 w-full h-full">9</div>
          <div className="bg-pink-300 w-full h-full">10</div>
          <div className="bg-red-500 col-8span-4 ">pause</div>
          <div className="bg-pink-300 w-full h-full">2</div>
          <div className="bg-blue-300 w-full h-full">3</div>
          <div className="bg-pink-300 w-full h-full">4</div>
          <div className="bg-blue-300 w-full h-full">5</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-blue-300 w-full h-full">7</div>
          <div className="bg-pink-300 w-full h-full">8</div>
          <div className="bg-blue-300 w-full h-full">9</div>
          <div className="bg-pink-300 w-full h-full">10</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-pink-300 w-full h-full">2</div>
          <div className="bg-blue-300 w-full h-full">3</div>
          <div className="bg-pink-300 w-full h-full">4</div>
          <div className="bg-blue-300 w-full h-full">5</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-blue-300 w-full h-full">7</div>
          <div className="bg-pink-300 w-full h-full">8</div>
          <div className="bg-blue-300 w-full h-full">9</div>
          <div className="bg-pink-300 w-full h-full">10</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-pink-300 w-full h-full">2</div>
          <div className="bg-blue-300 w-full h-full">3</div>
          <div className="bg-pink-300 w-full h-full">4</div>
          <div className="bg-blue-300 w-full h-full">5</div>
          <div className="bg-red-500 col-span-4 ">pause</div>
          <div className="bg-blue-300 w-full h-full">7</div>
          <div className="bg-pink-300 w-full h-full">8</div>
          <div className="bg-blue-300 w-full h-full">9</div>
          <div className="bg-pink-300 w-full h-full">10</div>
          <div className="bg-red-500 col-span-4 ">winterfeier</div>
        </div>
        {/* <div className="flex flex-row w-full items-start justify-between font-mono text-sm gap-2">
          <RoomColumn
            list={townhall1talks}
            dataState={dataState}
          />
          <RoomColumn
            list={townhall2talks}
            dataState={dataState}
          />
          <RoomColumn
            list={blauerAffe}
            dataState={dataState}
          />
          <RoomColumn
            list={n8schicht}
            dataState={dataState}
          />
          <RoomColumn
            list={auzbiroom}
            dataState={dataState}
          />
        </div> */}
        <br />
        <br />
        <br />
        <br />

        <Link
          href="/passPage"
          className={BUTTON_STYLE}
        >
          Link to data entry
        </Link>
      </main>
    );
  }
};

export default MainDisplayPage;
