import type { Config } from "tailwindcss";

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
        layout: "200px, 400px,200px,400px,200px,400px,200px, 400px,200px,400px,200px,400px,200px",
      },
    },
  },
  plugins: [],
};
export default config;
