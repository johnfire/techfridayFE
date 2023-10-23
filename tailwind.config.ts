import type { Config } from "tailwindcss";

const HEADER_SIZE = "100px";
const PAUSE_SIZE = "80px";
const TALK_SIZE = "400px";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "13": "repeat(13,minmax(0,1fr))",
        layout: `${HEADER_SIZE}, ${PAUSE_SIZE}, ${TALK_SIZE}, ${PAUSE_SIZE}, ${TALK_SIZE}, ${PAUSE_SIZE}, ${TALK_SIZE}, ${PAUSE_SIZE} ${TALK_SIZE}, 80px, ${TALK_SIZE} 80px, ${HEADER_SIZE}`,
      },
      width: {
        "370": "370px",
      },
      height: {
        "400": "400px",
      },
    },
  },
  plugins: [],
};
export default config;
