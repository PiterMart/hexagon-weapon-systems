'use client';

import { useEffect, useState, useRef } from 'react';
import styles from '../styles/AutoRefresh.module.css';

export default function AutoRefresh() {
  const [showPopup, setShowPopup] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [flashText, setFlashText] = useState('');
  const intervalRef = useRef(null);

  const buttonTexts = [
    `/ᐠ      ᐟ\\\nദ്ദി •ˉ͈̀ ꒳ ˉ͈́ )`,
    `૮ ․ ․ ྀིა`,
    `A̵̦̻͇͕̣͎͎̋͆̽͐͆̓̈́̌̚͠͝ľ̸̡̪̼̫̝͚̱̜̞̬̬̠̤͓̊̎͂̌͜7̶̨̭̼̪̣͈̝͔̜̮͇̟̝̎̑̈́̓͝0̷̧̡̲̟̘̭̲̝͉͎̝̦̐̅͐!̸̬̘̤͓̃̊̆̈́͑̚!̸̨͍̺͇̫̩̪͍̼͗͑́̒͆͠!̴͈͖͖͙̪͇̈́͋̒͊̋̉̃̒̕͜𐰁`
  ];

  useEffect(() => {
    // Set interval for 1 minute
    intervalRef.current = setInterval(() => {
      // Show popup
      setShowPopup(true);
      setShowFlash(false);
    }, 120000); // 2 minutes

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleButtonClick = (index) => {
    // Set the flash text and show flash
    setFlashText(buttonTexts[index]);
    setShowFlash(true);

    // After animation, hide everything
    setTimeout(() => {
      setShowFlash(false);
      setShowPopup(false);
    }, 1000); // 1 second flash duration
  };

  if (!showPopup) return null;

  return (
    <div className={styles.overlay}>
      {showFlash && (
        <div className={styles.flashOverlay}>
          <div className={styles.flashText}>{flashText}</div>
        </div>
      )}
      <div className={styles.popup}>
        <div className={styles.content}>
          <h2 className={styles.title}>R A D I O INTERFERENCE •DETECTED•</h2>
          <p style={{maxWidth: '500px', margin: 'auto'}}>⠀⠀⠀⣂⣠⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⢀⡀⡆⠀⠀⠀⠀
⠀⠀⠀⣿⣿⠀⠀⣀⠀⢣⣄⣶⣶⡿⠁⠀⠀⠀⠈⡇⣇⡠⢀⠀⠀
⢚⣺⠟⣿⣿⣿⠿⠶⠀⢒⣿⣿⣮⡟⠛⠀⠽⠻⠿⡿⡾⠓⠫⠆⠁
⠀⠀⠀⢹⡟⠀⠀⠀⣠⠟⠋⠿⠙⣿⣶⡤⠀⠀⠀⢸⠳⠄⠀⠀⠀
⠀⠀⠀⢸⠁⠀⠀⠀⠁⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀ </p>
          <div className={styles.buttonContainer}>
            <button 
              className={styles.sequenceButton}
              onClick={() => handleButtonClick(0)}
            >
               /ᐠ      ᐟ\
               ദ്ദി •ˉ͈̀ ꒳ ˉ͈́ )
            </button>
            <button 
              className={styles.sequenceButton}
              onClick={() => handleButtonClick(1)}
            >
             ૮ ․ ․ ྀིა
            </button>
            <button 
              className={styles.sequenceButton}
              onClick={() => handleButtonClick(2)}
            >
              A̵̦̻͇͕̣͎͎̋͆̽͐͆̓̈́̌̚͠͝ľ̸̡̪̼̫̝͚̱̜̞̬̬̠̤͓̊̎͂̌͜7̶̨̭̼̪̣͈̝͔̜̮͇̟̝̎̑̈́̓͝0̷̧̡̲̟̘̭̲̝͉͎̝̦̐̅͐!̸̬̘̤͓̃̊̆̈́͑̚!̸̨͍̺͇̫̩̪͍̼͗͑́̒͆͠!̴͈͖͖͙̪͇̈́͋̒͊̋̉̃̒̕͜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

