import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata ={
  title: "Tech Friday!",
  description: "program, registration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
