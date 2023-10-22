"use client";
import React, { useState, useEffect, ReactComponentElement, DOMElement, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import RoomHeader from "./components/roomHeader";
import Header from "./components/header";
// import RoomColumn from "./components/roomColumn";
import TalkComponent from "./components/talkComponent";
import { talk } from "@/interfaces/interfaces";
import { rooms, BASIS_URL } from "@/constants";

const TARENT_SYMBOL_SIZE: number = 200;

const BUTTON_STYLE: string = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
const BUTTON_STYLE_TIGHT: string = "border-2 bg-blue-900 items-center text-white";
const TEXT_BOLD: string = "text-lg font-semibold";
const SMALL_BORDER: string = "border-2 border-black border-solid  mb-5";
const MEDIUM_BORDER: string = "border-4 border-black border-solid";
const GREETING_FORMAT: string =
  "bg-amber-700 col-span-4 flex flex-col justify-center items-center font-semibold text-white";
const PAUSE_FORMAT: string =
  "bg-red-600 col-span-4 flex flex-col justify-center items-center font-semibold text-white";

const TALK_COMPONENT_FORMAT: string = "bg-pink-300 w-full h-full flex justify-center items-center";

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

  let townhall1talks: talk[] = [];
  let raum123: talk[] = [];
  let n8schicht: talk[] = [];
  let blauerAffe: talk[] = [];

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

  townhall1talks = meetingData.filter((talk: talk) => talk.room === rooms[0]);
  blauerAffe = meetingData.filter((talk: talk) => talk.room === rooms[1]);
  n8schicht = meetingData.filter((talk: talk) => talk.room === rooms[2]);
  raum123 = meetingData.filter((talk: talk) => talk.room === rooms[3]);
  townhall1talks.sort(compareObjects);
  blauerAffe.sort(compareObjects);
  raum123.sort(compareObjects);

  const createDisplayComponent = (item: talk) => {
    return (
      <TalkComponent
        title={item.title}
        speakerName={item.speakerName}
        speakerId={item.speakerId}
        language={item.language}
        meetingLink={item.meetingLink}
        startTime={item.startTime}
        endTime={item.endTime}
        description={item.description.substring(0, 150)}
        targetAudience={item.targetAudience}
        room={item.room}
      />
    );
  };

  // this is not updating right

  const townhall1talksComp: ReactNode[] = townhall1talks.map((item) =>
    createDisplayComponent(item)
  );
  const blauerAffeComp: ReactNode[] = blauerAffe.map((item) => createDisplayComponent(item));
  const n8schichtComp: ReactNode[] = n8schicht.map((item) => createDisplayComponent(item));
  const raum123Comp: ReactNode[] = raum123.map((item) => createDisplayComponent(item));

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

        <div className="container grid grid-cols-4 grid-rows-layout w-full place-items-stretch justify-between gap-3">
          <div className={GREETING_FORMAT}>
            <div>Keynote und Begrüßung</div>
            <div>9:45 - 10:25</div>
          </div>
          <div className={PAUSE_FORMAT}>
            <div>5 Minuten Raumwechsel</div>
            <div>10:25 - 10:30</div>
          </div>

          <div className={TALK_COMPONENT_FORMAT}>{townhall1talksComp[0]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{raum123Comp[0]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{n8schichtComp[0]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{blauerAffeComp[0]}</div>
          <div className={PAUSE_FORMAT}>
            <div>15 Minute Kaffeepause</div>
            <div>11:30 - 11:45</div>
          </div>
          <div className={TALK_COMPONENT_FORMAT}>{townhall1talksComp[1]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{raum123Comp[1]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{n8schichtComp[1]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{blauerAffeComp[1]}</div>
          <div className={PAUSE_FORMAT}>
            <div>60 Minute Mittagspause</div>
            <div>12:30 - 13:30</div>
          </div>
          <div className={TALK_COMPONENT_FORMAT}>{townhall1talksComp[2]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{raum123Comp[2]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{n8schichtComp[2]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{blauerAffeComp[2]}</div>
          <div className={PAUSE_FORMAT}>
            <div>15 Minute Kaffeepause</div>
            <div>14:15 -14:30</div>
          </div>
          <div className={TALK_COMPONENT_FORMAT}>{townhall1talksComp[3]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{raum123Comp[3]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{n8schichtComp[3]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{blauerAffeComp[3]}</div>
          <div className={PAUSE_FORMAT}>
            <div>15 Minute Kaffeepause</div>
            <div>15:30 - 15:45</div>
          </div>
          <div className={TALK_COMPONENT_FORMAT}>{townhall1talksComp[4]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{raum123Comp[4]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{n8schichtComp[4]}</div>
          <div className={TALK_COMPONENT_FORMAT}>{blauerAffeComp[4]}</div>

          <div className={GREETING_FORMAT}>
            <div>Verabschiedung</div>
            <div>16:30 - 16:45</div>
          </div>
          <div className={PAUSE_FORMAT}>
            <div>Winterfest!</div>
            <div></div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />

        {/* <Link
          href="/passPage"
          className={BUTTON_STYLE}
        >
          Link to data entry
        </Link> */}
      </main>
    );
  }
};

export default MainDisplayPage;
