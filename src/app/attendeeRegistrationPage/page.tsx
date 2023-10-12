"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useRouter } from "next/navigation";

import { typeOfAttendee } from "@/constants";

const AttendeeRegistrationPage = () => {
  const { push } = useRouter();
  const [attendeeFirstName, setAttendeeFirstName] = useState<string>("");
  const [attendeeLastName, setAttendeeLastName] = useState<string>("");
  const [attendeeBio, setAttendeeBio] = useState<string>("");
  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [attendeeTelephone, setAttendeeTelephone] = useState<string>("");
  const [attendeeCompany, setAttendeeCompany] = useState<string>("");
  const [attendeeType, setAttendeeType] = useState<string>("");

  const handleChangeAttendeeFirstName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAttendeeFirstName(event.target.value);
  };

  const handleChangeAttendeeLastName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAttendeeLastName(event.target.value);
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

  const handleChangeTelephone = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAttendeeTelephone(event?.target.value);
  };
  const handleChangeAttendeeType = (event: any) => {
    setAttendeeType(event.value);
  };

  const handleSubmitAttendee = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const payload = {
      attendeeFirstName: attendeeFirstName,
      attendeeLastName: attendeeLastName,
      attendeeBio: attendeeBio,
      attendeeEmail: attendeeEmail,
      attendeeTelephone: attendeeTelephone,
      attendeeType: attendeeType,
      attendeeCompany: attendeeCompany,
    };

    axios
      .post("http://localhost:8000/techfridayAPI/saveOneAttendee/", payload)
      .then(function (response) {
        console.log("here is what we got", response);

        if (response.status === 201) {
          console.log("pinged API successfully");
          push("/");
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
        <div className="flex flex-col items-center w-full justify-between justify-start font-mono text-sm bg-slate-200">
          <br />
          <p>Enter Attendee data here</p>
          <br />
          <form
            onSubmit={handleSubmitAttendee}
            className="flex flex-col"
          >
            <label>
              First Name:&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={attendeeFirstName}
                onChange={handleChangeAttendeeFirstName}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Last Name:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={attendeeLastName}
                onChange={handleChangeAttendeeLastName}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              Telephone:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="Speaker"
                value={attendeeTelephone}
                onChange={handleChangeTelephone}
                style={{ width: "370px", border: "1px solid" }}
              />
            </label>
            <br />
            <label>
              Company:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            <label>
              type of
              attendee:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Dropdown
                options={typeOfAttendee}
                onChange={handleChangeAttendeeType}
                value={attendeeType}
                placeholder="Select an option"
              />
            </label>
            <br />
            <input
              type="submit"
              value="Submit"
              style={{ border: "1px solid", backgroundColor: "grey" }}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between justify-start">
        <Link
          href="/"
          className="items-center justify-start"
          style={{ width: "250px", border: "1px solid", backgroundColor: "grey" }}
        >
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; go back
          here!
        </Link>
        <br />
        <br />
      </div>
    </main>
  );
};

export default AttendeeRegistrationPage;
