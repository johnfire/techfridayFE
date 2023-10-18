"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// doesnt work in production...  -.-
// import { BUTTON_STYLE, TEXT_BOLD } from "@/constants";

const BUTTON_STYLE = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
const BUTTON_STYLE_TIGHT = "border-2 bg-blue-900 items-center text-white";
const TEXT_BOLD = "text-lg font-semibold";
const SMALL_BORDER = "border-2 border-black border-solid  mb-5";
const MEDIUM_BORDER = "border-4 border-black border-solid";

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
    <div className="flex flex-col justify-center items-center bg-amber-100 min-h-screen w-full border-4">
      <p className={TEXT_BOLD}>Please enter the pass phrase here:</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="passPhrase"
          value={userEntry}
          onChange={handleChange}
          className=" border-2 border-black "
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="submit"
          value="Submit"
          className={BUTTON_STYLE}
        />
      </form>

      <br />
      <Link
        href="/"
        className={BUTTON_STYLE}
      >
        go back here!
      </Link>
      <br />
    </div>
  );
};

export default PassPage;
