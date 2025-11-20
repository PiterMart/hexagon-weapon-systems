"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Video from "@/components/Video";
import Hexagon from "@/components/Hexagon";
import ScrollProgressRuler from "@/components/ScrollProgress";
import Portfolio from "@/components/Portfolio";
import WorldClock from "@/components/Clock";
import About from "@/components/About";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import InteractiveObjectScene from "@/components/InteractiveObjectScene";
import CurvedScrollingText from "@/components/CurvedScrollingText";
import DroneAnimation from "@/components/DroneAnimation";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial content loading
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(`
                                          :~7???7!:.                                                
                                      :!YGBGPYYY5GBB57:                                             
                                  .~JPBB57:       :!YGBGJ!.                                         
                              .^?PBBP?^.              ^75BBP?~.                                     
                           :75BBGJ~.      .^?Y5Y?~.      .~JPBB57^                                  
                        ~JGBGY!:       :!YG#&&##&#B57^       :!YGBGY!.                              
                      !G#P7^       :!JP#&&##########&#GY!:       :75#B7                             
                     J&G~       ~?PB#&#################&#BPJ~.      ^P&5.                           
                    7&B:      ^G#&#########################&#G~      .G&J                           
                    Y&Y       Y&#############################&P       J&P                           
                    Y&Y       Y&##############################P       ?&P                           
                    Y&Y       Y&##############################P       ?&P                           
                    Y&Y       Y&##############################P       ?&P                           
                    Y&Y       Y&##############################P       ?&P                           
                    Y&Y       Y&##############################P       ?&P                           
                    Y&Y       Y&###########&&&&&&&############P       ?&P                           
                    Y&Y       7#&########BPY?7!7?J5B#&######&&J       ?&P                           
                    Y&Y        ~YG#&###5!.   ...   .~Y###&#GY!        ?&P                           
                    Y&5           ^75P~  .75GBBBG5?:  ^P5?^.          J&P                           
                    ~##~                !B&#######&B7                ^B&7                           
                     7##?.             :#############~             .7B#?                            
                      :Y#B57^          ^############&!          :!YB#5^                             
                        .!YGBGY!:       J#&########&5.      .~JGBGY!:                               
                            :75BBPJ~.    ~5B#####B5!    .^?PBB57^                                   
                               .^?PBBP?^.  .^~!~^.   ^75BBPJ~.                                       
                                   .~JGBB57:.   .:!YGBGY!:                                           
                                       :!YGBGGGGGBG57:                                               
                                           .^~~~^:                                                   
                                                                                                    
                                                                                                    
                                                                                                    
   Y!            :5^  :5YJJJJJJJJJY~ :JY^         .?Y~         ^55^                                 
   &J            ^@!  ~@~.........:.  .?GP!     ^JGJ^         ?#7?#?                                
   #J            ^@!  ^@^                ~PG7.~5P7.         .5B^  ^BP.                              
   #GJJJJJJJJJJJJY@!  ^@5JJJJJJJJ:         ~#&@?           ^BY      5B^                             
   #J            ^@!  ^@~ .......        ^YP?:7PP!        ?@P!!!!!!!!G@?      .    ..    .    .     
   &J            ^@!  ~@^             .!PP7.    ~PG?:   .PG~^~~~~~~~~^~BP.  :~:^^:~::!.7^^!^7::~^   
   P7            :B~  ^BYJJJJJJJJJY! ^55~         ^YP! .5Y             .55. :~:^^:~::!:7  .^J::~^ : 
                         ..........  .               .                        ..   ..      .^ .  
    
    developed by Zyntax, Pedro martingaste and https://www.instagram.com/zyntax_xx/
    `);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} isLoading={!contentLoaded} />}
        {/* <InteractiveObjectScene/> */}
        <CurvedScrollingText/>
        <ScrollProgressRuler/>
        {/* <div style={{marginBottom: '-25REM'}}><DroneAnimation/></div> */}
        <Video/>
        <Hexagon/>
        {/* <Portfolio/> */}
        {/* <div style={{height: '100vh', background: 'black'}}></div> */}
        <WorldClock/>
        {/* <div style={{height: '100vh', background: 'black'}}></div> */}
        <About/>
      </main>
    </div>
  );
}
