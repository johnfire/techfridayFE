"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Attendee } from "@/interfaces/interfaces";

const AttendeeDisplayPage = () => {
  console.log("new display page");

  const [attendeeList, setAttendeeList] = useState<Attendee[]>([]);
  const [haveAttendeeList, setHaveAttendeeList] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/techfridayAPI/getAllAttendees")
      .then((response) => {
        let meetingData: Attendee[] = [];
        for (let i = 0; i < response.data.length; i++) {
          meetingData.push(response.data[i]);
        }
        setAttendeeList(meetingData);
        setHaveAttendeeList(true);
      })
      .catch((error) => {});
  }, []);

  if (!haveAttendeeList) return <div>loading</div>;

  const attendees = attendeeList.map((attendee) => {
    return (
      <div>
        {attendee.id}:&nbsp;
        {attendee.firstName} &nbsp;
        {attendee.lastName} &nbsp;
        {attendee.email} &nbsp;
        {attendee.telephone}&nbsp;
        {attendee.company} &nbsp;
        {attendee.type}
      </div>
    );
  });

  return (
    <div className="flex flex-col w-full h-full min-h-screen items-center">
      here are the attendees to date
      <div>{attendees}</div>
    </div>
  );
};

export default AttendeeDisplayPage;
