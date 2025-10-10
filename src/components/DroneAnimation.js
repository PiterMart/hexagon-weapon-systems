"use client"
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from '@/styles/DroneAnimation.module.css';

export default function DroneAnimation() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  
  // Reduced frame count - load every 2nd frame for 50% reduction
  const frameSkip = 2;
  const totalFrames = 192;
  const displayFrames = Math.floor(totalFrames / frameSkip);
  const fps = 15; // Reduced from 24 to 15 fps
  const frameDelay = 1000 / fps;

  // Lazy preload images - only load every Nth frame
  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad = [];
    let isCancelled = false;

    // Load images in batches to avoid blocking
    const loadBatch = async (startIndex, batchSize = 10) => {
      for (let i = startIndex; i < Math.min(startIndex + batchSize, displayFrames); i++) {
        if (isCancelled) return;
        
        const frameIndex = (i * frameSkip) + 1;
        const img = new window.Image();
        const frameNumber = String(frameIndex).padStart(4, '0');
        img.src = `/DRON ANIMATION 1/3D-drone-360${frameNumber}.png`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === displayFrames) {
              setImagesLoaded(true);
            }
            resolve();
          };
          img.onerror = resolve; // Continue even if image fails
        });
        
        imagesToLoad.push(img);
      }
      
      // Load next batch
      if (startIndex + batchSize < displayFrames && !isCancelled) {
        setTimeout(() => loadBatch(startIndex + batchSize, batchSize), 50);
      }
    };
    
    loadBatch(0);
    imageRefs.current = imagesToLoad;

    return () => {
      isCancelled = true;
    };
  }, [displayFrames, frameSkip]);

  // Use requestAnimationFrame for smoother animation
  const animate = useCallback((timestamp) => {
    if (!isPlaying || !imagesLoaded) {
      animationFrameRef.current = null;
      return;
    }

    if (timestamp - lastFrameTimeRef.current >= frameDelay) {
      setCurrentFrame(prev => {
        if (prev >= displayFrames) {
          return 1;
        }
        return prev + 1;
      });
      lastFrameTimeRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isPlaying, imagesLoaded, frameDelay, displayFrames]);

  useEffect(() => {
    if (isPlaying && imagesLoaded) {
      // Cancel any existing animation frame before starting a new one
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Clean up when conditions aren't met
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, imagesLoaded, animate]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Map display frame to actual frame number
  const actualFrameNumber = ((currentFrame - 1) * frameSkip) + 1;
  const frameNumber = String(actualFrameNumber).padStart(4, '0');

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.animationWrapper}>
        {!imagesLoaded && (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading animation frames... ({Math.round((imageRefs.current.length / displayFrames) * 100)}%)</p>
          </div>
        )}
        
        {imagesLoaded && (
          <>
            <div className={styles.imageContainer}>
              <Image
                src={`/DRON ANIMATION 1/3D-drone-360${frameNumber}.png`}
                alt={`Drone animation frame ${currentFrame}`}
                className={styles.droneImage}
                width={800}
                height={800}
                priority={currentFrame === 1}
                quality={75}
                loading={currentFrame === 1 ? "eager" : "lazy"}
                unoptimized={false}
              />
            </div>
            
            <div className={styles.controls}>
              <div className={styles.controlsRow}>
                <button 
                  onClick={togglePlayPause}
                  className={styles.playButton}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? '✠' : '✠'}
                </button>
                
                <input
                  type="range"
                  min="1"
                  max={displayFrames}
                  value={currentFrame}
                  onChange={(e) => setCurrentFrame(parseInt(e.target.value))}
                  className={styles.slider}
                />
                
                <div className={styles.frameInfo}>
                  <span>{currentFrame} / {displayFrames}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

