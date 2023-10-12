"use client";

import React, { useEffect, useState, MouseEvent, MouseEventHandler } from "react";
import Link from "next/link";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

import { talk, speaker } from "@/interfaces/interfaces";
import { rooms, languages, targetAudiences } from "@/constants";

// import TimePicker from "react-time-picker";

const DataEntryPage = () => {
  const [title, setTitle] = useState<string>("");
  const [speaker, setSpeaker] = useState<string>("");
  const [langauge, setLanguage] = useState<string>("");
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

  const [speakerName, setSpeakerName] = useState<string>("");
  const [speakerBio, setSpeakerBio] = useState<string>("");
  const [speakerEmail, setSpeakerEmail] = useState<string>("");
  const [speakerTalks, setSpeakerTalks] = useState<any>("");

  const [speakerChoices, setSpeakerChoices] = useState<string[]>([""]);

  console.log("pageRefresh is now");

  useEffect(() => {
    axios
      .get("http://localhost:8000/techfridayAPI/getAllTalks")
      .then((response) => {
        let meetingData: talk[] = [];
        for (let i = 0; i < response.data.length; i++) {
          meetingData.push(response.data[i]);
        }
        setMeetingData(meetingData);
        setHaveMeetingData(true);
      })
      .catch((error) => {});
    console.log("past get meetings call");
    axios
      .get("http://localhost:8000/techfridayAPI/getAllSpeakers")
      .then((response1) => {
        let speakerData: speaker[] = [];
        console.log("here is the raw data from backend", response1.data);
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
      Language: langauge,
      MeetingLink: meetingLink,
      StartTime: startTime,
      EndTime: endTime,
      Description: description,
      TargetAudience: targetAudience,
      Room: room,
    };

    console.log("here is the outgoing payload", payload);

    axios
      .post("http://localhost:8000/techfridayAPI/saveOneTalk/", payload)
      .then(function (response) {
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
        setRoom("");
        window.location.reload();
      })
      .catch(function (error) {
        console.log("here is an error", error);
        //setCantUseThatEmail(true);
      });
  };

  const handleSubmitEditMeeting = (event: any) => {
    event.preventDefault();

    console.log("need to save to db");
    const payload = {
      Title: title,
      Speaker: speaker,
      Language: langauge,
      MeetingLink: meetingLink,
      StartTime: startTime,
      EndTime: endTime,
      Description: description,
      TargetAudience: targetAudience,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/editOneTalk/", payload)
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

  const handleSubmitdeleteMeeting = (event: any) => {
    event.preventDefault();

    // fire warning button here !!!!!

    const payload = {
      Title: title,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/deleteOneTalk/")
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

  const handleChangeTalks = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerTalks(event?.target.value);
  };

  const handleChangeEmail = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSpeakerEmail(event?.target.value);
  };

  const handleSubmitSpeaker = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("need to save to db");
    const payload = {
      speakerName: speakerName,
      speakerBio: speakerBio,
      speakerEmail: speakerEmail,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/saveOneSpeaker/", payload)
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
    setSpeakerBio("");
    setSpeakerTalks("");
    window.location.reload();
  };

  const handleSubmitEditSpeaker = (event: React.MouseEvent) => {
    event.preventDefault();

    console.log("need to save to db");
    const payload = {
      Speaker: speakerName,
      Bio: speakerBio,
      email: speakerEmail,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/editOneTalk/", payload)
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
      name: speakerName,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/editOneSpeaker/")
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
    console.log("meeting is here", thisMeeting);
    if (thisMeeting?.length === 1) {
      setTitle(thisMeeting[0].title);
      setSpeaker(thisMeeting[0].speaker);
      setLanguage(thisMeeting[0].langauge);
      setMeetingLink(thisMeeting[0].meetingLink);
      setStartTime(thisMeeting[0].startTime);
      setEndTime(thisMeeting[0].endTime);
      setDescription(thisMeeting[0].description);
      setRoom(thisMeeting[0].room);
      setTargetAudience(thisMeeting[0].targetAudience);
      setEditMeetings(true);
    }
    console.log("meeting is", thisMeeting);
  };

  const handleSpeakerButtonClick = (event: React.MouseEvent) => {
    const thisSpeaker = speakerData?.filter(
      (speaker: speaker) => speaker.speaker === event.currentTarget.id
    );
    if (thisSpeaker?.length === 1) {
      setSpeakerName(thisSpeaker[0].speaker);
      setSpeakerEmail(thisSpeaker[0].email);
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
        className="border-2 w-full bg-stone-300"
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
        className="border-2 w-full bg-stone-300"
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
    <div>&nbsp;&nbsp;{talk.title}</div>
  ));

  console.log("here is the speaker data we have gotten ", speakerData);
  return (
    <main className="flex flex-col min-h-screen w-full justify-between gap-5">
      <div className="flex flex-row items-center justify-around w-full">
        <br />
        <br />
        <Link
          href="/"
          className="items-center"
          style={{ width: "250px", border: "1px solid", backgroundColor: "grey" }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;go
          back here!
        </Link>
        <Link
          href="/attendeeDisplayPage"
          className="items-center"
          style={{ width: "250px", border: "1px solid", backgroundColor: "grey" }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          attendees
        </Link>
      </div>
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-col items-center w-full justify-between font-mono text-sm bg-amber-100">
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
                value={langauge}
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
                style={{ border: "1px solid", backgroundColor: "grey" }}
              >
                create new meeting
              </button>
            )}

            {editMeeting && (
              <div className="flex flex row justify-around w-full">
                <button
                  type="submit"
                  onClick={handleSubmitEditMeeting}
                  style={{ border: "1px solid", backgroundColor: "grey" }}
                >
                  edit meeting
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitdeleteMeeting}
                  style={{ border: "1px solid", backgroundColor: "grey" }}
                >
                  delete meeting
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
        <div className="flex flex-col w-full justify-start font-mono text-sm bg-amber-100">
          <br />
          <p>Enter speaker data here</p>
          <br />
          <form
            // onSubmit={handleSubmitSpeaker}
            className="flex flex-col"
          >
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
            <br />
            <p> Talks: </p>
            {speakerTalksDisplay}
            <br />
            <label>
              Bio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
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
                style={{ border: "1px solid", backgroundColor: "grey" }}
                onClick={handleSubmitSpeaker}
              >
                add new speaker
              </button>
            )}
            <br />
            {editSpeaker && (
              <div className="flex flex row justify-around w-full">
                <button
                  type="submit"
                  onClick={handleSubmitEditSpeaker}
                  style={{ border: "1px solid", backgroundColor: "grey" }}
                >
                  edit Speaker
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitDeleteSpeaker}
                  style={{ border: "1px solid", backgroundColor: "grey" }}
                >
                  delete delete
                </button>
              </div>
            )}
            <br />
            {speakerList}
            <br />
          </form>
        </div>
      </div>
    </main>
  );
};

export default DataEntryPage;
