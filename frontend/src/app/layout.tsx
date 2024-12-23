"use client";

import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const geistSans = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showBorders, setShowBorders] = React.useState(false);

  React.useEffect(() => {
    if (showBorders) {
      document.documentElement.classList.add("show-borders");
    } else {
      document.documentElement.classList.remove("show-borders");
    }
  }, [showBorders]);

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistMono.variable} ${geistMono.variable} antialiased`}
      >
        <button
          onClick={() => setShowBorders(!showBorders)}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded"
        >
          Toggle Borders
        </button>
        {children}
      </body>
    </html>
  );
}
