"use client";

import React, { useEffect, useState, MouseEvent, MouseEventHandler } from "react";
import Link from "next/link";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import { talk, speaker } from "@/interfaces/interfaces";
// does not work in production for tailwind
import { rooms, languages, targetAudiences, BASIS_URL } from "@/constants";

const BUTTON_STYLE = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
const BUTTON_STYLE_TIGHT = "border-2 bg-blue-900 items-center text-white w-full";
const TEXT_BOLD = "text-lg font-semibold";
const SMALL_BORDER = "border-2 border-black border-solid  mb-5";
const MEDIUM_BORDER = "border-4 border-black border-solid";

const DataEntryPage = () => {
  const [title, setTitle] = useState<string>("");
  const [speaker, setSpeaker] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("11:00");
  const [description, setDescription] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const [meetingData, setMeetingData] = useState<talk[] | null>();
  const [speakerData, setSpeakerData] = useState<speaker[] | null>();

  const [haveMeetingData, setHaveMeetingData] = useState<boolean>(false);
  const [haveSpeakerData, setHaveSpeakerData] = useState<boolean>(false);

  const [editMeeting, setEditMeetings] = useState<boolean>(false);
  const [editSpeaker, setEditSpeaker] = useState<boolean>(false);

  const [speakerId, setSpeakerId] = useState<number>();
  const [speakerName, setSpeakerName] = useState<string>("");
  const [speakerBio, setSpeakerBio] = useState<string>("");
  const [speakerEmail, setSpeakerEmail] = useState<string>("");
  const [speakerLinkedin, setSpeakerLinkedin] = useState<string>("");
  const [speakerMobil, setSpeakerMobil] = useState<string>("");
  const [speakerTalks, setSpeakerTalks] = useState<any>("");

  const [speakerChoices, setSpeakerChoices] = useState<string[]>([""]);

  useEffect(() => {
    axios
      .get(`${BASIS_URL}/techfridayAPI/getAllTalks`)
      .then((response) => {
        let meetingData: talk[] = [];
        for (let i = 0; i < response.data.length; i++) {
          meetingData.push(response.data[i]);
        }
        setMeetingData(meetingData);
        setHaveMeetingData(true);
      })
      .catch((error) => {});
    axios
      .get(`${BASIS_URL}/techfridayAPI/getAllSpeakers`)
      .then((response1) => {
        console.log("here is the response we got ", response1);
        let speakerData: speaker[] = [];
        for (let i = 0; i < response1.data.length; i++) {
          speakerData.push(response1.data[i]);
        }
        setSpeakerData(speakerData);
        setHaveSpeakerData(true);
        const speakerNames = speakerData.map((speaker) => speaker.speaker);
        setSpeakerChoices(speakerNames);
      })
      .catch((error) => {});
  }, []);

  const handleChangeTitle = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTitle(event.target.value);
  };

  const handleChangeSpeaker = (event: any) => {
    setSpeaker(event.value);
  };

  const handleChangeLangauge = (event: any) => {
    setLanguage(event.value);
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

  const handleChangeTargetAudience = (event: any) => {
    setTargetAudience(event.value);
  };

  const handleChangeRoom = (event: any) => {
    console.log(event.value);
    setRoom(event.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const payload = {
      Title: title,
      Speaker: speaker,
      Language: language,
      MeetingLink: meetingLink,
      StartTime: startTime,
      EndTime: endTime,
      Description: description,
      TargetAudience: targetAudience,
      Room: room,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/saveOneTalk/`, payload)
      .then(function (response) {
        if (response.status === 201) {
          console.log("pinged API successfully");
        }
        if (response.status !== 201) {
          console.log("something failed");
        }
        setTitle("");
        setSpeaker("");
        setLanguage("");
        setMeetingLink("");
        setStartTime("");
        setEndTime("");
        setDescription("");
        setTargetAudience("");
        setRoom("");
        window.location.reload();
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleEditMeeting = (event: any) => {
    event.preventDefault();

    const payload = {
      Title: title,
      Speaker: speaker,
      Language: language,
      MeetingLink: meetingLink,
      StartTime: startTime,
      EndTime: endTime,
      Description: description,
      TargetAudience: targetAudience,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/editOneTalk/`, payload)
      .then(function (response) {
        if (response.status === 201) {
          console.log("pinged API successfully");
        }
        if (response.status !== 201) {
          console.log("something failed");
        }
        setTitle("");
        setSpeaker("");
        setLanguage("");
        setMeetingLink("");
        setStartTime("");
        setEndTime("");
        setDescription("");
        setTargetAudience("");
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleDeleteMeeting = (event: any) => {
    event.preventDefault();

    // fire warning button here !!!!!

    const payload = {
      Title: title,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/deleteOneTalk/`)
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
        setTitle("");
        setSpeaker("");
        setLanguage("");
        setMeetingLink("");
        setStartTime("");
        setEndTime("");
        setDescription("");
        setTargetAudience("");
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleChangeSpeakerName = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerName(event.target.value);
  };

  const handleChangeBio = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerBio(event.target.value);
  };

  // const handleChangeTalks = (event: { target: { value: React.SetStateAction<string> } }) => {
  //   setSpeakerTalks(event?.target.value);
  // };

  const handleChangeEmail = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerEmail(event?.target.value);
  };

  const handleChangeMobil = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerMobil(event?.target.value);
  };

  const handleChangeLinkedinLink = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerLinkedin(event?.target.value);
  };

  const handleSubmitSpeaker = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("need to save to db");
    const payload = {
      speakerName: speakerName,
      speakerBio: speakerBio,
      speakerEmail: speakerEmail,
      speakerMobile: speakerMobil,
      speakerLinkedin: speakerLinkedin,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/saveOneSpeaker/`, payload)
      .then(function (response) {
        console.log(" SPEAKER here is what we got", response);

        if (response.status === 201) {
          console.log("SPEAKERpinged API successfully");
          //push("/");
        }
        if (response.status !== 201) {
          console.log("SPEAKERsomething failed");
          //push("/");
        }
      })
      .catch(function (error) {
        console.log("SPEAKERhere is an error", error);
        //setCantUseThatEmail(true);
      });
    setSpeakerName("");
    setSpeakerEmail("");
    setSpeakerMobil("");
    setSpeakerLinkedin("");
    setSpeakerBio("");
    setSpeakerTalks("");
    window.location.reload();
  };

  const handleSubmitEditSpeaker = (event: React.MouseEvent) => {
    event.preventDefault();

    console.log("need to save to db");
    const payload = {
      id: speakerId,
      speakerName: speakerName,
      speakerBio: speakerBio,
      speakerEmail: speakerEmail,
      speakerMobil: speakerMobil,
      speakerLinkedin: speakerLinkedin,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/editOneSpeaker/`, payload)
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
        setSpeakerName("");
        setSpeakerBio("");
        setSpeakerEmail("");
        setSpeakerMobil("");
        setSpeakerLinkedin("");
        setSpeakerTalks("");
        window.location.reload();
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleSubmitDeleteSpeaker = (event: React.MouseEvent) => {
    event.preventDefault();

    // fire warning button here !!!!!

    const payload = {
      id: speakerId,
      name: speakerName,
    };

    axios
      .post(`${BASIS_URL}/techfridayAPI/deleteOneSpeaker/`, payload)
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
        setSpeakerId(0);
        setSpeakerName("");
        setSpeakerBio("");
        setSpeakerEmail("");
        setSpeakerMobil("");
        setSpeakerLinkedin("");
        setSpeakerTalks("");
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleMeetingButtonClick = (event: React.MouseEvent) => {
    const thisMeeting = meetingData?.filter(
      (meeting: talk) => meeting.title === event.currentTarget.id
    );
    if (thisMeeting?.length === 1) {
      setTitle(thisMeeting[0].title);
      setSpeaker(thisMeeting[0].speakerName);
      setLanguage(thisMeeting[0].language);
      setMeetingLink(thisMeeting[0].meetingLink);
      setStartTime(thisMeeting[0].startTime);
      setEndTime(thisMeeting[0].endTime);
      setDescription(thisMeeting[0].description);
      setRoom(thisMeeting[0].room);
      setTargetAudience(thisMeeting[0].targetAudience);
      setEditMeetings(true);
    }
  };

  const handleSpeakerButtonClick = (event: React.MouseEvent) => {
    const thisSpeaker = speakerData?.filter(
      (speaker: speaker) => speaker.speaker === event.currentTarget.id
    );
    if (thisSpeaker?.length === 1) {
      setSpeakerId(thisSpeaker[0].id);
      setSpeakerName(thisSpeaker[0].speaker);
      setSpeakerEmail(thisSpeaker[0].email);
      if (typeof thisSpeaker[0].mobil !== "undefined") setSpeakerMobil(thisSpeaker[0].mobil);
      if (typeof thisSpeaker[0].linkedIn !== "undefined")
        setSpeakerLinkedin(thisSpeaker[0].linkedIn);
      setSpeakerBio(thisSpeaker[0].bio);
      setSpeakerTalks(thisSpeaker[0].talks);
      setEditSpeaker(true);
    }
    console.log("speaker is", thisSpeaker);
  };

  if (haveMeetingData !== true || haveSpeakerData !== true) {
    return <div>loading</div>;
  }

  const meetingList = meetingData?.map((meeting: talk) => {
    return (
      <button
        type="button"
        className={BUTTON_STYLE_TIGHT}
        onClick={handleMeetingButtonClick}
        id={meeting.title}
        key={meeting.title}
      >
        <div>
          {" "}
          Id:{meeting.id}&nbsp;&nbsp;&nbsp;&nbsp; Title: {meeting.title}
        </div>
      </button>
    );
  });

  const speakerList = speakerData?.map((speaker: speaker) => {
    return (
      <button
        type="button"
        className={BUTTON_STYLE_TIGHT}
        onClick={handleSpeakerButtonClick}
        id={speaker.speaker}
        key={speaker.speaker}
      >
        <div>
          {" "}
          Id:{speaker.id}&nbsp;&nbsp;&nbsp;&nbsp; Name:{speaker.speaker}
        </div>
      </button>
    );
  });

  const speakerTalksDisplay = Array.from(speakerTalks).map((talk: any) => (
    <div key={talk.thisSpeaker}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{talk.title}</div>
  ));

  return (
    <main className="flex flex-col min-h-screen w-full justify-between gap-5 ">
      <div
        id="header"
        className="flex flex-row items-center justify-center w-full "
      >
        <br />
        <Link
          href="/"
          className={BUTTON_STYLE}
        >
          go back here!
        </Link>
        <Link
          href="/attendeeDisplayPage"
          className={BUTTON_STYLE}
        >
          Attendee List
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-col items-center w-full justify-start font-mono text-sm bg-amber-100">
          <br />

          <p className={TEXT_BOLD}>Enter Talk Data Here:</p>
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
            <label className="flex flex-row justify-start">
              Description:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea
                name="description"
                value={description}
                onChange={handleChangeDescrption}
                className="w-96 h-96 border-2  break-normal"
                // style={{ width: "370px", height: "400px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Speaker:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                options={speakerChoices}
                onChange={handleChangeSpeaker}
                value={speaker}
                placeholder="Select an option"
              />
            </label>
            <br />
            <label>
              Language:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                options={languages}
                onChange={handleChangeLangauge}
                value={language}
                placeholder="Select an option"
              />
            </label>
            <br />
            <label>
              Target Audience:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                options={targetAudiences}
                onChange={handleChangeTargetAudience}
                value={targetAudience}
                placeholder="Select an option"
              />
            </label>
            <br />
            <label>
              Room:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                options={rooms}
                onChange={handleChangeRoom}
                value={room}
                placeholder="Select an option"
              />
            </label>
            <br />
            {!editMeeting && (
              <button
                type="submit"
                onClick={handleSubmit}
                className={BUTTON_STYLE}
              >
                Create New Meeting
              </button>
            )}

            {editMeeting && (
              <div className="flex flex row justify-around w-full">
                <button
                  type="submit"
                  onClick={handleEditMeeting}
                  className={BUTTON_STYLE}
                >
                  Edit Meeting
                </button>
                <button
                  type="submit"
                  onClick={handleDeleteMeeting}
                  className={BUTTON_STYLE}
                >
                  Delete Meeting
                </button>
              </div>
            )}

            <br />
            <br />
          </form>
          <br />
          {meetingList}
          <br />
        </div>
        <div className="flex flex-col items-center w-full justify-start font-mono text-sm bg-amber-100">
          <br />
          <p className={TEXT_BOLD}>Enter Speaker Data Here:</p>
          <br />
          <form
            // onSubmit={handleSubmitSpeaker}
            className="flex flex-col justify-start"
          >
            <label>ID number :&nbsp;&nbsp; {speakerId}</label>
            <br />
            <label>
              Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="SpeakerName"
                value={speakerName}
                onChange={handleChangeSpeakerName}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="email"
                value={speakerEmail}
                onChange={handleChangeEmail}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <label>
              Mobile #:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="mobil"
                value={speakerEmail}
                onChange={handleChangeMobil}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <label>
              LinkedIn Link:&nbsp;
              <input
                type="text"
                name="mobil"
                value={speakerLinkedin}
                onChange={handleChangeLinkedinLink}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <div className="flex flex-row justify-start">
              <p> Talks: </p>
              {speakerTalksDisplay.length > 0 && <div>{speakerTalksDisplay}</div>}
              {speakerTalksDisplay.length === 0 && (
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;None</div>
              )}
            </div>
            <br />
            <label className="flex flex-row justify-start">
              Bio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea
                name="Bio"
                value={speakerBio}
                onChange={handleChangeBio}
                style={{ width: "370px", height: "400px", border: "1px solid" }}
              />
            </label>
            <br />
            {!editSpeaker && (
              <button
                type="submit"
                className={BUTTON_STYLE}
                onClick={handleSubmitSpeaker}
              >
                Add New Speaker
              </button>
            )}
            <br />
            {editSpeaker && (
              <div className="flex flex row justify-around w-full">
                <button
                  type="submit"
                  onClick={handleSubmitEditSpeaker}
                  className={BUTTON_STYLE}
                >
                  Edit Speaker
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitDeleteSpeaker}
                  className={BUTTON_STYLE}
                >
                  Delete Speaker
                </button>
              </div>
            )}
          </form>
          <br />
          {speakerList}
          <br />
        </div>
      </div>
    </main>
  );
};

export default DataEntryPage;
