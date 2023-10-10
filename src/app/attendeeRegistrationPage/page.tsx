"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const AttendeeRegistrationPage = () => {
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeBio, setAttendeeBio] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeeCompany, setAttendeeCompany] = useState("");

  const handleChangeAttendeeName = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAttendeeName(event.target.value);
  };

  const handleChangeBio = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAttendeeBio(event.target.value);
  };

  const handleChangeCompany = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAttendeeCompany(event?.target.value);
  };

  const handleChangeEmail = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAttendeeEmail(event?.target.value);
  };

  const handleSubmitAttendee = (event: any) => {
    event.preventDefault();
    console.log("need to save to db");
    const payload = {
      attendeeName: attendeeName,
      attendeeBio: attendeeBio,
      attendeeTalks: attendeeCompany,
      attendeeEmail: attendeeEmail,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/saveOneAttendee/", payload)
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
        <div className="flex flex-col items-center w-full justify-between font-mono text-sm bg-slate-200">
          <br />
          <p>Enter Attendee data here</p>
          <br />
          <form
            onSubmit={handleSubmitAttendee}
            className="flex flex-col"
          >
            <label>
              Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={attendeeName}
                onChange={handleChangeAttendeeName}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={attendeeEmail}
                onChange={handleChangeEmail}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Company:&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Language"
                value={attendeeCompany}
                onChange={handleChangeCompany}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Bio:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="description"
                value={attendeeBio}
                onChange={handleChangeBio}
                style={{ width: "370px", height: "400px", border: "1px solid" }}
              />
            </label>
            <br />
            <input
              type="submit"
              value="Submit"
              style={{ border: "1px solid", backgroundColor: "grey" }}
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </form>
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

export default AttendeeRegistrationPage;
