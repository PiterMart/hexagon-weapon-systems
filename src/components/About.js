import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';
import ImageGallery from './ImageGallery';

const About = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);

  // Define folder mapping for each division
  const folderMapping = {
    'drones': 'fpv pov',
    'pilots': 'pilot',
    'swarms': 'swarm',
    'tanks_vs_drones': 'tank',
    'anti_drone_strategies': 'soldiers',
    'nightvision': 'nightvision',
    'combat_cases': 'drone case'
  };

  const handleDivisionClick = (divisionKey) => {
    setCurrentFolder(folderMapping[divisionKey]);
    setIsGalleryOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <motion.div 
        className={styles.contentWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className={styles.logoContainer} variants={itemVariants}>
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
        <motion.h1 className={styles.title} variants={itemVariants}>H̴E̸X̷A̧G͏O͏N̷ 𝔚EA̴P̵O̷N̸ ̲S͘YSTEMS</motion.h1>
        <motion.h2 className={styles.subtitle} variants={itemVariants}>U̴nm̷a̸n̴n̶e̵d A̴e̷r̴i̴a̷l̵ ₩₳Ɽ₣₳ⱤɆ D̴i̷v̶i̵s̵i̸o̴n̵</motion.h2>
        <motion.div 
          className={styles.servicesList}
          variants={containerVariants}
        >

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('drones')}
            style={{ cursor: 'pointer' }}
          >
            D̸r̷o̶n̶e̶s̷
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- UCAV "S̴p̷e̶c̸t̴r̴e̷-9": A̸t̴t̸a̸c̷k̸ and r̴e̸c̴o̴n̸...a̴i̶s̴s̷a̸n̸c̷e̶ p̴l̷a̸t̴f̸o̵r̴m̸.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- L̴o̴i̸t̷e̵r̸i̸n̷g̷ ̴M̶u̵n̸i̵t̷i̸o̷n̸ "V̴i̴p̵e̴r̴ ̵S̵t̸r̴i̶k̴e̷": K̵am̵ik̴az̴e d̸r̷o̴n̸e̷ f̴o̴r̸ p̷r̸e̶c̸i̶s̵i̵o̵n̵ s̸tri̶kes.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- VTOL N̴a̸v̴a̵l̴ D̵r̵o̶n̶e̸: F̵o̴r̶ s̴h̸i̸p̸-̸b̴a̶s̸e̶d̵ o̸p̴e̶r̴a̸t̸i...ns.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Hea̷vy Ca̸rgo "G̴o̷li̶ath": Lo̵gis̸tic su̴pport f̴or fro̸ntli̴ne r̸es̵upply.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- S̸t̴r̴a̷t̴o̴s̴p̴h̸e̵r̵i̵c̸ S̴u̷r̴v̶e̷i̶l̷l̵a̷n̶c̴e̵ "S̸e̸n̷t̶i̶n̵e̷l̶": L̸o̵n̴g̴-̴e̴n̵d̷u̴r̵a̶n̶c̴e̴ I̷S̸R̴ p̴l̸a̷t̶f̴o̷r̸m̶.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('pilots')}
            style={{ cursor: 'pointer' }}
          >
            D̸r̷o̶n̶e̴ P̴i̴l̴o̷t̵s̷
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Tr̴ai̸ni̷ng: Ce̴rti̸fi̵ed UCAV Op̴er̵ato̵r C̴ou̸rse.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- S̵i̴m̶u̶l̴a̵t̸i̸o̶n̷: "W̷a̴r̶S̷i̸m̴" v̵i̶r̵t̴u̶a̵l̶ r̸e̴a̷l̶i̸t̵y̴ en̴vi̸ronm̵en̸t fo̸r j̴oi̵nt f̴orc̷es t̴rai̴nin̸g.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- In̴t̷e̷r̵f̸a̷c̶e̵: B̸r̵a̵i̸n̵-̸C̸o̸m̵p̶u̷t̷e̴r̷ I̷n̶t̵e̵r̸f̸a̴c̵e̸ (B̵C̸I̸) f̷o̶r̶ a̶d̸v̵a̷n̶c̴e̴d̶ d̴r̴o̷n̸e̷ c̸o̸n̷t̴r̶o̷l̶.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- C2 Sof̴twa̸re: "AURA" A̴I-p̴ower̸ed c̸omman̵d a̷nd c̴ontr̸ol f̷or b̵attl̸efie̴ld m̴anag̸emen̷t.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('swarms')}
            style={{ cursor: 'pointer' }}
          >
            D̸r̷o̶n̶e̴ S̷w̸a̴r̷m̶s̴
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Pr̴oduc̷t: "M̵aelst̴rom" sa̵tura̴tion m̵icr̴o-dr̵one s̷war̴m.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- R̸e̸s̵e̴a̸r̷c̵h̴: In̷ter-̵dro̴ne co̷mmun̸ica̸ti̴on f̵or au̷tono̷mous̷ s̷war̵ms in̷ G̴PS-d̷enie̴d e̷nviro̷nme̷nts.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Ta̷cti̴cs: Co̴urs̴e o̵n Sw̸arm Empl̷oym̸ent T̸act̵ics.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- A̵I: Co̷gni̵tive a̵lgo̸rith̸ms fo̸r de̷ce̷ntra̵liz̸ed s̴war̵m d̷ecis̷ion-m̷akin̵g.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('tanks_vs_drones')}
            style={{ cursor: 'pointer' }}
          >
            T̴a̵n̸k̴s̷ v̷s̵ D̶r̸o̴n̶e̵s̶
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Ac̸ti̵ve D̵efe̷nse: "A̵eg̵is" a̴uto̷ma̴ted tu̷rre̷t wi̵th f̴rag̸ment̵atio̷n m̴uni̸tio̵ns for̸ dr̸one i̸nte̴rcep̵tion.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- El̷ect̵ron̶ic Wa̸rfa̴re: Veh̴ic̵le-mo̸unt̶ed ja̸mme̷rs a̵nd s̴poof̵ers.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- In̴tegr̵ati̸on: P̷air̵ing a̶rmo̷red v̵ehi̸cles w̸ith t̵hei̷r o̵wn "h̴unt̷er-k̷iller" d̸ron̵e esc̷orts.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Re̷se̸ar̷ch: Ca̴mo̴ufl̸age ma̵te̵ria̸ls t̸o r̵edu̸ce t̷herm̸al a̴nd e̴lect̸roni̵c s̷igna̴tur̴es.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('anti_drone_strategies')}
            style={{ cursor: 'pointer' }}
          >
            S̴o̴l̴d̷i̴e̶r̸s̴ A̸n̶t̸i̷ D̶r̴o̷n̴e̷ S̶t̴r̵a̶t̵e̶g̵i̴e̵s̴
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Ma̶n-P̵ort̴abl̶e: "H̵ELIO̴S II" h̵and̴hel̴d d̴irect̵ed en̸ergy w̸eap̴on (l̷as̵er).</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- S̸I̷G̴I̴N̶T̸: P̴e̷r̶s̷o̴n̷a̴l̷ d̶r̷o̸n̸e̸ d̶e̵t̵e̶c̶t̵i̴o̶n̸ a̸n̶d̴ s̸i̴g̸n̶a̵l̷ i̵d̶e̸n̵t̸i̵f̵i̸c̵a̶t̷i̵o̵n̷ u̶n̴i̵t̶s̴.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Tr̵ai̶nin̸g: C̸our̴se on i̵de̵nti̶fyin̷g a̶nd co̴un̸teri̶ng d̴ron̴e th̸rea̷ts i̷n t̷he fi̴el̷d.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- A̷u̶g̸m̷e̶n̵t̷e̴d̷ R̴e̸a̵l̴i̴t̶y̸: I̴V̷A̵S̷ G̵e̶n̶ 2̶ s̵y̴s̶t̶e̸m̵ w̴i̵t̵h̴ i̸n̶t̶e̶g̵r̶a̷t̴e̵d̶ d̸r̶o̶n̴e̷ t̷r̸a̴c̵k̵i̶n̴g̴.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('nightvision')}
            style={{ cursor: 'pointer' }}
          >
            N̷i̴g̸h̸t̵v̶i̷s̷i̵o̴n̴ a̵g̷a̴i̵n̶s̷t̶ D̵r̶o̷n̴e̴s̵
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- Se̴ns̵or̷s: H̴ype̸rspe̵ctr̸al se̷nso̸rs fo̴r d̸ron̴es t̸o de̸fea̷t ca̸mou̸fla̸ge.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- C̸o̶u̴n̵t̶e̵r̴m̶e̷a̸s̶u̶r̷e̸s̶: D̴e̶v̵e̷l̴o̴p̴m̴e̸n̸t̴ o̵f̸ l̵o̸w̶-̵e̸m̸i̵s̶s̴i̷v̶i̵t̸y̸ c̴o̷a̸t̶i̴n̴g̴s̸ f̵o̴r̶ d̶r̸o̴n̵e̴s̸.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- F̴u̶s̶i̸o̷n̴: "H̶e̶l̴i̸o̵s̵" s̴e̸n̸s̴o̶r̵ f̸u̷s̵i̶o̸n̵ s̸y̷s̶t̸e̸m̶ c̴o̶m̷b̴i̵n̸i̸n̸g̸ t̴h̵e̴r̴m̷a̸l̶, I̴R̴, & E̵M d̵a̶t̴a̴.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- R̵e̴s̶e̴a̸r̵c̶h̸: Q̷u̴a̸n̸t̷u̶m̷ s̶e̵n̴s̷o̵r̵s̸ f̷o̵r̶ n̴a̴v̶i̶g̴a̷t̸i̵o̵n̷ a̸n̶d̸ d̴e̵t̸e̸c̷t̴i̸o̸n̵ w̵i̷t̷h̷o̶u̷t̸ a̴c̸t̴i̵v̶e̵ e̸m̸i̵s̷s̷i̶o̴n̸s̶.</motion.li>
          </motion.ul>

          <motion.h3 
            className={styles.divisionTitle} 
            variants={itemVariants}
            onClick={() => handleDivisionClick('combat_cases')}
            style={{ cursor: 'pointer' }}
          >
            D̸r̷o̴n̷e̷ C̴o̷m̴b̸a̸t̴ C̸a̴s̷e̸s̸ [̸2̸ c̵a̸s̴e̸s̶]̸
          </motion.h3>
          <motion.ul className={styles.divisionList} variants={containerVariants}>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- C̸a̵s̸e̷ 0̵1̵: A̶ "V̸i̷p̸e̵r̵ S̵t̵r̴i̸k̴e̶" l̶o̵i̴t̷e̷r̵i̷n̴g̸ m̶u̵n̷i̴t̸i̷o̴n̷ s̷u̶c̸c̸e̵s̶s̴f̴u̴l̶l̷y̷ ne̴utra̸li̵z̴ed a̸n e̷ne̴my c̴om̶ma̸nd ve̶hic̸le... id̸ent̸ify̸ing i̷t t̸hro̸ugh fo̴lia̸ge u̴sin̵g hy̴per̸spect̵ral im̷agi̶ng an̴d e̶xecu̶ting a t̸op-d̸own a̴ttac̷k.</motion.li>
            <motion.li className={styles.serviceItem} variants={itemVariants}>- C̶a̸s̶e̸ 0̸2̶: A̶ "M̷a̷e̶l̶s̸t̴r̸o̴m̷" s̷w̵a̷r̸m̶ w̷a̵s̷ d̶e̷p̴l̵o̸y̸e̸d̸ t̵o̴ o̵v̶e̵r̴w̴h̴e̶l̵m̴ a̷n̴ i̶n̷t̶e̸g̷r̵a̶t̶e̵d̷ a̴i̸r̶ d̷e̴f̸e̸n̸s̷e̶ s̷y̸s̷t̸e̸m̷. T̷h̷e̷ s̸w̸a̷r̷m̶ s̴a̴t̸u̸r̸a̶t̵e̶d̴ r̸a̵d̵a̸r̶ a̸n̵d̷ e̸x̷h̵a̸u̵s̶t̸e̸d̵... a̶ll̴o̸wi̵ng "S̴pe̸ctr̸e-9" U̸C̸AV̴s to̸ e̴lim̵in̴ate k̴ey t̶arg̸ets un̵hin̵dere̸d.</motion.li>
          </motion.ul>

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