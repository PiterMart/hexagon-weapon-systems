import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';
import ImageGallery from './ImageGallery';

// Wave text component for cryptic text
const WaveText = ({ text, className }) => {
  const characters = text.split('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const characterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  return (
    <motion.span className={className} variants={containerVariants}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.03,
            ease: "easeInOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const About = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define folder mapping for each division
  const folderMapping = {
    'drones': 'fpv pov',
    'pilots': 'pilot',
    'tanks_vs_drones': 'tank',
    'anti_drone_strategies': 'soldiers',
    'nightvision': 'nightvision',
    'combat_cases': 'drone case'
  };

  const handleDivisionClick = (divisionKey) => {
    setCurrentFolder(folderMapping[divisionKey]);
    setIsGalleryOpen(true);
  };

  // Dynamic variants based on scroll direction
  const getContainerVariants = () => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15,
        staggerDirection: scrollDirection === 'down' ? 1 : -1
      }
    }
  });

  const getItemVariants = () => ({
    hidden: { 
      opacity: 0, 
      y: scrollDirection === 'down' ? 20 : -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  });

  return (
    <div className={styles.aboutContainer} style={{ marginTop: '15rem' }}>
      <motion.div 
        className={styles.contentWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px", amount: 0.1 }}
        variants={getContainerVariants()}
      >
        <motion.div className={styles.logoContainer} variants={getItemVariants()}>
          <Image
            src="/logo solo.svg"
            alt="Hexagon Developments Logo"
            width={200}
            height={200}
            className={styles.logo}
            priority
            style={{
              filter: 'invert(1)',
              margin: 'auto',
            }}
          />
        </motion.div>
        <motion.div variants={getItemVariants()}>
          <marquee className={styles.marquee} behavior="scroll" direction="left" scrollamount="8">
            <h1 className={styles.title}>H̴E̸X̷A̧G͏O͏N̷ 𝔚EA̴P̵O̷N̸ ̲S͘YSTEMS</h1>
          </marquee>
        </motion.div>
        <motion.h2 className={styles.subtitle} variants={getItemVariants()}>U̴nm̷a̸n̴n̶e̵d A̴e̷r̴i̴a̷l̵ ₩₳Ɽ₣₳ⱤɆ D̴i̷v̶i̵s̵i̸o̴n̵</motion.h2>
        <motion.div 
          className={styles.servicesList}
          variants={getContainerVariants()}
        >

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.h3 
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('drones')}
            >
             [{"(·) + (·) + (·)  ∴ "}]
            </motion.h3>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- UCAV "S̴p̷e̶c̸t̴r̴e̷-9": A̸t̴t̸a̸c̷k̸ and r̴e̸c̴o̴n̸...a̴i̶s̴s̷a̸n̸c̷e̶ p̴l̷a̸t̴f̸o̵r̴m̸.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- L̴o̴i̸t̷e̵r̸i̸n̷g̷ ̴M̶u̵n̸i̵t̷i̸o̷n̸ "V̴i̴p̵e̴r̴ ̵S̵t̸r̴i̶k̴e̷": K̵am̵ik̴az̴e d̸r̷o̴n̸e̷ f̴o̴r̸ p̷r̸e̶c̸i̶s̵i̵o̵n̵ s̸tri̶kes.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- VTOL N̴a̸v̴a̵l̴ D̵r̵o̶n̶e̸: F̵o̴r̶ s̴h̸i̸p̸-̸b̴a̶s̸e̶d̵ o̸p̴e̶r̴a̸t̸i...ns.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Hea̷vy Ca̸rgo "G̴o̷li̶ath": Lo̵gis̸tic su̴pport f̴or fro̸ntli̴ne r̸es̵upply.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- S̸t̴r̴a̷t̴o̴s̴p̴h̸e̵r̵i̵c̸ S̴u̷r̴v̶e̷i̶l̷l̵a̷n̶c̴e̵ "S̸e̸n̷t̶i̶n̵e̷l̶": L̸o̵n̴g̴-̴e̴n̵d̷u̴r̵a̶n̶c̴e̴ I̷S̸R̴ p̴l̸a̷t̶f̴o̷r̸m̶.</motion.li>
            </motion.ul>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('drones')}
            >
              A ✛ ... 
            </motion.button>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.crypticText} variants={getItemVariants()}>
                <WaveText 
                  text="̴T̵h̸e̷ ̷w̵h̵i̸s̶p̵e̸r̸ ̷o̴f̴ ̸s̸t̵e̷e̴l̷ ̵w̷i̴n̸g̸s̸.̸ ̶A̵ ̵s̵i̵l̷e̸n̸t̵ ̷s̸c̸r̵e̴a̴m̸ ̵i̴n̸ ̸t̵h̷e̵ ̴u̸n̷s̷e̸e̴n̴.̸ ̸N̵o̷ ̸f̶e̸a̴r̴,̸ ̸n̸o̷ ̸p̸a̵i̷n̴,̵ ̷j̸u̴s̷t̵ ̸c̸a̸l̷c̷u̵l̷a̷t̴i̵o̸n̵s̵ ̸i̷n̸ ̸t̸h̸e̴ ̷v̴o̸i̸d̴.̵ ̶E̸c̷h̷o̷e̵s̴ ̷o̸f̷ ̷a̵ ̷l̷o̴s̷t̵ ̷s̴k̵y̴,̸ ̸t̵h̵e̷ ̴h̵u̸m̷ ̵o̷f̷ ̷f̵a̴t̸e̸ ̴u̸n̷f̵u̸r̵l̴i̴n̸g̸.̵ ̷A̴ ̷d̵i̸g̷i̴t̴a̸l̴ ̷h̵e̷a̴r̵t̷b̵e̷a̸t̷ ̵t̵h̴r̵o̸u̶g̷h̸ ̷t̴h̵e̴ ̷f̸r̵a̷c̴t̶u̴r̷e̷d̷ ̵a̸i̴r̶,̵ ̷s̸h̷a̵t̸t̵e̵r̷e̶d̵ ̷i̶m̶a̶g̶e̸s̵ ̷o̸f̴ ̸w̷h̸a̸t̵ ̸w̸a̶s̵.̵ ̴I̷c̶e̵ ̷i̸n̵ ̷t̴h̵e̵ ̸v̶e̵i̸n̵s̸,̸ ̷e̷l̸e̷c̴t̸r̴o̴n̸s̴ ̷d̷a̸n̶c̴i̷n̵g̴ ̷t̷o̵ ̷a̵ ̵w̵a̴r̴ ̴d̸r̷u̵m̵.̵ ̶C̵o̸l̷d̷ ̵l̵o̸g̶i̶c̷ ̸e̸a̸t̴i̴n̸g̸ ̸t̵h̵e̴ ̷s̸o̷u̴l̵s̴ ̵o̴f̴ ̷t̴h̷e̷ ̵g̵h̸o̸s̷t̸s̷ ̵t̵h̴e̶y̴ ̷c̸h̵a̷s̴e̴.̸ ̸N̸o̵t̴h̵i̸n̶g̸ ̷t̸o̸ ̴f̸e̴e̷l̴ ̴b̵u̴t̴ ̸t̷h̷e̷ ̴w̴e̵i̶g̶h̶t̷ ̷o̸f̷ ̷t̷h̷e̴ ̵n̵e̴x̸t̵ ̷c̷o̵m̸m̸a̸n̵d̴.̵ ̴A̷ ̴b̵r̴o̷k̵e̷n̴ ̸s̷o̵n̴g̸ ̵o̵f̵ ̷p̵o̸w̴e̶r̴ ̷i̸n̴ ̸t̵h̸e̷ ̷c̸o̴d̴e̵.̵"
                />
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.h3 
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('pilots')}
            >
             [{"|Void Sector|  >>  Map  [ >|<X>|< ]"}]
            </motion.h3>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Tr̴ai̸ni̷ng: Ce̴rti̸fi̵ed UCAV Op̴er̵ato̵r C̴ou̸rse.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- S̵i̴m̶u̶l̴a̵t̸i̸o̶n̷: "W̷a̴r̶S̷i̸m̴" v̵i̶r̵t̴u̶a̵l̶ r̸e̴a̷l̶i̸t̵y̴ en̴vi̸ronm̵en̸t fo̸r j̴oi̵nt f̴orc̷es t̴rai̴nin̸g.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- In̴t̷e̷r̵f̸a̷c̶e̵: B̸r̵a̵i̸n̵-̸C̸o̸m̵p̶u̷t̷e̴r̷ I̷n̶t̵e̵r̸f̸a̴c̵e̸ (B̵C̸I̸) f̷o̶r̶ a̶d̸v̵a̷n̶c̴e̴d̶ d̴r̴o̷n̸e̷ c̸o̸n̷t̴r̶o̷l̶.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- C2 Sof̴twa̸re: "AURA" A̴I-p̴ower̸ed c̸omman̵d a̷nd c̴ontr̸ol f̷or b̵attl̸efie̴ld m̴anag̸emen̷t.</motion.li>
            </motion.ul>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('pilots')}
            >
              ;;;✠-32 + ✠ ✠ 
            </motion.button>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.crypticText} variants={getItemVariants()}>
              ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⣶⣶⣴⣦⣄⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⠿⣿⣿⣿⣿⣿⣿⣷⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⠁⠀⠀⠀
⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀
⠈⢻⣿⣿⣶⣦⣤⣀⣴⣶⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀
⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣟⠀⠀⠀⠀⠀
⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀
⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⢻⣿⣿⣟⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⠀⠀⠀
⠀⠀⠀⢸⣿⣿⣿⣮⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀
⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀
⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀
⠀⠀⠀⠀⠉⠛⠿⢿⡿⠿⠟⠉⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡅
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⢻⣿⣿⣿⡿⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠁⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣷⣆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠛⠿⠿⠿⠿⠛
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⣿⣿⣿⣿⣿⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠉⠛⠻⠿⠿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⠿⠟⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.h3 
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('tanks_vs_drones')}
            >
              Maullidos acartonados en los escombros.
            </motion.h3>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Ac̸ti̵ve D̵efe̷nse: "A̵eg̵is" a̴uto̷ma̴ted tu̷rre̷t wi̵th f̴rag̸ment̵atio̷n m̴uni̸tio̵ns for̸ dr̸one i̸nte̴rcep̵tion.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- El̷ect̵ron̶ic Wa̸rfa̴re: Veh̴ic̵le-mo̸unt̶ed ja̸mme̷rs a̵nd s̴poof̵ers.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- In̴tegr̵ati̸on: P̷air̵ing a̶rmo̷red v̵ehi̸cles w̸ith t̵hei̷r o̵wn "h̴unt̷er-k̷iller" d̸ron̵e esc̷orts.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Re̷se̸ar̷ch: Ca̴mo̴ufl̸age ma̵te̵ria̸ls t̸o r̵edu̸ce t̷herm̸al a̴nd e̴lect̸roni̵c s̷igna̴tur̴es.</motion.li>
            </motion.ul>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('tanks_vs_drones')}
            >
              F.-^^^^/--___ A.33
            </motion.button>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.crypticText} variants={getItemVariants()}>
                <WaveText 
                  text="̴T̵h̷e̴ ̷g̷r̸o̴a̵n̷ ̷o̸f̷ ̷i̸r̷o̴n̸ ̷a̷g̵a̴i̷n̶s̴t̵ ̷s̷i̶l̴e̸n̸t̴ ̷s̸h̴a̶d̴o̴w̸s̷.̴ ̷A̵n̴ ̷e̴t̶e̸r̸n̵a̴l̸ ̷d̵a̸n̸c̷e̸ ̷o̴f̸ ̷m̴e̸t̷a̸l̴ ̷a̸n̵d̷ ̷g̵h̷o̴s̴t̵s̷.̸ ̷N̸o̴ ̷r̷e̵s̵t̵ ̷f̸o̴r̴ ̷t̵h̴e̷ ̷w̸e̸a̷r̸y̷ ̷m̷a̵c̴h̷i̵n̴e̸s̷,̸ ̷o̴n̵l̸y̴ ̷t̴h̵e̴ ̷c̴o̴l̴d̸ ̷e̴m̵b̸r̵a̴c̵e̴ ̷o̸f̵ ̷p̸r̵e̴d̷a̷t̴o̴r̴y̴ ̷s̵k̸y̵.̸ ̷E̸c̴h̸o̷e̷s̴ ̷o̴f̷ ̷t̸h̴u̷n̷d̵e̶r̴ ̷a̸n̴d̷ ̷w̷h̴i̸s̸p̸e̷r̸s̴ ̷o̴f̸ ̷e̷l̸e̷c̴t̸r̴o̴n̸i̷c̴ ̷f̷a̸t̴e̸.̸ ̷T̷h̵e̷ ̷f̷u̷t̷i̶l̵i̸t̴y̷ ̷o̷f̴ ̷a̸r̸m̵o̴r̸ ̷a̴g̷a̵i̷n̴s̸t̴ ̷t̷h̴e̴ ̷u̴n̸s̷e̵e̴n̴ ̷t̵o̴u̴c̷h̸.̴ ̷F̴r̸a̴g̴m̸e̴n̴t̴s̴ ̷o̵f̴ ̷p̷r̵i̷d̷e̸ ̷s̷h̴a̴t̴t̸e̸r̴i̶n̵g̴ ̷u̴n̸d̵e̶r̷ ̷a̵n̸ ̷i̸n̵v̸i̷s̶i̶b̴l̶e̴ ̷h̵a̵m̴m̴e̸r̴.̸ ̷A̵ ̷s̸c̸a̸r̷r̷e̸d̷ ̷l̷a̵n̷d̷s̵c̸a̴p̸e̷,̷ ̷w̵h̸e̶r̸e̴ ̷e̸v̷e̵r̷y̸ ̷b̴r̶e̴a̸t̴h̸ ̷i̷s̷ ̷a̸ ̷s̵e̶a̴r̸c̸h̴ ̷f̸o̵r̸ ̷t̷h̵e̵ ̷n̷e̷x̸t̸ ̷s̴t̷r̵i̷k̷e̴.̸ ̷N̸o̵ ̷v̴i̸c̸t̴o̵r̵y̷,̴ ̷n̵o̴ ̷d̷e̵f̵e̸a̶t̷,̴ ̷j̴u̷s̵t̴ ̷t̷h̸e̴ ̷e̸n̵d̶l̴e̸s̶s̵ ̷c̸a̴l̴c̷u̴l̶a̸t̸i̷o̷n̸ ̷o̷f̴ ̷s̴u̴r̴v̴i̸v̴a̸l̴.̸ ̷A̴ ̷m̴u̵t̴e̵d̴ ̷e̵x̷p̴l̸o̷s̸i̸o̴n̵ ̷i̸n̴ ̷t̴h̷e̷ ̷c̸o̴r̴e̴.̸"
                />
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.h3 
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('anti_drone_strategies')}
            >
              [{"∇-·-∇ |=<|>| -/·-/ <|> ||··"}]
            </motion.h3>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Ma̶n-P̵ort̴abl̶e: "H̵ELIO̴S II" h̵and̴hel̴d d̴irect̵ed en̸ergy w̸eap̴on (l̷as̵er).</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- S̸I̷G̴I̴N̶T̸: P̴e̷r̶s̷o̴n̷a̴l̷ d̶r̷o̸n̸e̸ d̶e̵t̵e̶c̶t̵i̴o̶n̸ a̸n̶d̴ s̸i̴g̸n̶a̵l̷ i̵d̶e̸n̸t̸i̵f̵i̸c̵a̶t̷i̵o̵n̷ u̶n̴i̵t̶s̴.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- Tr̵ai̶nin̸g: C̸our̴se on i̵de̵nti̶fyin̷g a̶nd co̴un̸teri̶ng d̴ron̴e th̸rea̷ts i̷n t̷he fi̴el̷d.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- A̷u̶g̸m̷e̶n̵t̷e̴d̷ R̴e̸a̵l̴i̴t̶y̸: I̴V̷A̵S̷ G̵e̶n̶ 2̶ s̵y̴s̶t̶e̸m̵ w̴i̵t̵h̴ i̸n̶t̶e̶g̵r̶a̷t̴e̵d̶ d̸r̶o̶n̴e̷ t̷r̸a̴c̵k̵i̴n̴g̴.</motion.li>
            </motion.ul>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('anti_drone_strategies')}
            >
              X-.2';..
            </motion.button>
            <Image
                  src="/image/dron pic 2.png"
                  alt="Drone Strategic Display"
                  width={600}
                  height={400}
                  style={{ objectFit: 'contain', marginTop: '-20rem', marginLeft: '23rem' }}
                />
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.div variants={getItemVariants()} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              </motion.div>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.p 
            style={{fontSize: '6px',}}
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('nightvision')}
            >
              BB#BGBBB###&&#BPB#BGGPYYYY5GGGGPP5P##BGGGGPB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BPPPPPPPP555555YYYYJJJ??????JJ55GBBB###GB######&&&###&&&##BBBBB#BBP5YJYJYYYJYY5PBPG&&&#&&&&&&&&#####&&@@&&&&&&&&@@@@@&&###&@&&&&&&&&@&&&&#######BGGGGGGGGGGGGGGGGGGGGGGGB#########BGB##BBBBBBBBBBBBBBB###&&&&&&&&&&&&&&&&@@@@
              GGGBBGGBBBBBBBPPG##GG5Y5PGB&##BGPGGGBBBBBGGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&#P5PPPPP555555YYYYJJJ?J???JPBBBBB###&&&#GBBBGGGGGPP5PP5555PPPPGGBGPBBGGP55YJJJ55PG5G#&&&&&&&&&&#####&&@@&&&&&&&&&&@@&&#GG#&&######&&&&&&&&#####&&&&&&&&&&##BBBBBBBBBBBBB##BB##&&&#BGGBBB#BBBBBBBB#BBBBBB##&&&&&&&&&&&&&&&@@@@
              B#BBBB#BGBBBBB5Y5GPYY5YG##BBBGBG555PGBBBBGG#&&&&&&&&&&&&&&&##BBBB#&&&&&&&&&&&BG#B555PP5555555YYYJJ?J?J??PGBB##GBBBGB&&#5PPPPPGGGGBBBBB#B##&###&#B#BB&&##BPYJYY555BGP#&&&&&&&&&#####&&&&&&&&&&&##&&&&&B5P#&#GGGGBB#####BBGGGBGGGB###&&&&&&&&&&####&&&&&&@@&&&&&&@&&&&&&&&&&&&&&&&&&###&&&&&&&&&&&&&&&&&&&@@@@
              ####BB###GPPPPP5PGY5Y5P#BBGBG55YJJ5JJ55GBB##&&&&&&&&&&&&&&&&&#BBBBB###&&&&&&#55B&BPP5555P5555YYYYJJJYPGG#&###BBBGBB#&&##&&&&&&&&&#&&&&&&&@@&##&&#BPYPB#&###G5YY5PP##5G&&BGB#&&###B#&&&&&&&&&&&###&&&#BPG##BPPPPGGB#BBGGGBBB####BBGBBBBBBBB#########BB#&&&&&&&&&####&###&&&&&&&&&&&&&&&&&&&&&@&&&&&&&&&&&@@@@
              ####GPBB#G5PGG5YY5YY5GBGGGPPYJJ?J5GPG#BBGG&&&&&&&&&&&&&&&#&@@&&&######&&&&&#G55PG##BP55P5555YYYJJJ5B##&&#B#######BBBBBB#&@&&&&&&@&@&@&@&&#P5PPP55YYJ??YPGBBBBP5Y5PGBBPBGY?75#&&###&&@@&&&&&&&#BB#&&&BB#&&#GPPPPPPGBBBBB##P?JG&&&#BGGGGGGGBBBBBBBBBB##&&&&&####BBBBBBBB##&&&&#####B#########&&&&&&&&&&@&&@@@@
              ##BBGGBG5PGBBBBBBGBBBBGGGP5JJJ??P#BB#BGBB#&&&&&&&&&&&&&&#B#@&#BPPPP5PP###&&B555PPPB##BGP55YYYJJJYG&&&&#BGP55PP5555YY5Y5B#@&&&###B#BBBBBGGGYYYY55YJJYYJJ?JYPGGBBG55555YPPPY775B&&#&&&&&&&&&&&&#BB#&&&##&&#BGPP55PPG##BBB&&#GGB&&#&#BBBGPGBBBBBBBBGB##&&&&@&#BBBBBBGBGB#&@&&&&#BBGBBBBBBGBB#&@&&&&&&&&&&&&@@@@
              #&BGGGBP5PBBGGB#&&&&###BGP555YYP#BGGBGGB&&&&&&&&&&&&&&&&&&&&##PPBB##BGYG&&#BGP55PPPPG###BP5YYY5G##BGPP5YJJJJJJ?JJJJJJYYPB##BP5Y5YGGGGGGGGBP5P55GYJJJY5YYYJ?J5PGBBGPYYGBBBB5?Y5B&#&&&@&&&&&&&&&##&&&&&&##BGPPPPPPPG##BGB#&&@&&#B##BB##BGB#BBBBBBBB#&##&@@&@#BB##BBBBG###&&@@@&#BBBBBBGGGGB&@@&&#&&&&&&&&&@@@@
              B#BGBGB##BPGBBBBBBB#&&#&#BGB#BBP5PPPGGG&&&&&&&&&&&&&&&&@@&&##PPBB#BB#BGG##BGGPPPGGPPPPGBB#BGGB#G5YJJJJ?????????JJJJJJJY5GB##PY5BBBBBBBBBBB##&G5P5YJJYYYYYYJJJJYPPGGG5G#####BBPB&#&&&&&&&&&&@@@&&&&&&&&##BBGPPPPP5PGB##BBB#&&BYJ5GB###BBB########B#&&&@@&&&#B#&###BBB#&&@&@@&######BBBGGG#&@@&##&&&&&&&&&&&&@
              BB#BBGBBBBGBBBBBB#&BGGB####BBBB5PBPPPPB&&&&&&&&&&&&&&&&&@&&&&PYGGBGBBPPP#&BGGPPP55PP5555PB#&##B5YJJ??????????JJJJJJJJJYY5B&#GPG############B####BB5JJJYYYYYJJJJJ5PPPBBGG#&##BG#&&&&&&&&&&&&@@@@@&&&&&###BBGGP55555PGB#&####BBBBB#&&&##B##&########&&@@&&&##&&&#######&&@&&&#########BBBB#&@@&##&&&&&&&&&&&&@
              GBBB#BBBBBBB#####B#BBB###BB####&GG#BPPB&&&&&&&&&&&&&&&&&&&&&##PJPG555YB##&#BBGGBGPYYY5PG###GPPPGBGG5JJ??????JJJJ?JJJJYYY5GB#####BGGPP55555555PGBBBY??????????JJJJY5GGBBBGGB#&&&&&@@@&&&&&&&&&@&&&&&&####BGGGPP55555PGB#&&&&&&&&&&@@&&&&&&&&&&&&&&&##&&####&@@&&&##&###&&&&##&&&&&&&&#####&&&##&&&&&&&&&&&&&@
              BGGBB#BGPGGGGB##BGBB#B#&&#BBBBB#BGBBGPB&&&&&&&&&&&&&&&&&&&&&&&##BGGGB##&&&&&&GB&#BYYPGB##G555YY555PGBGPYJ????J???????????JJY5PGP5YJJ?JJJJJJJYYJJJ????J?J?JJJJJYJYYYYPGBGPGGB&@&&&@@@@&&###&&&&&&&&&&&###BGBBGPP55555PPB#&&&@&&@&&@@@@@@&&&&&&&&&&@@&&&&&@&@@&&&&&&&&&&&&&&&&&@&&&&&&&&&&&&&&&&@&&&&&&&&&&&&@
              #BBBGGP5PPPP555GGB#BGGB#BBBBBGB#BGGGGB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&&&@@&BPB&#GGBBBBG5YYYYJYYYJJJJYPGGPYJ?77?????JJJJJJJY5PPB#PJJJJJ?JYYJY5J?J?JJJJJJJYY5P55555Y5PGG5JJ5555555PGBBB&###&&&&&&&&&&&##BBGGBBGP555555PPGB##&&&&&&&@@&&&&&&&&&&&@@@&@@@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@
              BBBGP555555YY5PGPGBBBGGPPGPPGGB#BBBBGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@&&&&&&B5PBGBBGPPPYJYYJYJYYJJYJJJJJJYPGGPGGGGGGGGGGGBBBBGY555JYJ??JJYY5Y55GBB#BGP5YYYJ?7!777!!!!!7!!77?77???JY5Y5&&&&&&&&&&&&&&&#BBBBGPBBGP555555PPGBB##&&&&&&&&&&&&&&&&&&&&&&&&@@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@
              PGG5Y5P5GGGGPPGGPGGGGBBGGP5PPGGGBGGGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@&#BBP5PB#GPPP5YYYYYYY5YYYYYY55YYYYPP5PB#######&&&&&##B55GG5YYY555YYY5BG5P5YY5J!!7!!7!77777777777?YY55555PPPGGB&&@&&&&&&&&&&&&&#BGBGPGBBGP555555PPGBB###&&&&&&&&&&&&&&&&&&&&&&@@@@@@@@&&&&&&&&&##BBBBBBBB########&&&&&&&&&&&&&&&&&&&@
              PPPJJY55GPPGGGGBGBGGGGPGP555GBBBPPBGP#&&&&&&&&&&&&&&&&&&####&&&&&&&&&&@@&BGPPG#&####BP55Y????YY?????????JJJ?J555PPPPGGBBBBBB#GYP###G5YY5YY5G#&BYJ?77??7777777??????JJJJJY5YJ5B#####&&@&@@&&@&&&&&&&&&&#BBGGGPGBBGGP55555PGB#######&&&&&&&&&&&&&&&&&&@@@@&@@@@&&&&&&&#BGGGPGGGGGGGPGBBGGBB#&@&&@&&&&&&&&&&&&&
              GPPPPGGPPPPPPGGBGPGGGGGGGP55GGGB###5G#&&&&&&&&&&&&&&&&&&&#####&&&#&&#&&@&&#BB&&##BGGYJJJJ!!!!!~!!!7!!!!!77??JJYY5555555YYYYJJJJ5B####BBGGB#&&#GYJ????JJYYYY5555PPPPGGPGGGBBB###BB###&@&@@@@@&@&&&&&&&&&##BGGGPGBBBGGP555PGB###BBBBB#######&&&&&&&&&&@@@@&@@@&&&&&&&&BGGBGGPYYYJ!!!75##GGB#&&&&&&&&&&&&&&&&&&
              5P5Y??YY5PP5PGGGPPGBBG55PP5PP##BBBPP&&&&&&&&&&&&&&&&&&&&&&###&&&&&####&&@@&##&&#GP##5??YPYYYY55555Y?7777777777777777??77777???JYGBGGGBB#B###BBGP5PPPGGGBBBB#####&&&&&&&&#&#BPPGBGPPPPGBB##&&&######&&&&&&#BBGGGGBBBGPP55PGGBB#BBB##&&#####&&&&&&&&&&@@@@&@&&&&&&&&&#BGGBGGPGGPJ~~~!JBBGGGB#&&#&&&&&&&#&&&&&&
              PPY5Y??J5PGB###BBBBGGGPJY5PG##BGBBPB@&&&&&&&&&&&&&&&&&&&&&&#&&@@&&&####&&@@&&#BG#&&&BBBBBGGGGBGYJY555555PPPPPPPPPPPPPPPP555PPPPGGGGB##&&&&#GPGB#&&&##BBBBBBB#&&##&&BB###BGYYYY5Y???J?J5GGGGPGBBBBBB#########BGGPPGGGGGGPPGGPPPPGB#&&&&&&&&&&&&&&&&&&@@@@&&&&&&&&&&&#BGGBGPGGBGY!~~!JBBPPGG#&&########B######
              BGBBG5JJYYYGGGGBBBGPPGGPPPG##BGBBG&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@&&##&&&&&&&##&@&&&&&&&B5Y5PPPGGGBB#&&#&&&&&&&&&&&&&#######B###BGGGGB#&&#GPPGB##BGGPPYJJYJJYY5PPBBBGGGGG5JJJJJ77?J7?5B#&&&&#P5BBB#BB########BGGGPPGGBBBBGGPPPPPG#&&&&@@@&&@&&&&&&&@&&&&&&&&&&&&&&&&#BBGGGPPPPPY????5GG5Y5PGGGBBBBGGGGGGGBBB#
              5GG55PPP55PGPYYY55PP55B&BGGBBBBBGB@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&#B&@&&#GGG##BPPGGGPGGB##&&#&#&&&####&&#BGPP555YYYPGBGPPGBGB##BGGB##B5555Y?7J5PPGP5YJJ5PPPPPGYYJ5Y5J??J77PBGGB#&&&#55#BBBBBB######BBGGPPGGGGGGGGGGGPPGB&&&@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&#BBBGGBGGPPPP5555PPP55555Y555555YYYYYYY555
              PGGP555PPP5P5YYP5PGBBBBBBB#BPGBBGG&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&##@&B#GBGGPP55YYY5555Y5PPB#BPG###GPBBP5YYYJ??YYY55YY5PPP5PGB#BGB##P5YY5?7YBGB&&###&#5J555PP5YY5555JJJJ?JBBBBB#&&&&GYB##B#BBBB###&#BBGGPPGGPP555PPPPPPGB#&&&@@@@@&&&&&&&&&&&&&&&&&&&&&&&#GPPPG#BBG5PP55555PPGGP5JJ??77777!!!77??JJ
              GGPPGGPPPGGGGGPGPPP55PPGBBBBGBBBGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BBB#GYYY5YYJ??77JJYYYYPBGPGGPPPP5Y5Y??JPBB&&&&&#G555YYY5B#BBBB5555Y?5#BYG&&#BG#&&PY55GGG555PPP5Y55JYB###B&&B##YY####BBBBB#######BGP55PPPP55Y555PPGGB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#GPPPPB##BPPPP5PPGGPBG5JJJ?77!!~~^^^~~!!77
              PP55P5P55PGGGGP5YY5YYY55GB#BBBBGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&###&&&&#BB55G#&&#BGGGY?J?Y5J5Y5BP55PPP55P5J?P##PY####B#&#PYJJJYP####GPPGPJY#&###&&&#BB#&#Y5PPGBGBPGGGGGPPPYP####&##BYJG#BBBBBBBB#######&#BG555PGGPP5555PPGBB###&&&&&&&&&&&&&&&&&&&&&&&&&&&#BGP55PG###BBGGGBBBGBG5YYYJ7~^::......::^~
              PPPYYYJJYPPPPP55YYJY5YYGB###BGGGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###&###&&&#&#YP#&&&##B5YP#GJ?YYG5PYGB5555PYPG5YY#&&#&&&&&BB#&#5YJY55G####PPGG5J#&#&&&&&#BB#&PY5PPPB#BBGBBBBBBGG55B###G5JJG#####BBBBBBBB##BB#&&#GPPPGB#BGGGPGGBB####&&@&&&&&&&&&&&&&&&&&&&&&&&&##BGPPGB#&&&#####BBBBGPP5J?7^:............
              5GGPGBBP5P55YY5JJYJJGBBB####BBGG&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#B#&&##&GJ#&&&&&&&&&&&&PY5YP5GYB#PP5PP5PPP55&#&&&&&&&###&#YP5YP5PB&#&#GPGGYY#&&&#####BBGYPGGGG##&&#BB#####&#BPP5555G##BB####BBBBB############BBB##&&########&&&&&@@&&&@@@&&&&&&&&&&&&&&&####BBBBBBB#&&&&&&&###BBG5YJ?!^.............
              PGPPP55PP5J?JYYYJ5B#####BBBB##GPG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&B#&&&&#&GJB#&&&&&&&&&&&G5PPBGBG#BP5555PGGGGJ5&&&&@&&#####P5BBBGGG#&#&&#GGBBG5PGGGGBBBP55B&&&&&&&###&##B#########B######BBB##BBBBBB##################&&&&&&&&&&&&&&@&&&&@@&&&&&&&&#GGGPGB####&&&&&&###&&&&#####BBP5YJ?!~:............
              GBGPYJJ5YYJJYYJ?7YPGPBB######BBBGG&&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&#&&&###5YB#&&&&&&&&&#5PGGB#G##GP5555PGBGBG55GBB#&&#BP55G&##BBB#&&##&&&#BB##BGP55555GB&&&&#&&#G5Y5####BBBBB############BB#####BBBBBBB#######&&###BB##&&&@@@@@@&&&&&&&@@@&&&&&&##GPGP55PB##&&&&&&&@&&@&&#BBB###BGP55Y?7~^::...:::^^~
              BGGG5P5Y??77?!~~~YGPPPB#BBB#BBB##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&#&&&&&&#PJ5GGG#####B5P##&#BB#BB######&&#BB#BG555PP55PG#&#&#BB###########BBB#&&BG55B&&&&&####BPYJPBBBBBB#######&&##############BBBBBBB######&&&&####&&&&@@@@@@@@@@@&@@&&&#&&&########BGBB##&&&#B#&&&&#BGGB#&##BBGGP5YJJ?7!!~~~~!777
              GGGPPP5YJ?!!!~~~JGGGGGBBGGGBBB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&###&&##BGB#G555PP55PGB#&#G5GGPGGB####&&&#&BBBB##BBBBB#BGPPPPPGPGGB#BBB#BBGG#&&#GP5YG#&&&#######P?PBBBBBBB#BB#####&#########B####BBBBBBBBB#BBBB##&&&&&&&&&&&&&@@@@@&&&&#BBBBBB##&&&#BGPGGPPG##GPPB####BBBB##&&###BBGGP55YYJJJ?????JY
              GP5J?77J5PY7!!7?PGB#BBGGBBBGGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#B#&&GYYJP#&&#BBGPB#&###PYYPBGPGBBB########BBB#####BB##################BBB#&&BGGP55G#&&&&&&&##&#GBBBBBBBBBBBBB######&##&#########BBBBBBBBB########&&&&&&&&@@@@@@@&&##BGGGPPPGB#&&&&#####BGB#G5PB##BGGB##&&###&##BGGP555P5YYJYJ??7?J
              5JY55YY55Y5?!!5BBGG##BGPBBBGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&@#GG5YJ5#P5BB#####&&&G555GBGGGBBB##########&&&&BB&#GBBBBBBBBBGGG##B##B#&&#GGGPP5G#&&&&&&&&&&&&#BBBBBBBBBBGGB##B#BPBB###B#########BBBBBBB#######&&&&@@&&@@@@&&&&#BGGGGPPPGB#&&&&&&&&&&&&&#P5G#&#GG###&&&&&&#BGP5555YYYYJYY55JJYY5
              55PPPPP5JJJ7!YGBGP5PBBGPPBBB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BGYJP#GB######&&&&#G55PBBBBGGBBBBBBBBB###B####&GGGGGPPPGGGPJ7P#BB#B#&#GGGBPPPG#&&&&&&&@&###BB#BBBBBBBBBGGBBB#PG#BGGBB############BBBBBBBB###&&&@@@@@@@@@&&##BBGGGGGGB##&&&&&&&&&&&&@&#PPB#BBB#&&&&&&&&&#BGPPGGG5YY555YYYYYY5P
              GP55PPYJJJJJ5#BBB####BGGBGB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BGGB#&&&&##&&&&&&&BP5PG#BBBBBBBBBGGBBB#B5PG##&BGBBBBBB#BBGY?5#GB&B#&BGBBBPPPB&&&&&&&&&##########B##BB#GGGGBBB&#BBBB#######################&&&@&&&&&&@@@&&&###B######&##&&&&@@@&&&&&&###&#BB#&&&&&&&&&#B#BPGBG5YPPP5Y5PP5Y7JY
              BBGGP5JJJ??PBG5GBBB##BGBBGG&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@@&&&&&&&&&&&&&&&&&&#BP5PG##BBBGGBBGGPPG&&&&#BB&GG#####&###B5?Y#BP###&&#BBBGPG#&&&&@&&&#################B##BBB&#BB#BBBBBBBBBBBBBBBBBBBB###&&&&@@&####&&&@@&&&&&&&&&&&&#GGB#&&&&&&###&&&&&&###&&&&&&&&&##BBBGBBGPPGGP5YJJ5PGP??
              BBB5YJYYJ?YBBGGGGGB##GPPGGG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@&&&&&&&&&&&&&&&&&&&&&BGPPG#B#BBB##BGG5G&&#&&BB&GYGBBBBBB&&#PYP#G5G&&BB&GGPGB#B&&&&&&&#####&&###########&###GB#BBGBGGGGGGGBBBB##BBB###&&&&&&&@@&&#BBB##&&&@@&&@@@&&&&&#BGB#&&&#&&&##&&&&##BBB&&&&&###&&#BBBGB#BGBBB5PY?Y55GG5?
              GGP5JJJ??5GGB#GG#&#BGGPPGGPG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@&&&&&&&&&&&&&&&&&@@&&#BBGPPB##BBGGPPPPB&###&BG&#55GGGGGGBGGPPGP5PPB#BPGGGGBGG#############################BBGGGGGGGGBB###&&&&&&###&&&&&&&&&&&&&#BBBB###&&&&&&@@@@&&@&&&&&&&&&&&&&##&&&&&&&&&&&&&&###&&&##BGGBB####P5YY5YJ5GYY
              P55555JJ5PGBBBBG##BG555PPGGPG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&########&&&&&&&&&&&&&&&&&&@&&@&&&#BGGPPGB#BGPPPPB#####B5B&GY55YY5Y5YYY55555555YYYYP#BB#############&&###&&#########BB#BGPPGGB#&&&@@@&&&&&&&&#B#&&&&&&@@&&#########&&&&&&&&&&&&&&&&&&&##&&&&#####&&&&&&&&&&&&&&&&&&&&##B######GP5PPPG55G
              55555YPB####GPPGGGPP55YY5Y5PPG#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BBGGGGB####&&&&&&&&&&@@@@@@@&&&&&&##BGPPGB#BBGGGG&#G&#PG&#PPY????J??JJJ?7?JJYJJJJ5GPB&###BB#########BBBBBGGGGGG###B###BGGGB#&&&&&&&&###&&#BBB#&&&##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##&&&&&&#BB#&@&&&&&&&&##BBBB##&&&&&&&&&&&##BBBBBB#&
              555555GBBB##&GBBPPP55YYYY5Y555#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BBBBBBBB#####&&&&&&&&@@@@@@@&##&&&&&#BBGGGGGGGB&B##B@&B##&#GPY5YYY5Y5555555555555P55P&&&&&&##BBBGGGGPPP555555PPGGGB###BB##&&&&&################&&##########&&&#&&&&&&&&&&&&####&&&&#&&&&&&&&&&&&&&&&&@&&#BGGGPPPPGGGB##&&&@@&&@&&&&@@@
              Y5PGB#BGPGG#&#BBPPPPP555Y5PY5G&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#B##BBGBBB##&&&&&&&&&&@@@@@@&#BBBB#&#BGGGGPPG5P&&&#G#&#&&&#PGGGGGGGGGBBGP5YJ?!7?J555PPGGPPPP55PPGGGPY?777?PGPGGBB#&#&####&&&###BBBBBBBBBB####&&&&&&&&##BBB#######&&&&&&&&&&&###&&&&&&&&&&&&&&&&&&&&&&##BBBBBBBGGGGGGGBB##&&&&&&@@&&&@&
              5GGPP55PGP5GBGP55555PP5P55P55#@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BBB##BBGGB######&&&&&&&&&&&&&BGPPGGB####BGGPPGB&&&&BG&&#&&#PB##B######GJ!777???JJ7!~!7777!!!!!!77?JYJJ??7?YPBB&#BBB#########BBBBBBBBGGGBB##BB########&BBBBB#######&&&&&&&&&&#GB#&&&##B#&&&&&@&#BGGGGGGGGBBBBB#BGGBBBBBBB#####&&&&&&&&&
              55YJYJYY5YYPGPP5P5Y555555YYYGGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BGGB#BGGGGBBG###&&#########&##BGPPP5YGBBGGBBGB#B&&&&##&&&&&&&&&&&&&&#PJ?7??777!!~!~~!!!!~~~~~~~!!!!!~!!7777JPPBBBGB##########BBBGBBBBBBBBBBGGGBB#&&##BGGGPPGB######&&&&&##BGGGB#BBGGPPG#&&&&#BGPPPPGGBBBBBBB######BBBBBB#########&&###
              5YJJ?JJJJJJPGP55PPYY55YYYYJ5#BP#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BGBBBGGGGGBB&&&&&###BBBB#######&#GYJPGGPGBBBB#B#&&&#&&&##&@&&@&&&&&B5JJJJJ!~7777!~~~!!~::^^^~7???JJJYYY5555YY5PB###BB#####&&&BBBBBBBBBBB#BBBBB#&&##BGGPP55PGB###B#####BBGGBBGGGPPPGPPGGB##BGGBGGBBB###BBBBB##BBBBGGGGBB#&&&&&########
              PG5YY555GBBBGP5J555Y5YJJJYP##G#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#GGGBBGGGPPB&&&&##&#BGBGPB######BBPJJPBGGGB#GGGGB#&&##&##&&&&@@@&&&&#55PP5Y!^777?77!!~^::^~~~!!77?JJYY5555YJJ??JPB#&&#BGBB&&&&##BB####B###&&&&&&&&##BBGGPPPGB###BBB#B#BBBGBBBGPPGGPPPPPPGGBGGBBBGGGGBB####BBBBBBGBBGGGGGB#######&&&&&&
              PYJYYJJJY555Y5YJYYYJJJJJYP#BGG&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&BGPPGGGBBGB#&&&&#####BBBGBBBBBBGGBBBB##&&&&#BB#GB#BB##&&&&##&&&&##BBGYY55Y??7?!77!!~:::.::::^^~~!7??JJYJ?7!!!~!77?5GGGGGPPG##BBB######B##&&&&&&@@@&##BBGGGGGB###GPGGBBBBBBBBBBGPPGGGGPPPPPGB#&&&#BGGPPPGBB###BBBBBBBBBBBBBBBB###&&&&&&
              PPYYJJYJJJJJJJ?JJYJJ?77YG#BB#&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#BBBPP55PGGP5PB#&#&&####BBBGGGGBBBBB#&##&#&###BBGGGPPPPPG##&&&&&&&&&###BG5555555?7!!!~^::........::.:~!77???!!77JY5YYYYYYY555PP5Y55555PGB#BBBB##BBBB####BBGBBGGB###BGPPGGPGB#######BPPGGGGGPPPPGB&&&&&###BBGPPGB#########B#######&&&&&&&&&
              5GPP5YJJYJJJJJ?JJJ??775BBBBB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&##GPGB###G5PP55PPPG#&&&&###BBGGGGGBBGPPB####BBBBBB5YYJJJJYPBB###&&&&&&####BBBBGPP555JJ?!~~:..............:~~7?7?77?YPBBBG55YY5YJPBBBGY??JJJJY5GBB####B########BBBBBB#BGGGGGGGGGGGB######BGPGGGGGGGPPGB&&&&#######BGPPGB##########&&&&&&&&&&&&#
              555YYYJ???J???7JJJJY5GBGPGB&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&###BGBBBBB##&#P5555PPPGB&&&&&###BBBBBBGGJ5PPPB#B#####GPP5YY5B#&BGB####&&&###BBBGPPPGBG5YJJ?7!~^^:.............:~?J?JYJJY5GBGPPP5J??YB#BB#B5?JYJJJ?YGBB########&###BGGGBBBBGGGGGGGBGGGB#######BBPPGGGGGGPGGB#&&&###&&###BBGBB#&&&&###########&&&&&&
              P55YJJ??JYJJ?7777YPGBG555PB&&&&&&&&&&&&&&&&&&&&&&&&&&##BBGGGGBB&&BBB#&&#P55555PPGB#&&&&&&&&#BB#BGBB###BBBB#######BGGG&&#GPGGGBBGBBB##BGBGGGGGPGGPPP5Y?7!!~^:............::~!?J5PP555555555J?JY5GGGGGGP5YYJJPGBGYJPB##&##&&##BGGGGB#BGGGGGBBBBBBBB########BGPGGGGGGGGGB&&&&&&&&&&&######&&&&########&&&&&&&&&
              P5YYYJYYYJJJJ??YGBBBPPPGP5PB&&&&&&&&&&&&&&&&&&&@&&#BBGBBGGGGGBB##BB##&&BP5YY5PPPPB###&&&&&&&&&&###&&&&&&#&&&&#&&###B#&#GPGPPGGPPGGGGGP5PPPPGGGBBGGPPP5YJ?7!~^^::^~~^^::::::::^^^!?5YJJ????JY??7?YPGGGGG555Y55P5!^~75B&&#BBBGGGGGBBBBGGGGBBBBBBBBBBB########BGPGGGGGGGGB#&@@&&&&&&&####&&&&&&&&&&&&&&&&&&&&&&
              P5YYJYJJJJJJ??JYB#BBP55PG5YB&&&&&&&&&&&&&&&&&&&&&#BBBGBBBGGGBBB#####&&&&BPPGPPP55PB##&&&&&&####&&&&&##&&&&&&&&&&&&####GYY5PBBPPGGGGPP55555PPPPPGGPPPPPP55YJJ??????????!!~^^~~~^^~!^::^^^~!JY77??77?JY55YYP55YYJJJ7!!Y5GBGGBGGGGBBBBBBBBBBBBBBBBBBBBB########BBGGGBBBGGBB#&@&&&&@&&&&&&&&&&&&&&&&&&&&&&&&&&&&
              P555P55Y5Y?JYGPPGGG5Y5GGPY5B&&&&&&&&&&&&&&&&&&&##BBBBBGB#BGGGB##GPPGBBB#G5G#BP5Y5P#####&&&##&&&&#BB##B##B&&@&@@&&&###G555PGGP5GBBGGGPPPPPPB&#GPPPPPPPPPPP555YYYYYYYYYY5J?JYYY5YYG5!~~~^:::^~^^~~~~~!~!!!!7?5G5YJYYYYYJ?YPGBGGGBBBBBBBBBBBBBBBBBBBBBBB###&###&##BGBBBBBBBGB&&@&&&&&&&&&&&&&&&#####&&&&&&&&&&&
              PPPPGGP5P5Y5G###B#BPPBG5JJPG#&&&&&&&&&&&&&&&&#BBBBBBGBGB#BGGPGBGPPPGPGPPPYYY5PPPGGB####&&@@@@@&#BBB#G5B##&&&&###&######BBP5PPPG#####BBGBGPPGPPGB#&&BGPPGGPPPPPP5P5555YY5G#BBB#&&#GPGGG57!~^^:::::^^^~~~~~~~!75BBY??JJYYJ?JGGGBBBBBBBBBBBBBBBBBBBBBBBBB###&&&#####BBBB#BBBB#&&&&#&&&&&@@&&&&&&&&&&&&&&&&&&&&&
              GGGGG5JY5GP5BB#B#&#B#BP5PGB#&&&&&&&&&&&&&&&&#BBBBBBBBGGB##BGPPGBBPPGGPPGGPYYYYY555G#####&&&&&&&BBB#&#B#&&&###BB#&B#&#&&#&###BGB#########B#BBGGGGBBGGGGB##BBGPPGGGPPPPPPB#BP55YPB&#PYJJJJ?7!!!!^^::::::^^^~^~~!?J7!!!~7??!~75GBBBBBBBBBBBBBB#B#############&&&&#&&&##BBBGBBBB#&&&&&&&&&@&&&&&&&&&&&&&&&&&&&&&
              GGGP5PPY5PPB##&BB##BGGB##B#&&&&&&&&&&&&&&&&#BBBBBBGGGPY5B##BGGPG#BBGGPPGBPYYJYYY5PG#######&&&&#BB#&&&&#BBBB###&&&##&&&#BBB#####B#####B#######BBBBGGGGGBB###GPGBBBGP555G&#BGGYJPG5GPYYJ?J??YP5?7?7!~^^:^^::::^^^~~~~~~~~!7!!~JGBBBBBBBBBB####################&&&&&&&##BBBBBBBB#&&&&&&&&@&&&&&&&&&&&&&&&&&&&&&
              #GGPPGBBGP5GBBGGBBPPG##BBB&&&&&&&&&&&&&&&#BBBBBBGGGGGPPPG###BBPPGGBGGGP5GG5JJJY55PG##########&BB&&&&&@@&&&#&&&&&#GB&&&&#BGGGGGB####&#############B#BGGGGGGGGPG##&&BP5PB&&&BGP5PP5555PPYJ77?YPBBBBPYJ?!~~^^^^::^^^^^^~~~!!!???JGBBBBBBB#########################&#####BBBB#BBBB#&&&&&&@@&&&&&&&&@@@@@@@&&&&&&
              BBGP5JJ5555GGBGBBP5GBBBBB&&&@&&&&&&&&&&##BBBBBBBBBGGGGGPPGBB#BPPPG#BGBBPPGP5YYYYY5P##########&B#&&&&&&@@&&&&&&&#BPG#&##B##BGPPPPPB###&##########BB#BBBGGBGGPYYYYPP55G#&&##G5PPP5Y555GGPP55JJPBBBBBGGGB57~~~~~~~~^^^::^^^~~!7!!!JG#BB#############################BBBB####BBB####&&&&&@@&&&&&&&&&&&&&&&&&&&&@
              5555YJ?Y55PPGB#BP5BBGGBBB&&&&&&&&&@&&&###BBBBBBBBGGGPPGGPPPPGBG55PGBGGBG5PPPPP5555P#########&&#&&&&&&@&&&##&&&&###PJB#PY5BBBBBGGPBBB&&&&&&######B##BBBBB##BP5PP555PBBB#BGPPGGP55555PPPGGGGGGPGBBBGY7JBBP?!!!!!!!!!!~~~^^^^^^^^~~7YPY5B##BB#B##B################B################&&&&&&@&&&&&&&&&&&&&&&&&&&&@
              JJJJJJYYYPPPGGBBPGBGGBBB#&&&&&&&@@&##BBBBBBBG55PGGP5JYGGP5?!75GG55PGBGPBBPBBBBPY55P#########&&&&@&@@@&&&##&&&&&&&#BB##PGGPGPGPGBB###&&&#&#BB####B#####BB###P5GB#&&&&&&BGPPP55555555PPPPPPPPGGPPGGPPY5BBG5PPY?!!!!!7?J77~~~^~~~^~!7??!!YGB##B#BB##############################&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
              ??7777?JJJYPBBGBBBGPPBB#&&&&&&&@@&&###BGB#BBBGPGGPPP555Y?7!7?YG#GPPPGGPPGBBBGBBP55P#######&&&&&&&@@&&####BBBB###&&&&##P#BPGGGPPGGBBPPGGBBGPGBBGGBB#########PPBBB&&&GPPG55PPPPGPPPPPPPPPPPPPPPP5PPPGPGGGGBBBBG5?JJJYY5G5?!77~!7!!!!!!77!!75GBBB###########BB###########&&&&&&&&&&&&&&&&&&&####&&&&&&&&&&&&&&&
              YJYJJ???J555BBBB#BG5PB#&&&&@&&&&##&&&&#BGBB######BBBG5YJ?77YYJ5PGGP55GPPPGGPPGGP55P#######&&&&@&&@&&##BBBB########&##&##BGGGBB##G5Y55PPG5??JYYPGBBGBGB#####GGBBB#&&###BBGGGBBBGGGGGGGPPPPPPPPP55PPPPPPGGGGGGPPPGGGPJY5J77?7!!??YJJJ777JJ7?7YPPPGGGBBBB##BBB#########&&&&&@@@@@@@@&&&&&&&&####&&&&&&&&&&&&&&&
              J??7JY??JYJ5BBBBPGPPGB&&&@@&&&#####&&#&&#BBBBBB##&&####BP555555Y5PGP55PGGBGP5PG5Y5G##&&##&&&&&&&&###BBBB####BBBBB###&#BPPB###&&#GGGPGG5555YJJY55GB###GGB&&&#B##B#&&&&&&&##BB#BGGGGGGGGGPPPPPPPP55555PPPP5555555PPP5PPJ77?77?7JYYY5555J?J5JJ7?5YJ??JJY5PGGBB#######&&&&&&@@@@@@@@@&&&&&&&#BBBB#&&&&&&&&&&&&&&
              J7??77!JYYYPGGBBGG5GB#&&&&&&&&&#######GB&&&#BGGBBBBBBGB&&#BGP55555GBPY5PB#GPP#B555G######&&&&&&&###BGB##&##BB#BB########BB#&&&&###BB#GPGPJJ555YYPGGBBGPGB##&&&&&&@@@&&&&##B###BGGBBBGBGGGGPGGPPP555555YYY5PGB#######GP555???JY555PP55555PPBB55G55J7!!!7?Y5PGB##&&&&@@@&&&&&&&&&&&&&&&&&&#BGBBB##&&&&&&&&&&&&
              YY??????YYYPYGBGGGPB#&&&&&&&&&&####BB#BB#&&&#BBGGGBBBB#&&&##BGGYP###BPPGGBGGBBBBGG##&###&&&#####BB#####&&&#&#B######&&####BB&&&&&&&#####GPGGGGPPGGPG5Y5G#BGB&@@&&&&&&&&&#BBB##BBBBBBBBGGGPYYY5PPGGPP5YY5GB&&&&&########BP??JY5PP5PPPP5PP5PGGP5BBBGGPYJJJJY5PBB##&&&&&&&&&&&&&&&&&&&&&&&#BGPGGGB#&&&&&&&&&&&&
              YYYJ??J??J5PJPGGPPPGB&&&&&&&&&&&&&##BB##&&####GPBBGGGGB##&#&&#BGP###GB#BGGGB#BG#&&&#&##&&&####B########&&&&@&###BB#######&#BGB&&&&&&&&&&#####BGGGP5P5PBBGPYJPG#&&&##&&&&&########BB###BBBG5YYY5PGGGGPPGB#&&&##&&########G5JY55PPPPPPPPPPPPPPPGB##BBBBBGGGGBB#############&&&&&&@&&&&&&&&########&&&&&&&&&&&&
              PP5YJJ???JY5YGBG5PGPPB&&&&&&&&&&&&#####&&&&BB#PJYG#BBPPGB####&&#@&&&GG##BGGB#&&###################BPPGBBB&@&@&###&&#####&@&BGGBB#&&@&&&@&&####BBBGBBGP555P5Y5PB&&&######&&&&&&&&&&#####BBGPPPPPGBBBBBB######&&&&&&#######G555555555PPPPPPPPPPGPG#B####&&&&&&&&&#######BBBBBBB##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
              PP5YYJJ??J555YGGGBGPPB&&&&&&&&&&&&##&&&&#&&BBB#G5PGBBBGGPPPGPPG#&&#BPPBBBBGGB#&BBBB&&&&######BB##BBGGGGGB##&@@&&&&&&##&&&&&#GGGGG#&&&&@&@&&&&&####BG5P5JJPPP55G#&&&&###&&&&###&&&&&#######BBBGGB##B########&@@@@&&#######BP555555PPPPPPGGPPPPPY5&####&&&&&&&&&&&&#&&####BBGGGBBBBBB##&&&&&&&&&&&&&&&&&&&&&&&
              GP5Y??JJY5555PGBBBGGP#&&&&&&&&&&&&&&##&#BB#BGG###GGGBBBBBGGP5JJPB##GP5PB##BGGB#BGGB&&&&#####BBB##BBGGBBGGG#&&&&&@@@&&&&@@&&BGGGGG#@&&&@&&&&&@&&&##&BPPYYPGPY~!P&&&&&&&&&&&#####BBBBGPP55PB####B#############&&&&&########GP5555555PPPPGGGGPGPPYB&&###&@@&&&&&&&&&#&&&&&#####BBBGPPPPPGBB####&&&&&&&&&&&&&&&&
              5555YYYYY55Y5GPGBBBPP#@&&&&&&&&&&&&&##BBGGBBBGG#&#BGGG#BGGBBP?YBB#&##BB#B##GGGBBGB#&#&&##&#B###&######BGB##&###&&&&&&&@@&#BPPGGGB&@&&&&&&&&&&&&&&&&&#G55PPYYYP#&&&&&&&#BBBB##&###BGGGB#GPPB&##B#&&###&&####B###BBBBB####BP555555PPPPPGGGGGGGPYP&&&&&&&&&&&&&&&&&&##&&&&&&&&####BBGP555PPGGGGBB###&&&&&&&&&&&
              PP5YYYYJJYYY55PGBBGPG#&&&&&&&&&&&&&&###BGPPGGGGGB##BPGGGPPGGP55GB&&#&&&#B##BBBB###&##&&#&###########&&#######&&&##&&&&&##BGPPP55PG##############&&&&&&##B#B#&&&&&&&&&&###&&&&&&##BG#&&##&&BPY555PGB##&&&####BBBB#######BGP55555PPPPPGGGGGGGGP5#&&&&&&&&&&&&&&&&&&&&##&&&&&&&&&&&###BBGGPPPPPGGGBBB####&&&&&&
              PP5YYYJ?JJY5PP5GGBGGG#&&&&&&&&&&&&&#####BGGGGGGGPG##BGGGPPPPPGPPGB#&#B#&####BBB#&&&###&#&#########BB##&&&&###&####&&&&&&&&&&##BPGB#&##########&&&&&##&&&@&&&&&@&&&&&&&&&&&&&##&###B&#B#&BP5Y5555555YPGB#&############BGPPPPPPPPPPPGGGGGGGGGGGG&#&&&&&&&&&&&&&&@@&&&###&&&&&&&&&&&&&&&&##BBBBBGGGGGBBB####&&&

            </motion.p>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('nightvision')}
            >
              X-''/7
            </motion.button>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.crypticText} variants={getItemVariants()}>
                <WaveText 
                  text="̴T̵h̷e̴ ̷s̸h̵a̴d̵o̸w̴s̷ ̷t̸h̴a̸t̴ ̷w̷a̸t̷c̷h̴ ̷b̵a̵c̴k̴,̸ ̷e̷m̴p̴t̷y̷ ̷a̵n̶d̴ ̷c̸o̴l̷d̷.̸ ̷A̴ ̷m̴a̴z̴e̵ ̷o̴f̴ ̷l̸i̵g̸h̷t̸ ̷a̸n̵d̷ ̷d̸a̵r̸k̴n̷e̷s̴s̵ ̷w̵h̵e̶r̶e̸ ̷r̸e̴a̴l̵i̸t̴y̷ ̷b̸l̷u̸r̴s̷.̸ ̷N̸o̴ ̷s̵e̷c̷r̸e̸t̴s̵ ̷i̵n̷ ̷t̴h̴e̴ ̷e̷y̵e̸ ̷o̴f̴ ̷t̷h̴e̷ ̷m̴a̵c̸h̵i̸n̵e̸,̸ ̷o̵n̴l̸y̴ ̷t̴h̴e̴ ̷c̸r̵u̵e̴l̸ ̷t̴r̴u̸t̷h̴ ̷o̴f̸ ̷i̸n̷f̵r̴a̸r̴e̴d̷ ̷s̸i̴g̵n̸a̴t̷u̷r̷e̵s̷.̸ ̷E̸c̴h̸o̵e̷s̴ ̷o̴f̷ ̷t̸h̴e̷ ̷h̴u̷n̴t̷e̵d̴ ̷i̵n̷ ̷t̴h̴e̴ ̷g̵l̴i̴t̷c̴h̴i̸n̴g̴ ̷v̴i̸s̷i̵o̴n̵.̸ ̷T̸h̵e̴ ̷f̷u̵t̴i̸l̵i̴t̴y̷ ̷o̵f̷ ̷h̸i̴d̴i̵n̵g̸ ̷f̸r̵o̶m̸ ̷a̸ ̷s̸e̵n̴s̷o̴r̴ ̷t̸h̴a̸t̷ ̷s̸e̴e̷s̸ ̷a̴l̷l̸.̸ ̷F̵r̸a̴g̴m̸e̷n̴t̷s̴ ̷o̵f̷ ̷p̴e̴a̷c̷e̵ ̷d̸i̴s̷s̴o̴l̷v̴i̵n̸g̴ ̷i̸n̴ ̷t̴h̴e̴ ̷g̷r̴e̷e̸n̴ ̷g̷l̴o̴w̵.̸ ̷A̴ ̷d̵r̸e̵a̴m̸ ̷o̴f̸ ̷c̴o̵m̸p̸l̷e̷t̴e̵ ̷o̷b̴s̸c̵u̸r̷i̴t̸y̷,̷ ̵n̸e̵v̸e̴r̸ ̷t̷o̴ ̷b̴e̴ ̷r̴e̴a̸c̵h̴e̴d̷.̸ ̷N̴o̴ ̷w̵a̴r̴m̴t̷h̸,̸ ̷n̸o̴ ̷s̴h̸a̸d̴o̴w̴,̵ ̷j̴u̷s̵t̵ ̷t̷h̸e̴ ̷u̸n̸e̴n̷d̷i̵n̵g̸ ̷e̷x̸p̸o̵s̷u̴r̵e̴ ̷o̴f̴ ̷t̴h̴e̴ ̷s̵o̷u̴l̵.̸ ̷A̴ ̷f̷a̸d̵i̴n̸g̸ ̷h̵e̷a̸t̴ ̷s̵i̸g̵n̷a̴t̸u̷r̷e̷.̸"
                />
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
          >
            <motion.h3 
              className={styles.divisionTitle} 
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('combat_cases')}
            >
              [{"|LIMITS|  <|>  ||>··  <|>  |NO-CONTACT|"}]
            </motion.h3>
            <motion.ul className={styles.divisionList} variants={getContainerVariants()}>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- C̸a̵s̸e̷ 0̵1̵: A̶ "V̸i̷p̸e̵r̵ S̵t̵r̴i̸k̴e̶" l̶o̵i̴t̷e̷r̵i̷n̴g̸ m̶u̵n̷i̴t̸i̷o̴n̷ s̷u̶c̸c̸e̵s̶s̴f̴u̴l̶l̷y̷ ne̴utra̸li̵z̴ed a̸n e̷ne̴my c̴om̶ma̸nd ve̶hic̸le... id̸ent̸ify̸ing i̷t t̸hro̸ugh fo̴lia̸ge u̴sin̵g hy̴per̸spect̵ral im̷agi̶ng an̴d e̶xecu̶ting a t̸op-d̸own a̴ttac̷k.</motion.li>
              <motion.li className={styles.serviceItem} variants={getItemVariants()}>- C̶a̸s̶e̸ 0̸2̶: A̶ "M̷a̷e̶l̶s̸t̴r̸o̴m̷" s̷w̵a̷r̸m̶ w̷a̵s̷ d̶e̷p̴l̵o̸y̸e̸d̸ t̵o̴ o̵v̶e̵r̴w̴h̴e̶l̵m̴ a̷n̴ i̶n̷t̶e̸g̷r̵a̶t̶e̵d̷ a̴i̸r̶ d̷e̴f̸e̸n̸s̷e̶ s̷y̸s̷t̸e̸m̷. T̷h̷e̷ s̸w̸a̷r̷m̶ s̴a̴t̸u̸r̸a̶t̵e̶d̴ r̸a̵d̵a̸r̶ a̸n̵d̷ e̸x̷h̵a̸u̵s̶t̸e̸d̵... a̶ll̴o̸wi̵ng "S̴pe̸ctr̸e-9" U̸C̸AV̴s to̸ e̴lim̵in̴ate k̴ey t̶arg̸ets un̵hin̵dere̸d.</motion.li>
            </motion.ul>
            |INSP3CT| V
            <motion.button 
              className={styles.galleryButton}
              variants={getItemVariants()}
              onClick={() => handleDivisionClick('combat_cases')}
            >
              X./23
            </motion.button>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
          >
            <motion.div variants={getItemVariants()}>
              <Image
                src="/image/dron pic 1.png"
                alt="Drone Combat Display"
                width={800}
                height={500}
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.divisionContainer}
            variants={getItemVariants()}
            style={{ marginTop: '80px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.div variants={getItemVariants()} style={{ width: '100%' }}>
              <pre style={{ 
                fontSize: '8px', 
                lineHeight: '1', 
                color: '#ffffff', 
                fontFamily: 'monospace',
                overflow: 'hidden',
                whiteSpace: 'pre',
                margin: 0,
                opacity: 0.8,
                marginLeft: -120,
              }}>
{`            :~?Y5PPGGGPPPPPPPPPP55PPPPPGGGGGGGGGGGGGPP5Y?!~^...                                                                                                                 .::^:.                  
         :75GGGGGGGGGGGGGGGGGGGGGGPPPPPP555PPPPGGGBBBBGGGGGG5Y5YYY?7^.                                                                                                      .:!77!~!~!!^                
  :~!7YYJPBGGGPPGGGGGGGGGGGGGGGGGGGGGGGGGGPPP55555PPGGGBBGBGGGGGGGGGBGY7^.                                                                                               .^7?!^.     .!JJ!.             
JY5PPPPPP555555555555555555555PPPPPGGGGGGGGBBGGP5555555PPPGGGBBGBGGPPGGBBGY!:                                                                                          :~~^:         .?~!?Y7:           
P555555555555555555555555555555555555PPPGGGBBBB#BP55555555PPPPGBBGGBBGPPGBBBBP?^                                                                                     .~5~.            ^7!~!?Y7.         
55555555555555555555555555555555555555555PPGB#BB##BP55555555PP55PGBGGBBGPPPGGB#BP?^                                                                               .^77!^~:             :7!~~!JY~        
5555555555555555555555555555555555555555PPP5PG##B###G55555555PPP55PGBGGBBP5PPGGGB#B5!.                                                                         .:!77!:..:~              .!7!!~7YJ.      
555555555555555555555555555555555555555555PP55G###B##BP55555555PP555GBBBB#GP5PGPGBGBBG?:                                                                     :~77!77??:..~^               ^?!!!!J5^     
55555555555555555555555555555555555555555555P55PB##BB#BP55555555GG55PG#BBB#GPPPPPGBGGGGGJ:                                                                .~!!?7~!7!??:...~~           .:^.:7?!!~75~    
55555PPPPPPPPP55555555555555555555555P5555555PP5PB##B###P55555555BP5PPB#BB##P5PPGPPBBBGPGBJ:                                                           .^~!~77?J?7~7Y!...  ^~.        .:~77~:^77!!!5!   
BBBBBBBBBBBBBBBBBBGGGPPP5555555555555555555555PP5PB#####B555PPPPPPBPP5PB#BB##PPPPGPPB#BBPPBB7                                                       .^~~^::^77~!!!7???^.    ^!:    ......:~7?~:^7777P~  
######################BBBGGPPP5555555555PP55555PP5GB##BBBPPPPPPPGGBGGGGG###B#BPPPPGPPB###GPG#P:                                                  .^!~^:::^^^:^~~!JJ7~~~~: ...:!~. ..::::::..:^~^:~Y?7P: 
############################BBBGP555555555555555PPPPPPPPPPPPP5555PPPPPPPGGGBB#GPPPPGGPB###BPPB#~                                              .^!!~^::^^^^^^^^:::~77777??~.....^~^.::::^^^^^~^::. .~!JY 
BBBBBBGGGBBBBBBBB###############BP5555555555555555555555555555PPPPPPPPPPPPPPPPPPPPPGBGPB#B#BPPB#7                                          .^!7!^^^~^^^:^^^^^::.  .!??77??7^.....^~^:^^^^^^^~~~~~~^^!!P!
GGGGGPGGGGGGPPPPPPPGGGBBB########BGP55555555555555P555555555555PPPPPPPPPPPPPPPPPPPPPPPPGBBB#GPPG&?                                      .^!77!!!!~~^^^^^::::.   ...:~7?!!!7~.......^^^^^^^~~~~!!!!!~~5B!
GGGGGGGGGGGGGGGGGGGGPPPPPGGB#BB##BBGP5555555555555555555PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPGBGPPG&J                                  .^!7777?77!!~~^^^^^:.    ..::::.:!77!^..........^~~~~~!!!!!~~~?YJ^ 
GGGGGGGGGGGGGGGGGGGGGGPPPPPPB#B#B#BBBPP5555555555555P555PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPGGPPB&7                              .^!?JJ7?J??7!!!~~~~::.  ..:::::::::::::......:.......^777!!!!!7JY7:   
GGGGGGGGGGGGGGGGGGPPGPPPPPPPPB#BBBBBBBPP5555555555555P555PPPPP5555555555PPPPPPPPPPPPPPPPPPPPPPGGPPB#:                           :~?YYYYY??J7!!!!!!~^:   .:^~^...:::::::...............:^~!7?JJJJ7^.     
GGGGGGGGGPPPPPPPPPPPPPPPPPPPPPG#BBBBBBBPP55555P555555PPPPPP5555PPPPP5555YYYYYYYY555PPPPPPPPPPPGGPPP&J                        .^7?7!JYYYYJ~?7777!~^:..:^^^:...   ..::...............:^^~~7Y5J~^:         
GGGGPPPPPPPPPPPPPPPPPPPPPPPPPPPG#BGGBBBGPP5555PPGGGBBBBBBBBBBBB#####BBBBBBBBGGGPP55YYYY55PPGGGPGGPPBB.                    .^!77??7777JYY?:~?7!~^:^^~!~^:.:.:.    ........:::.....:^^~!JYJ!.             
PPGGPPPGGGPPPPPPPPPPPPPPPPPPPPPPGBBGBBBBBGPPGGBB#BBB###########BBBBBBBBBBBBBBBBBBBBBGGP5YYYY55PGGGPG&~                 .^7?7!!7JJJ?77??!!^!?~^^~!!!~^.  .::.      ......:!77^.:^^~!?YJ!.                
GGGGGGGGGGGGGPPGGGGGGGGGPPPPPPPPPPB#BBGBBBBBBBBBBB##&BGGGGBBBBB############BBBBBBBBBBBBBBBBP5YJYPGPP&Y              .^7JYJ7777???J?7~^!?Y7!J!!!7!^:.               ..::^:^~~^^~!J5Y!:                   
GGGGGGGGGGGGGGGGGGGGGGGGPPPPPPPPPPPBBBGBB##BB####BBPJ?777!!~~7JPYYP555PPPPPGGGBBBB###BBBBBBBBBGP5PGP#G           .^!??75P5JJJ77!!!~!77?JYJ!JY?!^:.......::::::::^^~!!7!!!!!!!JYY!:                      
GGGGGGGGGGGGGGGGGGGGGGGGPPPPPPPPPPPPBBBB#B###BPY???JJJ7~::.::^!JY7?GY??JJJYYYYYYY555PPGB##BBBBBBBBBG#B.        :!???7?!?555YYJ7~^~?JJJ??JYJ?J?7!77???JJJJJJJYYYYJ?7!~~~!7JYJ!:                         
GGGGGGGGGGGGGGGGGGGGGGGGPPPPPPPPPPPPPGB##BPYJ777777!!!777!~^:.:~?J!7J?~^~~~!77?JJYYYYY5BBGB###BBBBBB#&7     .~?JJJJYJJJ!?5P55Y7~!7?JJJYJJ7??7!!JYYYYJ?7????7777!!~^^:^!?J?~.                            
GGGGGGGGGGGGGGGGGGGGGGGPPPPPPPPPPPGGBB#&BY77?JJY55555PPPPPPP5Y?!~!?!?77!^^^^^^::??!7?J55J?YPPG###BBB#@?  .^!JJ7??J777!7?!7Y5PPYJ?777?J?!~~^^^^~~~!!!!!!!!~^^^^:::^~~7J?!:                               
GGGGGGGGGGGGGGGGGPPGPPPPPPPPPPPGGBB##&&GYPYPB&@@@@@@@@@@@@@@@@@@#G5??Y777^^^::::?5~^^^?J~^^!5GPBGB&@#! .~7!!JJ77JJ7!!!!7!~!?Y55YY?7!~~~!~:::^~~~~~~~~~~^^::::::^~7?J!:                                  
BGGGGGGGGGGGGGGGPPPPPPPPPPPPGGBB##B####J5&@@@GGPPG@@BBBBGGBBB#BB#@@&BGPYPY!!~:^J?5?^^!J?:::!??Y5JY5B&5!7^^:^?J?77JJ7!!~^::~!7JJ?7!~~!7?J!....::^^^:::......:^~7?J7^.                                    
##GGGGGGGGPPGGGPPPPPPPPPPGGGBBBBGGGBBB#PJ5&@@Y^::^Y@B5555PPPGG?~~!PBYYYYYYPJ?!7JY?J!!J7~77JYY?757!5Y5@5..7^^~?J?77J?!^::^~!77~~~!7?JJ77JYJ~^^:::...     .^!7J?7^.                                       
##BGGGGPGBBGPPPPPPPPPPPPPGGGGGPPPPPPPPGBJ??P5B5~...5&5JJYYY5GGP?!~~BG^^^^^!?7!^7Y?JY7!!JGB####&&&B#P5B^ :!7^^~?Y?~^!?7~!7777?77?JYY???JJJ?7^::..     .^!?YPY^.                                          
##BGGGGGGBBBGPPPPPPPPPPPPGPPPPPPPPPPPPP#5!^7?~7J!^.:Y&GJ?JJJJY55YJ?5@?::^^^^^:~J?7!~^:^~7J#GG5JPGB&&P5. :~7!^:^7?!!7?J?7777??JJ?77JJJ?77!!!!~...  .^!?J5BBGG7                                           
BBBBBGGBBB####BGPPPPPPPPPGPPPPPPPPPPPPPBP7~^!?^:^^:..~Y55PGGGGGPP55G5!^^^^^^^^^~~^::^^^:::7P5P7~JJJ&J7. :^!7^  .7YJ?7?JJJ??????~~~77!!!!!!!!7!:^~7?JJJGP55PP#?                                          
PPPPPPPPPPGGGBBBBGGGPPPPPPPPPPPPPPPPPPPGBJ!!!!?~:^^::::^~!!!!!!!!77!^^^^^^^^^^^^^^^^^^^^^^:7555Y5&YB77: ::.^!^::^!JYJ?7?JJJJ?????7!~~~~!!777?JJJJJJ!^?BGP555G#.                                         
PPPPPPPPPPPPPPPPGGGBBGGGPPPPPPPPPPPPPPPGBJ7~YY!7!^^^^^^^^^^^~~^^^^^^~~~^^^^^^^^^^^^^^^^^^^^^!??YJPBY?Y^.::.^7J?~^:~7JYJ???JJJJ??7777!!!!7?JJYYYJ7~::?BP5PGP55#?!^.                                      
PPPPPPPPPPPPPPPPPPPGB#BGGGPPPPPPPPPPPPPGBY?^^J5?77!^^^~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^~~7Y555Y5J!:^^^^!7JJ7~^^~7JJJ?77?77777??????JJYYY??^::^YBP555PGGPBGGPPY7~.                                  
PPPPPPPPPPPPPPPPPPPPPB#BGBGPPPPPPPPPPPPPB5?~^^!YJ?J?7!!~~~~~~~~~~~~~~~~~~~~^^~~^^^^^^^^^^^^^^::~?5YJY!~?!!!77!7JYJ7~^^~!77777777??JJJ???JJJ7!!!!~7PBPP5555PGG#GP55PPG5!                                 
PPPPPPPPPPPGGGGGGGGGGGB#BBBPPPPPPPPPPPPPB5?~^~^~?YJ??7!~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^:^^!J5YYYYJ57~????7?77?J??7!^^^~!7777?JJ??JJYJ?7!!!!!!YB#GGGP5555PG#GPP5555PPY:                               
PPPPPPPPPPGGBBBBBBBBBBB#&BBGPPPPPPPPPPPPBB5~^^~^^~7JJ??7!!!~~~!!!!!!~~~~~~~~~~^^^~!!^^^^^!7Y5YYYYYYYYJYJ~~7???????JJJJ?7!~~!??7!77?7!~~~!7777?YG#BPPPPGP5555G#GPP555555PP~                              
PPPPPPPPPPPGBBBBBBBBBBBB##BBPPPPPPPPPPPPGP5J!~~~~~^~!?JJ?7!!!!!!!!!!!~~~~~~~~~^^^^^~!~^^?YJPPJJYYYYYYYYYY7^~7??????JY5PP5Y?77~:::::::~!!!7?YGB##BP5555PP555P#&GPP55555555P!                             
PPPPPPPPPPPPGBBBBBBBBBBBB&BBPPPPPPPPPPPPGP??Y7!~~~!!~~!7??777!!!!!!!!!!~~~~~~~~^^^^^^!J??7~?P5JJYYYYYYYYYYYJ?77!!7??JJYYY5?~^^^:::^7YGGGGB####BBGP55555GPPG#&&GPPGGP555555P!                            
PPPPPPPPPPPPGBBBBBBBBBBBB##BPPPPPPPPPPPPG5?^7Y7!!~~~!!!!!!!!!!!!!!!!!!!~~~~~~~~^^^^^^^!J!!:.!P5YJJYYYYYY5Y5J~^^^^~JJ7~!7?5~^^^~!?5B##########BBBGG55555GBB#&&&GPPGGG5555555P^                           
PPPPPPPPPPPPPBBB##########&GPPPPPPPPPPPPGY?~^7J!!!~~~!!!!!!!!!!!!!!!!!!~~~~~~~~~^^^^^^^~J^::.^?P5YYY5YY?!~~?^::::^YJJ!   75?JPGB&&&##B##########BGPPPPG#&&&#&#GPGGGGG555555PY.                          
PPPPPPPPPPPPPB#############PPPPPPPPPPPPGGJ7^^^77^~~~~!!!!!!!!!!!!!!!!!!~~~~~~~~~^^^^^^^:!?... .~J55J7!~^~~^!~:::::^Y~7: .YBBGB#B##&&##B###BBBBBB#B###&&&&&&#&#GPGGGGGP555555G~                          
PPPPPPPPPPPPPB###########&BPPPPPPPPPPPPG5J?!^::!!^~~~~~!!!!!!!!!!!!!!!~~~~~~~~~^^^^^^^^^:J?:~!7J!!~^^~~~~~^~!:::::.~?   7#GGGGGBB##&#######B#####&&&&&&&&&&&&#GPGGGGGGP55555P?                          
PPPPPPPPPPPPP###########&#PPPPPPPPPPPPGGJ?7Y7^:^7!^~~~~~~!!!!!!!!!!!!~~~~~~~~^^^^^^^^^^^:!Y!!?7^^^^^~~~~~~^?7^^^^^^^J~ .GBGGGGGGB#B################&&&###&&&#GPGGGGGGGG55555P5                          
PPPPPPPPPPPPG##########&#GPPPPPPPPPPPPBYJ?~~JY!^~7~^~~~~~~~~~~!!~~~~~~~~~~~~^^^^^^^^^^^^~7?~!~:^^^^^~~~~~~~5!~^^~~~^!? ^BGGGGGGGGBB#################&&&&&&&BGGGGGGGGGGGP555555.                         
PPPPPPPPPPPG##########&#GGPPPPPPPPPPPGPJ?7~^^75Y!~7^^~!!?!~~~~~~~~~~~~~~~^^^^^^^^^^^^^^!!^~~7~:^^^^^^^^~~~Y?!5!^~~~^!? ^#GGGGGGGGGBBBBB############&&&&&&#BGGBBGGGGGGGGG5555P5.                         
PPPPPPGPPPGB#########&#GGGPPPPPPPPPPGGY??~^~^^~?5J?!^^~??7^^^~~~~~~^^^^^^^^^^^^^^^^^:::^::~!7^:::^^^^^^^~YJ^^Y5!~^~^Y! .GBGGGGGBBBBBBBBBBB#########&&&&#BGGBBBBBGGGGGGGGP555P5                          
PPPGGGGPGGB######BB##BGGGPPPPPPPPPPPG5J?!^~~~~~^~7J5!^^^^^^^^^^^^^^^^^^^^^^:::::::::::::::^~7^:::::^^^^?57^^^~BY!~^!7.  !BBGGGBBBBBBBBBBB##########&&#BGGBBBBBBBGGGGGGGGP555G7                          
BBBBBBBBBBBBBBBBB###BGGGPPPPPPPPPPPG5J?!^~~~~~~^^::!7!~^::^^^^^^^^^::^::::::::::::::::::::^~!^:::::::~55~^~~~^5#?77~.    !BBGGBBBBBBBBBB############BGGGBBBBBBBBBGGGGGGGP555G^                          
#################BBGGGGPPPPPPPPPPPGBY?~^~~~~~~~^::::::^~7!^:::::::::::::::::::::::::::::::^~!^:::::^J5?~~~~~~^JBB!:       :5#BBBBBBBBBBBB########BBGGBBBBBBBBBBBBGGGGGGGP55P5                           
BBBBB#######BBBBBGGGGGPPPPPPPPPPPGPYP5?!~^^~~~~^:::::::^~!7!^:::::::::::::::::::::::::::::^~!^:::^?PY!~~~~~^~^7BB5          ?BBBBBBBBBBBBBBBBBBGGGBBBBBBBBBBBBBBBBGGGGGGG55G!                           
BBBBBBBBBBBBBBBGGGGGGPPPPPPPPPPPGPJJJY5Y?7!~~~~~^^^^^^^~^^^!?~::::::::::::::::::::::::::::^~!::~J55?77!~~~~~^^7&B#!          ^P#BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGGGGGGG5PP.                           
BBBBBBBBBBBBBBGGGGGGPPPPPPPPPPGG5JYYYYJJJJJJJ?~~~~~~~~~~~~~^~J7::::::::::::::::::::::::::::~~?PG5JJJ??7!~~~~~^Y@&BP.          .J##BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGGGGGGP5PG~                           
BBBBBBBBBBBBGGPGGGPPPPPPPPPPGGPYYYJ??77!!!!7JJYYJ!!~~^~~^^~~^~Y?^^^::::::::::::::::::::::^~~?G5YJYJJJ?7!!~~~~~G@&B#~            ~P#BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGGGGGGP55GJ~.                         
BBBBBBBBBBBGGGGGGGPPPPPPPPGGPYJJ?!~~~~~~~~~~~~~75PJJ?7~~!!~^~~!PJJ?7!!~^^:::::...::::^^!YGJ~YYYYYYYJJ??7!~~~^J@@@&B~ ....::.    .5##BBBBBBBBBBBBBBBBBBBBBBBBB#####BGGBBPP555PG57.                       
BBBBBBBBBBGPGGGGGGPPPPPPGGPYJ7!~~~~~~~~~~~~~~~~~~?5???JJJP5?7~~5JJJJJJJ??77!!JJ?7J5~7GPGGP5555YYYYYJJJ?7!~~~J&@@@@#GGGGBBBG~   .P#GBB###BBBBBBBBBBBBBBB######&&&&#BGGGGPP555555GP^                      
BBBBBBBBBGPGGPPPPPPPPGGG5J7!~~~~~~~~~~~~~~~~~~~~~~!J?777?JY???YY7777777777777BBPPGGPGGPP55P5?YPYYYYJJY??7!?YB#&&@@&&#GY?~:.    !&GGGGGB##################&&&&&&##BBBPPPP55555555PG~                     
##BBBBBBBGGGGGGPPPGGG5Y?!~~~~~~~~~~~~!JJ7!!~~~~~~!!!?7????JJJY555555555555555B&#&&#######BGJ7P5YYYYYP5????7:.::^!~^:.          ^BBBGGGBBB####################BBBBBBGGGGGGGGGGGGGGGP.                    
BBBBBBBBBBBBBBBBBG5?!~~~~!?7~~~~~~~~~~~JGP5YJJ?7!?BPPGGBBBBBBBBBBBBBBGGGGGGGBB##GGGGGGPPPPP5P#PY55YYGJJ?~.                      :YGBBBBBBBBBBBBB######BBBBBBBBBBBBBGGBBGGGGGGGGGGBG.                    
BBBBBBBBBBBB#BGPJ!~~~~~~~~?G5YJ77???7!~~!YGB####BPB&#BBBBGGGGGGGGGGGGGGPP5555PB#P55555555PP55BB7!:.?7^.  .:^^~!!77????77!~: ~?!^. :#BBBBB####BB################BBBBGGGGGGGGGGGGBBG~                     
GGGGGGBB##BBPJ!~~~77?!~~~~?G5PPPPPGBBGP555G#########BBGGGGGGGGGGGGGGGGGGGPPP5PB#G55555557JP55GB..:^^~7J5PPGBBBBBBBBBBBBBBBGY##GBG5Y&###&&&&&&###########B####B#BB#BBBGGGGGGGGB#GJ:                      
BBBBBBBBGPYJ!~!!?55P55?~~!5P55555B&#######BBBBBBBBBBBBBGBBGGGGGGGGGGGGGGGGPPPPGBBP5555P5~^7P5G&BB####&&&&#GGGGGGGBBBGGGGGGGGBBBBBBBB####&&&&&&&&&&&&#########BBB#B##BBBGGGGGB5!.                        
BBBGPP5555555YP555555557?5P555PGPP##BBBBBBBBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGPPPPPG#B5555GP??!5PP#&##########BGPPPGGGGBBBGGGGGGGGGB#BBGBBBBB######&&&&&&&&&&&&&####BB#####BBBBBB7                          
PPBPY555PGGGYYP5555P55PPP55555B5?Y5B##BBBBBBBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGPPPPPPBBP555PGPY?JGGB#############GPPPPGGGGGBGGGGGGGGGGGBBGBBBBB############&&#&&&&&&&#####&&###G5PB^                         
J:7B55PG5!^^..!PPPJ~.:!J5PPPP5GJ^!?YB&&##########BBBBBBBBGGGGGGGGGGGGGGGGGPPPPP5B#G555PGB5JJGGBBB#########BB#GPPPPPGGGGBBGGGGGGGGGGGGGGBBBBBB##BBBBBB#################BBBBG55B!                         
   YGPP!.      :~.       :^^~JG##&&&&&&&&############BBBBGGGGGGGGGGGGGGGGPPPP555G#G5PPPGGB55BGGBGB##BBBBBBBBB#GPPPPPGGGGGBGGGGGGGPPPPPPPGBBBBBBBBBBBBBBB############BBBBBBGP5B7                         
    J7.                   ^YB&&&&###################BBBBBBBBGGGGGGPPPPPPPPP55555BBBPGGGGGGGGBBBBGGG##B#########GPPPPPPGGGGBGGGGGGPPPPPPPPPGGBBBGBBBBBBBBBBBBB########BGGPPPP5G7                         
                       .7P&&&&&#####################BBBBBBBBBB###BBGGPPPPPPPGGGBB#BBBBB###BBGGGGBBBB#BBBBBBBBBGGGPPGPPPGGGGGBGGGGGGPPPPPPPPPPGGBBGGBBBGGGGGBBBBBB###BBBPPP555B~                         
                  ..:^?B&&&&&&&&&&&&&&&&&&#########BBBBBBBBBBBBBBB#BGGPGGGBBB#############BBGPPPPP5P#BPPGPPPPPPPGGGGPPPPPPGPGBGGGGGPPPPPPPPPPPPPGBBGGGGGGGGPPPPPPGGGBGBBPP55PG:                         
              :!JY5PGGBBGBBGGGGGGBBBBBBBBBB########BBBBBBBBBBBBBBBBBBBGPPPPGGGGGGGGPPPPPPP5PPPPPP555P#PPBGGPPPPPPPPPPPP555GBGGBGBGGP5PPPP55PPPPPPPGBBGPPPPP555555555PPPGGG55GJ                          
            .YGGGGGGGGGGGGGGGGGGGGGGGGPPPPPGGGGGBB###BBBBBBBBBBBBBBBB#B5PPPGGGGGGGPPPP55PPPPPPPPBGPPG&BBGGPPPPPPPPPPPPPP55PBBGPBGBGPPPP55555555PPPPB##G555555555PPPPP555PP55GY                          
            YBGGGGGGGGGGGGGGGGGGGGGGPPPPPPPPPPGGGGGGBBB###BBBBBBBBBBB#G555PPGGBBGGGGGGGGGGGGGGGGBBGGB#BGGPPPPPPPPPPPPPPP555GBBGGBBBGP5555555555555PG##BP55555555555555PP555PB7                          
           .BBBBBBBBGGGPPGGGGGGGGGPPPPPPPPPPPPPPPPPPPPPGBB####BBBBBBBB5555555PPPPGGGGGGGGGBBBGGGBBGGGGGBGPPPPPPPPPPPPPPPP55PBBBBB##BGP55555555555PPP##BP555555555555555555PB!.                          
           :BGBGGGGGGGGGGPPPPGGGGPPPPPPPPPPPPPPP55PPPP5PPPPGB#####BBBP55555555555555PPPPPPPPPGPPPPPPPPPPPGPP5PPPPPPP55PPPPPBBBBBB#&#GP55555555555PPPB#BPP55555555555555555PG.                           
           :BBGGGGGGGGGGGGGGPPPPPPPPPPPPPPP5555555555555555PPPGB#BGGP555555555555555555555555555555P555555PPP5PPPPPPPPPPPPBBBBBBBBG##GP555PPPP55555P##BPP55555555555555555G5                            
           ^#BGGGGGGGGGGGGGGGBGGPPPPPPPPPP5555555555555555555555555555555555555555555555555555555555PP555555PGPPPPPPPP5555PPPPPBBBPG#BGPP5555555PPPG##BPP5555555555555555P#~                            
           ?#GGGGGGGGGGGGGGGGGGBBGGPPPPPPP55555555555555555555555555555555555555555555555555555555555P5555555PGP555555555555555PGBG5G#BGGGGGGGGGGGGB##BGPP55555555555555PB?                             
         ~P#GGGGGGGGPPPPPPPPGGGGGBBBGPPPPP555555555555555555555555555555555555555555555555555555555555PP5PPPPP5PGP555555555555555GP55BBGGGGGGGGGGGGB##GGGGPPP5555555555PG7                              
       .J#BBBGGGGGPPPPPPPPPPPPPPGGGBBBGPPP5555555555555555555555555555555555555555555555555555555555555PP55PPPP5PGP555555555555555555PG#GGGGGGGGGGG#&#GGGGGGGGPPPPPP5PG5^                               
      !PBGGGPPPPPPPPPPPPP5PPPPPPPPPPPGBGPP55555555555555555555555555555555555555555555555555555555555555PP5PPPPPPPGP5555555555555555555G#GGGGGGGGGG##BGGGGGGGGGGGPPPGY~                                 
    ^YBGGPPPPPPPP55555555555555555PPP555PPP5555555555555555555555555555555555555555555555555555555555555PBPPPPPP5P5PG555555555555555555P##BGGGGGGGBBGPPPPPPPPPPGGG5?^                                   
  .?GGPPPPPP5555555555555P5555555555555555PPP555555555555555555555555555555555555555555555555555555555555GBP5PPPP555PG55555555555PPPPGGPPPGBBBBBBBBBBGGGGGGGGGP5?^.                                     
 ^5BPPPPPPP555555555555555555555555555555555PPP5555555555555555555555555555555555555555555555555555555555PBBPPPPPPPP5PG5555555PGPPPPP555555GB##########BGP5?!^.                                         
!GGPPPPPP5555555555555555555555555555555555555PPP55555555555555555555555555555555555555555PPPPPP5555555555PBBPPPPPPPPPPG555555BP555555555555P###BYY?7!~^..                                              
BGPPPPPP555555555555555555555555555555555555555PGPPP55555555PGPPPPPPPPPPPPPPPPPPPPPPPPPPP55PPP555PPGP555555GBGPPPPPPPPPPGP5555PP5555555555555#&B~                                                       
PPPPGPP555555555555555555555555555555555555555555PGPP55555GBBGP5PP555555555555555555555555555555555PG5555555GBGPPPPPPPPPPG55555GP555555555555GB:                                                        
PPPPPP55555555555555555555555555555555555555555555PGPP555GBG5555555555555555555555555555555555555555GP555555PGBGPPPPPPPPPPP5555PG5555555555555B!                                                        
PPPPPPP55555555555555555555555555555555555555555555GPP55PBP55555555555555555555555555555555555555555PP5555555PBBGPPPPPPPPPPG5555GGP55555555555PP                                                        
PPPGPPPP5555555555555555555555555555555555555555555PGP55PB555555555555555555555555555555555555555555PG55555555GBBGPPPPPPPPPPG555PBGPPPPPPPPPP55B^                                                       
GPPPPPPPP55555555555555555555555555555555555555555PPBP55PBP555555555555555555555555555555555555555555BP5555555PB##GPPPPPPPPPBP555GBGPGGGPGGGGGG#P.                                                      
PPPPPPGPPPPPPPPP555555555555555555555555555555PPPP5PBG55P#P555555555555555555555555555555555555555555#P55555555P###GPPGPPPPPGG555PBBGGGGGGGGGGGGBJ                                                      
PPPPPPPPPGPPPPPPPPPPP5555555555555555555555555PPPP5PGG55P#GG55555555555555555555555555555555555555555#P555555555G###GPPGGGGPPB55555BBBBBBGBGGPPPPB!                                                     
PPPPPPPPPPPPPPPPPPPPPPPPP555555555555555555555PPPP5PGGP5P#BGPPP5555555555555555555555555555555555555G#G555555555PB##BPPPPPPP5GP555PGBGGPPPPPP5555PG.                                                    `}
              </pre>
            </motion.div>
            
            <motion.div 
              variants={getItemVariants()}
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2
              }}
            >
              <h1 style={{ 
                fontSize: '12rem', 
                fontWeight: 'bold', 
                color: '#ffffff',
                textAlign: 'center',
                letterSpacing: '0.2em',
                lineHeight: '1',
                margin: 0,
                textShadow: '0 0 50px rgba(255, 255, 255, 0.8), 0 0 100px rgba(255, 255, 255, 0.5)'
              }}>
                HEX-3//SC
              </h1>
            </motion.div>
          </motion.div>
          <motion.button className={styles.galleryButton} style={{ margin: 'auto' }} variants={getItemVariants()} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> \-/·\-/\-/·r̵͈̐̐͑͌̍̽̎́̓͗̾̎̚ë̷̢̢̗̳̙̞͙̼̺́̑͗̈́̀̀̊͊̎̿̃́̈́̕̚͜͜s̸̡̩͉̟̰̬͍̲̱̙͓̙̘̩͕͆͂t̴̪̑̽̾͆̊̊̋̌͐̀̃̂͘͜á̷̡̡̗̮͎͕͓͖̰̹̈́̓͋̊̄̕͝r̶͎̥̽͊̒̆̀̎̀͆̽͒t̷̯͍̜̃̒͠·\-/\-/·\-/</motion.button>

        </motion.div>
      </motion.div>
      
      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        folderName={currentFolder}
      />
    </div>
  );
};

export default About;