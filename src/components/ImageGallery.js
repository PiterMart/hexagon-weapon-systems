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
      '2025-10-09 02-04-31.mp4',
      'dron 11.webp',
      'dron 13.png',
      'dron 2.webp',
      'drone bob explotion car.gif',
      'drone gas attack.gif',
      'drone pov 2.gif',
      'drone pov 4.gif',
      'drone pov 5.webp',
      'drone pov 6.webp',
      'dronve pov 3.gif',
      'dronve pov 4.webp',
      'FIBER OPTICS DRONE.jpg',
      'tank 5.png',
      'title 5.png',
      'tittle.png'
    ],
    'pilot': [
      'dron 14.png',
      'dron 5.webp',
      'dron 6.webp',
      'dron 8.webp',
      'drone pilot.jpg',
      'drone pilot.png',
      'drone pilot.webp',
      'title 2.png'
    ],
    'swarm': [
      'dron 10.webp',
      'dron swarm.avif',
      'drone swarm.jpg',
      'dronw swarm.webp',
      'title 3.png',
      'title swarm.png'
    ],
    'tank': [
      '2025-10-09 02-05-19.mp4',
      '2025-10-09 02-21-35.mp4',
      '2025-10-09 02-21-56.mp4',
      '2025-10-09 02-22-42.mp4',
      '2025-10-09 02-23-54.mp4',
      '2025-10-09 02-24-45.mp4',
      'tank 3.png',
      'tank 4.png',
      'tank.webp'
    ],
    'soldiers': [
      '2025-10-09 02-15-09.mp4',
      '2025-10-09 02-15-42_1.mp4',
      '2025-10-09 02-18-47_1.mp4',
      'firing at drone.png',
      'title 4.png'
    ],
    'nightvision': [
      '2025-10-09 02-06-19.mp4',
      '2025-10-09 02-07-21.mp4',
      '2025-10-09 02-08-15.mp4',
      '2025-10-09 02-09-16.mp4',
      '2025-10-09 02-10-14.mp4'
    ],
    'drone case': [
      '2025-10-09 02-29-05.mp4',
      '2025-10-09 02-29-38.mp4',
      '2025-10-09 02-30-56.mp4'
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
