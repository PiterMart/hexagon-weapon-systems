"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Video from "@/components/Video";
import Hexagon from "@/components/Hexagon";
import ScrollProgressRuler from "@/components/ScrollProgress";
import Portfolio from "@/components/Portfolio";
import WorldClock from "@/components/Clock";
import About from "@/components/About";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ScrollProgressRuler/>
        <Video/>
        <Hexagon/>
        <Portfolio/>
        {/* <div style={{height: '100vh', background: 'black'}}></div> */}
        <WorldClock/>
        <About/>
      </main>
    </div>
  );
}
