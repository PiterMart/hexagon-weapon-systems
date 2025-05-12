import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/Portfolio.module.css';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    adaptiveHeight: true,
  };

  const clients = [
    {
      id: 1,
      title: "Tomas Redrado",
      image: "/tomas-redrado-web.png",
      description: "International Art Gallery Website",
      website: "https://tomasredrado.com",
      characteristics: [
        "Responsive Web Design",
        "Database Integration and Management",
        "SEO Optimized",
        "Fast Performance",
        "In Collaboration with EL ASOMBRO",
      ]
    },
    {
      id: 2,
      title: "Valerie's Factory",
      image: "/valeries-factory-web.png",
      description: "International Art Gallery Website",
      website: "https://valeriesfactory.com",
      characteristics: [
        "Responsive Web Design",
        "3D Animation Background",
        "SEO Optimized",
        "Fast Performance"
      ]
    },
    {
        id: 3,
        title: "Jan Sonnevi",
        image: "/sonnevi-web.png",
        description: "Golf Course Designer Portfolio",
        website: "https://sonnevigolfdesign.com",
        characteristics: [
          "Responsive Web Design",
          "Branding & Concept Design",
        "Database Integration and Management",
          "SEO Optimized",
        ]
      },
      {
        id: 4,
        title: "Funki Funghi [offline]",
        image: "/funki-web.jpg",
        description: "Jewerly brand ecommerce",
        website: "",
        characteristics: [
          "Responsive Web Design",
          "Shopify Theme Customization",
        ]
      },
      {
        id: 5,
        title: "TYTM8 [UPDATED]",
        image: "/tyt-web.jpg",
        description: "Fashion brand ecommerce",
        website: "https://https://www.tytm8.com/",
        characteristics: [
          "Responsive Web Design",
          "Shopify Theme Customization",
        ]
      },
      {
        id: 6,
        title: "VAPEO X",
        image: "/vapeo-x-web.png",
        description: "Vape distributer ecommerce",
        website: "https://www.vapeoxcaba.com/",
        characteristics: [
          "Responsive Web Design",
          "Ecommerce database Logic and user registration",
          "Stock management and automatic mailings",
        ]
      },
    // Add more clients here as needed
  ];

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

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.portfolioContainer}>
      {/* <h2 className={styles.sectionTitle}>PORTFOLIO</h2> */}
      <div className={styles.carouselWrapper}>
        <Slider {...settings}>
          {clients.map((client) => (
            <div key={client.id} className={styles.slide}>
              <motion.div 
                className={styles.clientCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                <motion.h3 className={styles.clientTitle} variants={itemVariants}>
                  {client.title}
                </motion.h3>
                <motion.div className={styles.imageContainer} variants={itemVariants}>
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={client.image}
                      alt={client.title}
                      width={600}
                      height={400}
                      className={styles.clientImage}
                      priority
                    />
                  </a>
                </motion.div>
                <motion.p className={styles.description} variants={itemVariants}>
                  {client.description}
                </motion.p>
                <motion.ul 
                  className={styles.characteristicsList}
                  variants={containerVariants}
                >
                  {client.characteristics.map((char, index) => (
                    <motion.li 
                      key={index} 
                      className={styles.characteristic}
                      variants={itemVariants}
                    >
                      - {char}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div className={styles.buttonContainer} variants={itemVariants}>
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.visitButton}
                  >
                    VISIT SITE
                  </a>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Portfolio;
