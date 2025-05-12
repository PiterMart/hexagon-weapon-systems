import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';

const About = () => {
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
        <motion.h1 className={styles.title} variants={itemVariants}>HEXAGON DEVELOPMENTS</motion.h1>
        <motion.h2 className={styles.subtitle} variants={itemVariants}>Technology & Design</motion.h2>
        <motion.ul 
          className={styles.servicesList}
          variants={containerVariants}
        >
          <motion.li className={styles.serviceItem} variants={itemVariants}>- Web Apps / UI / UX</motion.li>
          <motion.li className={styles.serviceItem} variants={itemVariants}>- Branding & Concept design</motion.li>
          <motion.li className={styles.serviceItem} variants={itemVariants}>- Database Structures & Systems</motion.li>
          <motion.li className={styles.serviceItem} variants={itemVariants}>- Bots and AI Implementations</motion.li>
        </motion.ul>
        <motion.div className={styles.contactSection} variants={itemVariants}>
          <h2 className={styles.contactTitle}>Contact us</h2>
          <a href="mailto:hxgn.tech@gmail.com" className={styles.contactLink}>
          {">"} hxgn.tech@gmail.com
          </a>
        </motion.div>
        <motion.div className={styles.teamSection} variants={itemVariants}>
          <h2 className={styles.teamTitle}>Team</h2>
          <motion.div 
            className={styles.teamMembers}
            variants={containerVariants}
          >
            <motion.p className={styles.teamMember} variants={itemVariants}>- Pedro Martingaste</motion.p>
            <motion.p className={styles.teamMember} variants={itemVariants}>- Martin Sobel</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
