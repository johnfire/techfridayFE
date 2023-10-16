import "./globals.css";
import type { Metadata } from "next";
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
