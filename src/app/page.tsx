"use client";
import React, { useState, useEffect } from "react";
import RoomHeader from "./components/roomHeader";
import Header from "./components/header";
import RoomColumn from "./components/roomColumn";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { talk } from "../interfaces/interfaces";
import { resolve } from "path";
import { redirect } from "next/dist/server/api-utils";

const TARENT_SYMBOL_SIZE: number = 200;

const MainDisplayPage = () => {
  const [dataState, setDataState] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<talk[]>([
    {
      title: "dummy",
      speaker: "dummy",
      langauge: "dummy",
      meetingLink: "dummy",
      startTime: "dummy",
      endTime: "dummy",
      description: "dummy",
      room: "townhall1",
      targetAudience: "dummy",
    },
  ]);

  console.log("beforeaxios");

  useEffect(() => {
    const response = axios
      .get("http://localhost:8000/techfridayAPI/getAllTalks")
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

  console.log("here is the raw list of data", meetingData);

  let townhall1talks: talk[] = [];
  let townall1othertalks: talk[] = [];
  let townhall2talks: talk[] = [];
  let blauerAffe: talk[] = [];
  let n8schicht: talk[] = [];
  let auzbiroom: talk[] = [];

  const setUpMeetingData = (meetingData: talk[]) => {
    townhall1talks = meetingData.filter((talk) => talk.room === "townhall1");
    townhall2talks = meetingData.filter((talk) => talk.room === "townhall2");
    blauerAffe = meetingData.filter((talk) => talk.room === "blauerAffe");
    n8schicht = meetingData.filter((talk) => talk.room === "n8schicht");
    auzbiroom = meetingData.filter((talk) => talk.room === "auzbiroom");
    console.log("azubi talks is ", auzbiroom);
  };

  setUpMeetingData(meetingData);

  if (dataState === true) {
    return (
      <main className="flex flex-col items-center min-h-screen w-full p-5">
        <Image
          src="/tarent.svg"
          alt="tarent"
          width={TARENT_SYMBOL_SIZE}
          height={TARENT_SYMBOL_SIZE}
          priority
        />
        <div className=" items-center w-full justify-between font-mono text-sm ">
          <Header />
          <RoomHeader />
        </div>
        <div className="flex flex-row w-full items-center justify-between font-mono text-sm gap-3">
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

        <Link
          href="/passPage"
          style={{
            width: "150px",
            border: "1px solid",
            backgroundColor: "grey",
            alignContent: "center",
          }}
        >
          Link to data entry
        </Link>
      </main>
    );
  }
};

export default MainDisplayPage;
