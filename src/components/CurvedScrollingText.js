"use client"
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '@/styles/CurvedScrollingText.module.css';

const CurvedScrollingText = ({ text = "[ ✜ ]---< LOCK >---[ ✜ ] . . . . . . . . .| █ █ █ ░ ░ | SYS_CHECK :: COMSEC_ACTIVE | .. .. . . ... . .. . .. .. [ ▤▤▤▤ | DATALINK EST. | ▤▤▤▤ ] ... .. . .. . ... .  | | | ...┣━━┫┯┣━━┫┣━━┫┯┣━━┫┣━━┫┯┣━━┫ " }) => {
  const outerContainerRef = useRef(null);
  const innerContainerRef = useRef(null);
  const [centerTextIndex, setCenterTextIndex] = useState(0);
  const [generatedTexts, setGeneratedTexts] = useState([]);

  // Random text generation based on military/battlefield context
  const generateRandomText = useCallback(() => {
    const statusTypes = ['JAM_ACTIVE', 'SIG_INTERRUPT', 'COMMS_LOSS', 'LINK_DOWN', 'SYS_FAIL', 'NET_DROP', 'CARRIER_LOST'];
    const sectors = ['SECTOR-A', 'SECTOR-B', 'SECTOR-C', 'SECTOR-G', 'SECTOR-H', 'ZONE-4', 'ZONE-7', 'GRID-9'];
    const units = ['DRONE', 'UAV', 'TANK', 'IFV', 'HELO', 'ARTY', 'APC', 'MECH'];
    const unitNumbers = () => String(Math.floor(Math.random() * 20) + 1).padStart(2, '0');
    const targets = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'TANGO'];
    const targetNumbers = () => Math.floor(Math.random() * 12) + 1;
    const zones = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
    const zoneNumbers = () => Math.floor(Math.random() * 9) + 1;
    const systems = ['ECCM_ON', 'ECM_ACTIVE', 'COMSEC_ACTIVE', 'DATALINK_EST', 'NET_SYNC', 'GPS_LOCK'];
    const impacts = ['EXPLOSION_HI', 'EXPLOSION_LO', 'KINETIC_HIT', 'STRUCT_DMG', 'IMPACT', 'CRATER_FORM'];
    const operations = ['UAV_SCAN', 'AIR_SUPPR', 'GRND_ENGAGE', 'CAS_MISSION', 'RECON_SWEEP', 'PATROL_ACT'];
    const swarms = ['PHOENIX', 'RAVEN', 'EAGLE', 'FALCON', 'HAWK', 'VIPER', 'COBRA'];
    
    const symbols = {
      wave: '~ ~ ~',
      slash: '|///|',
      x: '--X--X--X--',
      diamond: '{ ☍ ☍ ☍ }',
      star: '✹ ✹ ✹',
      radiation: '☢',
      blocks: '▰▱',
      arrow: '>>>>',
      target: '<|>',
      scan: '<><>',
      air: '_▲_',
      ground: '_▼_',
      cross: '>-*-<',
      pointer: '>>_>>_>>_>>',
      square: '◫'
    };

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const patterns = [
      // Status with sector
      () => `${symbols.wave} [${random(statusTypes)}: ${random(sectors)}] ${symbols.wave}`,
      // Simple status
      () => `${symbols.slash} [${random(statusTypes)}] ${symbols.slash}`,
      // Loss pattern
      () => `${symbols.x} [COMMS_LOSS]`,
      // System status
      () => `${symbols.diamond} [${random(systems)}]`,
      // Impact zone
      () => `${symbols.star} [IMPACT_ZONE: ${random(zones)}-${zoneNumbers()}] ${symbols.star}`,
      // Damage
      () => `_${random(['C_R_U_M_B_L_E', 'S_H_A_T_T_E_R', 'C_O_L_L_A_P_S_E'])}_  [${random(impacts)}]`,
      // Explosion
      () => `${symbols.radiation} [${random(impacts)}] ${symbols.radiation}`,
      // Combat engagement
      () => `{${random(units)}-${unitNumbers()}} ${symbols.cross} {${random(units)}-${unitNumbers()}} [IMPACT_${unitNumbers()}]`,
      // Multi-status
      () => `[SIG_JAM] ${symbols.target} [UAV_PATH] ${symbols.target} [${random(operations)}]`,
      // Block pattern
      () => `${symbols.blocks} ${symbols.arrow} ${symbols.radiation} ${symbols.arrow} ${symbols.square} ${symbols.blocks}`,
      // Drone targeting
      () => `${symbols.blocks}${symbols.blocks} [${random(units)}_${unitNumbers()}] ${symbols.arrow} TGT:${random(targets)}-${targetNumbers()}`,
      // Scan pattern
      () => `${symbols.scan} [${random(operations)}] ${symbols.pointer}`,
      // Air/ground
      () => `${symbols.air} [${random(operations)}] ${symbols.ground}`,
      // Swarm
      () => `{${random(units)}_SWARM: ${random(swarms)}-${targetNumbers()}}`,
      // Lock pattern
      () => `[ ✜ ]---< ${random(['LOCK', 'TARGET', 'ACQUIRE', 'TRACK'])} >---[ ✜ ]`,
      // Data pattern
      () => `[ ▤▤▤▤ | ${random(['DATALINK EST', 'NET SYNC', 'UPLINK ACT', 'FEED LIVE'])} | ▤▤▤▤ ]`,
      // Bar pattern
      () => `| █ █ █ ░ ░ | ${random(['SYS_CHECK', 'NET_CHECK', 'LINK_TEST'])} :: ${random(systems)} |`,
    ];

    return random(patterns)();
  }, []);

  // Initialize generated texts
  useEffect(() => {
    const texts = Array.from({ length: 50 }, () => generateRandomText());
    setGeneratedTexts(texts);
  }, [generateRandomText]);

  // Regenerate some texts periodically for variety
  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratedTexts(prev => {
        const newTexts = [...prev];
        // Replace 5 random texts
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * newTexts.length);
          newTexts[randomIndex] = generateRandomText();
        }
        return newTexts;
      });
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [generateRandomText]);

  useEffect(() => {
    // Outer circle
    const outerContainer = outerContainerRef.current;
    if (outerContainer) {
      const repeatedText = (text + " ").repeat(3);
      outerContainer.innerHTML = '';

      repeatedText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = styles.char;
        span.style.setProperty('--char-index', index);
        outerContainer.appendChild(span);
      });
    }

    // Inner circle
    const innerContainer = innerContainerRef.current;
    if (innerContainer) {
      const repeatedText = (text + " ").repeat(3);
      innerContainer.innerHTML = '';

      repeatedText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = styles.charInner;
        span.style.setProperty('--char-index', index);
        innerContainer.appendChild(span);
      });
    }
  }, [text]);

  // Strobo effect for center text - cycle through texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterTextIndex((prev) => (prev + 1) % (generatedTexts.length || 1));
    }, 150); // 150ms for strobo effect

    return () => clearInterval(interval);
  }, [generatedTexts.length]);

  // 17 lines with varying widths creating diamond/pyramid shape
  const lines = generatedTexts.length > 0 ? [
    { text: generatedTexts[(centerTextIndex) % generatedTexts.length], width: 'narrow' },
    { text: generatedTexts[(centerTextIndex + 1) % generatedTexts.length], width: 'small' },
    { text: generatedTexts[(centerTextIndex + 2) % generatedTexts.length], width: 'medium' },
    { text: generatedTexts[(centerTextIndex + 3) % generatedTexts.length], width: 'mediumLarge' },
    { text: generatedTexts[(centerTextIndex + 4) % generatedTexts.length], width: 'large' },
    { text: generatedTexts[(centerTextIndex + 5) % generatedTexts.length], width: 'extraLarge' },
    { text: generatedTexts[(centerTextIndex + 6) % generatedTexts.length], width: 'wide' },
    { text: generatedTexts[(centerTextIndex + 7) % generatedTexts.length], width: 'wider' },
    { text: generatedTexts[(centerTextIndex + 8) % generatedTexts.length], width: 'widest' },
    { text: generatedTexts[(centerTextIndex + 9) % generatedTexts.length], width: 'wider' },
    { text: generatedTexts[(centerTextIndex + 10) % generatedTexts.length], width: 'wide' },
    { text: generatedTexts[(centerTextIndex + 11) % generatedTexts.length], width: 'extraLarge' },
    { text: generatedTexts[(centerTextIndex + 12) % generatedTexts.length], width: 'large' },
    { text: generatedTexts[(centerTextIndex + 13) % generatedTexts.length], width: 'mediumLarge' },
    { text: generatedTexts[(centerTextIndex + 14) % generatedTexts.length], width: 'medium' },
    { text: generatedTexts[(centerTextIndex + 15) % generatedTexts.length], width: 'small' },
    { text: generatedTexts[(centerTextIndex + 16) % generatedTexts.length], width: 'narrow' }
  ] : [];

  return (
    <div className={styles.curvedScrollWrapper}>
      <div className={styles.curvedScrollContainer}>
        <div ref={outerContainerRef} className={styles.textPath}></div>
        <div ref={innerContainerRef} className={styles.textPathInner}></div>
        <div className={styles.centerTextContainer}>
          {lines.map((line, index) => (
            <div 
              key={index} 
              className={`${styles.centerText} ${styles[line.width]}`}
              style={{ '--line-index': index }}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurvedScrollingText;

