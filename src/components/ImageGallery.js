import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ImageGallery.module.css';

const ImageGallery = ({ isOpen, onClose, folderName }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [playingVideos, setPlayingVideos] = useState({});
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  // Define all media files for each folder
  const folderContents = {
    'fpv pov': [
      '20241127_72OMBr_FPV_Bakhmut_Recon_Trench_01.mp4',
      '20241204_47OMBr_FPV_Avdiivka_Strike_Position_02.webp',
      '20241209_Azov_FPV_Marinka_Engage_Infantry_03.png',
      '20241118_93OMBr_FPV_Robotyne_Strike_BMP2_04.webp',
      '20250102_3OSBr_FPV_Swarm_Vuhledar_Engage_05.avif',
      '20241221_47OMBr_FPV_Bakhmut_Strike_Vehicle_06.gif',
      '20241228_Azov_FPV_Chemical_Deploy_07.gif',
      '20250105_93OMBr_FPV_Marinka_Engage_Position_08.gif',
      '20241130_72OMBr_FPV_Avdiivka_Chase_Infantry_09.gif',
      '20241207_47OMBr_FPV_Robotyne_Engage_BTR80_10.webp',
      '20241214_3OSBr_FPV_Vuhledar_Strike_T90_11.webp',
      '20241125_Azov_FPV_Bakhmut_Dive_Target_12.gif',
      '20241201_93OMBr_FPV_Marinka_Final_Approach_13.webp',
      '20250110_72OMBr_FiberOptic_Avdiivka_ISR_Mission_14.jpg',
      '20241219_47OMBr_FPV_Robotyne_Engage_T72_15.png',
      '20241226_3OSBr_FPV_Vuhledar_Mission_Brief_16.png',
      '20250103_Azov_FPV_Op_Header_17.png'
    ],
    'pilot': [
      '20241205_47OMBr_Operator_Training_FPV_Session_01.mp4',
      '20241212_93OMBr_Pilot_Briefing_Mission_Prep_02.mp4',
      '20241219_Azov_Operator_Control_Station_Setup_03.mp4',
      '20241226_72OMBr_Pilot_Portrait_Commander_04.png',
      '20250102_3OSBr_Operator_Console_View_05.webp',
      '20241128_47OMBr_Pilot_Goggles_FPV_Feed_06.webp',
      '20241203_Azov_Operator_Field_Position_07.webp',
      '20241210_93OMBr_Pilot_Control_Active_Mission_08.jpg',
      '20241217_47OMBr_Operator_Cockpit_View_09.png',
      '20241224_72OMBr_Pilot_Remote_Station_10.webp',
      '20241231_3OSBr_Mission_Header_OpPlan_11.png',
      '20250107_Azov_Op_Title_Strike_Brief_12.png',
      '20241129_93OMBr_Swarm_Operation_Header_13.png'
    ],
    'tank': [
      '20241204_93OMBr_FPV_Bakhmut_Engage_T72_Direct_Hit_01.mp4',
      '20241211_47OMBr_FPV_Avdiivka_Strike_T90_Turret_02.mp4',
      '20241218_Azov_FPV_Marinka_Engage_BMP3_Mobility_Kill_03.mp4',
      '20241225_72OMBr_FPV_Robotyne_Strike_T80_Engine_04.mp4',
      '20250101_3OSBr_FPV_Vuhledar_Engage_BTR82_Destroy_05.mp4',
      '20250108_Azov_FPV_Bakhmut_Strike_T72B3_Ammo_Cook_06.mp4',
      '20241207_93OMBr_FPV_Marinka_T90M_Strike_Assessment_07.png',
      '20241214_47OMBr_Drone_Avdiivka_BMP2_Burning_08.png',
      '20241221_72OMBr_FPV_Robotyne_T64_Abandoned_09.webp'
    ],
    'soldiers': [
      '20241202_93OMBr_Infantry_Bakhmut_Defensive_Position_01.mp4',
      '20241209_47OMBr_Squad_Marinka_Patrol_Movement_02.mp4',
      '20241216_Azov_Infantry_Avdiivka_Combat_Engagement_03.mp4',
      '20241223_72OMBr_Troops_Robotyne_Trench_Assault_04.mp4',
      '20241230_3OSBr_Infantry_Vuhledar_Counter_Attack_05.mp4',
      '20250106_Azov_Infantry_Bakhmut_Advance_Sector_06.mp4',
      '20241201_93OMBr_Troops_Marinka_Urban_Combat_07.mp4',
      '20241208_47OMBr_Squad_Avdiivka_Building_Clear_08.mp4',
      '20241215_72OMBr_Infantry_AntiDrone_Engage_09.png',
      '20241222_3OSBr_Ground_Ops_Mission_Header_10.png'
    ],
    'nightvision': [
      '20241206_93OMBr_Matrice_NV_Bakhmut_Patrol_01.mp4',
      '20241213_47OMBr_DJI_NV_Avdiivka_Recon_Infantry_02.mp4',
      '20241220_Azov_Mavic_NV_Marinka_ISR_Position_03.mp4',
      '20241227_72OMBr_Matrice_NV_Robotyne_Observe_Movement_04.mp4',
      '20250104_3OSBr_DJI_NV_Vuhledar_Track_Convoy_05.mp4'
    ],
    'drone case': [
      '20241203_93OMBr_DJI_Mavic_Transport_Case_01.mp4',
      '20241215_47OMBr_Matrice_Storage_Prep_02.mp4',
      '20250108_Azov_FPV_Kit_Assembly_03.mp4'
    ]
  };

  const isVideo = (filename) => {
    return filename.toLowerCase().endsWith('.mp4');
  };

  useEffect(() => {
    if (isOpen && folderName && folderContents[folderName]) {
      const files = folderContents[folderName];
      const mediaList = files.map((filename, index) => ({
        id: `${folderName}-${index}`,
        filename: filename,
        src: `/image/${folderName}/${filename}`,
        isVideo: isVideo(filename),
        x: Math.random() * (window.innerWidth - 400),
        y: Math.random() * (window.innerHeight - 400),
      }));
      console.log('Creating media items:', mediaList);
      setMediaItems(mediaList);
    }
  }, [isOpen, folderName]);

  const handleClose = () => {
    setMediaItems([]);
    onClose();
  };

  const handleItemClose = (itemId) => {
    setMediaItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleMouseDown = (e, itemId) => {
    // Don't start dragging if clicking on a video element or its controls
    if (e.target.tagName === 'VIDEO' || e.target.closest('video')) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const item = mediaItems.find(item => item.id === itemId);
    if (!item) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedItem(itemId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleVideoDoubleClick = (e, itemId) => {
    e.stopPropagation();
    e.preventDefault();
    
    const videoElement = videoRefs.current[itemId];
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      setPlayingVideos(prev => ({ ...prev, [itemId]: true }));
    } else {
      videoElement.pause();
      setPlayingVideos(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleMouseMove = (e) => {
    if (!draggedItem) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setMediaItems(prev => prev.map(item => 
      item.id === draggedItem 
        ? { ...item, x: newX, y: newY }
        : item
    ));
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedItem, dragOffset]);

  if (!isOpen || mediaItems.length === 0) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className={styles.closeAllButton}
        onClick={handleClose}
        title="Close all windows"
      >
        ×
      </button>

      <motion.div className={styles.galleryContainer}>

        <AnimatePresence>
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.imageContainer}
              style={{
                left: item.x,
                top: item.y,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                zIndex: 1
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              onMouseDown={(e) => handleMouseDown(e, item.id)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.titleBar}>
                <span className={styles.titleText}>{item.filename}</span>
                <button
                  className={styles.closeButton98}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClose(item.id);
                  }}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.imageWrapper}>
                {item.isVideo ? (
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[item.id] = el;
                    }}
                    src={item.src}
                    className={styles.galleryImage}
                    controls
                    loop
                    muted
                    onDoubleClick={(e) => handleVideoDoubleClick(e, item.id)}
                    onError={(e) => {
                      console.log(`Video ${item.filename} not found:`, e.target.src);
                      handleItemClose(item.id);
                    }}
                    onLoadedData={() => {
                      console.log(`Video ${item.filename} loaded successfully`);
                    }}
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.filename}
                    className={styles.galleryImage}
                    onError={(e) => {
                      console.log(`Image ${item.filename} not found:`, e.target.src);
                      handleItemClose(item.id);
                    }}
                    onLoad={() => {
                      console.log(`Image ${item.filename} loaded successfully`);
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ImageGallery;
