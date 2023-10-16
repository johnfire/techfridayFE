"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import RoomHeader from "./components/roomHeader";
import Header from "./components/header";
import RoomColumn from "./components/roomColumn";
import { talk } from "@/interfaces/interfaces";
import { rooms, BUTTON_STYLE, BASIS_URL } from "@/constants";

const TARENT_SYMBOL_SIZE: number = 200;

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

  useEffect(() => {
    axios
      .get(`${BASIS_URL}/techfridayAPI/getAllTalks`)
      .then((response) => {
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

  let townhall1talks: talk[] = [];
  let townhall2talks: talk[] = [];
  let blauerAffe: talk[] = [];
  let n8schicht: talk[] = [];
  let auzbiroom: talk[] = [];

  const setUpMeetingData = (meetingData: talk[]) => {
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
  };

  setUpMeetingData(meetingData);

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
        <div className="flex flex-row w-full items-start justify-between font-mono text-sm gap-2">
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
