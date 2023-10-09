"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { start } from "repl";

// import TimePicker from "react-time-picker";

const DataEntryPage = () => {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [langauge, setLanguage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const handleChangeTitle = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(event.target.value);
  };

  const handleChangeSpeaker = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeaker(event.target.value);
  };

  const handleChangeLangauge = (event: { target: { value: React.SetStateAction<string> } }) => {
    setLanguage(event.target.value);
  };

  const handleMeetingLink = (event: { target: { value: React.SetStateAction<string> } }) => {
    setMeetingLink(event.target.value);
  };

  const handleChangeStartTime = (event: any) => {
    setStartTime(event.target.value);
  };

  const handleChangeEndTime = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEndTime(event.target.value);
  };

  const handleChangeDescrption = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDescription(event.target.value);
  };

  const handleChangeTargetAudience = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTargetAudience(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    console.log("need to save to db");
    axios
      .post("http://localhost:8000/techfridayAPI/saveOneTalk/", {
        data: {
          Title: title,
          Speaker: speaker,
          Language: langauge,
          MeetingLink: meetingLink,
          StartTime: startTime,
          EndTime: endTime,
          Description: description,
          TargetAudience: targetAudience,
        },
        config,
      })
      .then(function (response) {
        console.log("here is what we got", response);

        if (response.status === 201) {
          console.log("pinged API successfully");
          //push("/");
        }
        if (response.status !== 201) {
          console.log("something failed");
          //push("/");
        }
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  return (
    <main className="flex flex-col min-h-screen  w-full justify-between gap-5">
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-col items-center w-full justify-between font-mono text-sm bg-slate-100">
          <br />

          <p>Enter talk data here:</p>
          <br />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            <label>
              Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChangeTitle}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Speaker:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={speaker}
                onChange={handleChangeSpeaker}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Language:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Language"
                value={langauge}
                onChange={handleChangeLangauge}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Live Meeting link:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Language"
                value={meetingLink}
                onChange={handleMeetingLink}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />

            <label>
              Start Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="speaker"
                onChange={handleChangeStartTime}
                value={startTime}
                style={{ border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              End Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="time"
                value={endTime}
                onChange={handleChangeEndTime}
                style={{ border: "1px solid" }}
              />
            </label>
            <br />

            <label>
              Description:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleChangeDescrption}
                style={{ width: "370px", height: "400px", border: "1px solid" }}
              />
            </label>
            <br />

            <label>
              Target Audience:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="targetAudience"
                value={targetAudience}
                onChange={handleChangeTargetAudience}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <br />

            <input
              type="submit"
              value="Submit"
              style={{ border: "1px solid", backgroundColor: "grey" }}
            />

            <br />
            <br />
          </form>
          <br />
          <br />
        </div>
        <div className="flex flex-col items-center w-full justify-between font-mono text-sm bg-slate-200">
          <br />
          <p> other entry here</p>
          <br />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link
          href="/"
          className="items-center"
          style={{ width: "250px", border: "1px solid", backgroundColor: "grey" }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;go
          back here!
        </Link>
        <br />
        <br />
      </div>
    </main>
  );
};

export default DataEntryPage;
