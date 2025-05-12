"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Video from "@/components/Video";
import Hexagon from "@/components/Hexagon";
import ScrollProgressRuler from "@/components/Ui";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ScrollProgressRuler/>
        <Video/>
        <Hexagon/>
        <div style={{height: '100vh', background: 'black'}}></div>
      </main>
    </div>
  );
}
