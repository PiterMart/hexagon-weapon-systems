import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const ScrollProgressRuler = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const percent = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollPercentage(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getOpacity = (position) => {
    const distanceFromCenter = Math.abs(position - scrollPercentage);
    return Math.max(0.7 * (1 - distanceFromCenter / 50), 0);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Horizontal Ruler */}
        <div style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: '5px',
          height: '40px',
          margin: '10px',
          background: 'transparent',
          zIndex: 9999,
          pointerEvents: 'none',
          transform: `translateX(${50 - scrollPercentage}%)`
        }}>
          {/* Ruler markings */}
          {Array.from({ length: 101 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '0',
              left: `${i}%`,
              width: '1px',
              height: i % 10 === 0 ? '20px' : i % 5 === 0 ? '15px' : '10px',
              background: `rgba(255, 255, 255, ${getOpacity(i)})`,
              transform: 'translateX(-50%)'
            }} />
          ))}

          {/* Percentage labels */}
          {Array.from({ length: 11 }).map((_, i) => {
            const position = i * 10;
            return (
              <div key={i} style={{
                position: 'absolute',
                top: '25px',
                left: `${position}%`,
                color: 'white',
                fontSize: '10px',
                transform: 'translateX(-50%)',
                opacity: getOpacity(position)
              }}>
                {position}%
              </div>
            );
          })}
        </div>

        {/* Mobile Center Indicator */}
        <div style={{
          position: 'fixed',
          left: '50%',
          bottom: '35px',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          textShadow: '0 0 2px rgba(0,0,0,0.5)',
          zIndex: 10000,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {scrollPercentage.toFixed(1)}%
          <div style={{
            height: '30px',
            width: '1px',
            background: 'rgba(255,255,255,0.9)',
            marginTop: '4px',
            boxShadow: '0 0 2px rgba(0,0,0,0.3)'
          }} />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop Vertical Ruler */}
      <div style={{
        position: 'fixed',
        left: '5px',
        top: 0,
        bottom: 0,
        width: '40px',
        margin: '10px',
        background: 'transparent',
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `translateY(${50 - scrollPercentage}%)`
      }}>
        {/* Ruler markings */}
        {Array.from({ length: 101 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '0',
            top: `${i}%`,
            height: '1px',
            width: i % 10 === 0 ? '20px' : i % 5 === 0 ? '15px' : '10px',
            background: `rgba(255, 255, 255, ${getOpacity(i)})`,
            transform: 'translateY(-50%)'
          }} />
        ))}

        {/* Percentage labels */}
        {Array.from({ length: 11 }).map((_, i) => {
          const position = i * 10;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: '25px',
              top: `${position}%`,
              color: 'white',
              fontSize: '10px',
              transform: 'translateY(-50%)',
              opacity: getOpacity(position)
            }}>
              {position}%
            </div>
          );
        })}
      </div>

      {/* Desktop Center Indicator */}
      <div style={{
        position: 'fixed',
        left: '35px',
        top: '49%',
        transform: 'translateY(-50%)',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        textShadow: '0 0 2px rgba(0,0,0,0.5)',
        zIndex: 10000,
        pointerEvents: 'none'
      }}>
        {scrollPercentage.toFixed(1)}%
        <div style={{
          width: '30px',
          height: '1px',
          background: 'rgba(255,255,255,0.9)',
          marginTop: '4px',
          boxShadow: '0 0 2px rgba(0,0,0,0.3)'
        }} />
      </div>
    </>
  );
};

export default ScrollProgressRuler;