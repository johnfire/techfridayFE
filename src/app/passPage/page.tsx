"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PASS_PHRASE = "blah";

const PassPage = () => {
  const passPhrase: string = PASS_PHRASE;
  const router = useRouter();
  const [userEntry, setUserEntry] = useState<string>("");

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setUserEntry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userEntry === PASS_PHRASE) {
      router.push("/dataEntryPage/");
    }

    if (userEntry !== PASS_PHRASE) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 min-h-screen w-full border-4">
      <p>Please enter the pass phrase here</p>

      <form onSubmit={handleSubmit}>
        <label>
          Pass Phrase:&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="passPhrase"
            value={userEntry}
            onChange={handleChange}
          />
        </label>
        &nbsp;&nbsp;&nbsp;
        <input
          type="submit"
          value="Submit"
          className="bg-slate-300 border-4 border-black"
        />
      </form>

      <br />
      <Link
        href="/"
        className="bg-slate-300 border-4 border-black"
      >
        go back here!
      </Link>
      <br />
    </div>
  );
};

export default PassPage;
