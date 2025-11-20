import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AutoRefresh from "../components/AutoRefresh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hexagon Weapon Ststems",
  description: "Warfare, Technology & Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AutoRefresh />
        {children}
      </body>
    </html>
  );
}
