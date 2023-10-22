export const rooms: string[] = [
  "Townhall 1",
  "Townhall 2",
  "Blauer Affe",
  "N8schicht",
  "Auzbi-Raum",
];
export const languages: string[] = ["English", "Deutsch"];

export const targetAudiences: string[] = [
  "Nicht-Devs verstandlich",
  "Tech und Dev intererese verstandlich",
  "SoftwareEntwicler",
];

export const typeOfAttendee: string[] = ["remote", "on campus"];

// for some reason these will not import in production, only dev i have no F---ing clue why
export const BUTTON_STYLE: string = "border-2 bg-blue-900 items-center text-white px-5 mx-4";
export const BUTTON_STYLE_TIGHT: string = "border-2 bg-blue-900 items-center text-white";
export const TEXT_BOLD: string = "text-lg font-semibold";
export const SMALL_BORDER: string = "border-2 border-black border-solid  mb-5";
export const MEDIUM_BORDER: string = "border-4 border-black border-solid";

// these work
export const STAR_SIZE: number = 15;
export const TECH_FRIDAY_GRAPHIC_SIZE: number = 300;
export const DEBUG: boolean = true;
// export const BASIS_URL: string = "http://127.0.0.1:8000"; // development mode

export const BASIS_URL: string = "https://pythonserver.tandkcybernetics.net"; // test production mode

// export const BASIS_URL: string = "http://techfridayserver.tarent-solutions.com"; //final production mode
