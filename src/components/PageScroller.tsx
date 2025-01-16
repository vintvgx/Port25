import React, { useState, useEffect, ReactNode, TouchEvent, WheelEvent, useRef } from 'react';

interface PageScrollerProps {
  children: ReactNode;
}

const PageScroller: React.FC<PageScrollerProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef<number>(0);
  const scrollThreshold = 50; // Minimum delta Y to trigger scroll
  const scrollCooldown = 1000; // Milliseconds to wait before allowing another scroll
  const pages = React.Children.toArray(children);

  // Handle wheel scrolling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      
      const now = Date.now();
      if (isScrollingRef.current || now - lastScrollTime.current < scrollCooldown) {
        return;
      }

      // Only trigger scroll if the delta is significant enough
      if (Math.abs(e.deltaY) < scrollThreshold) {
        return;
      }
      
      isScrollingRef.current = true;
      setIsScrolling(true);
      lastScrollTime.current = now;
      
      if (e.deltaY > 0) {
        // Scrolling down
        setCurrentPage(prev => 
          prev === pages.length - 1 ? 0 : prev + 1
        );
      } else {
        // Scrolling up
        setCurrentPage(prev => 
          prev === 0 ? pages.length - 1 : prev - 1
        );
      }
      
      // Reset scrolling flag after animation
      timeoutId = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, scrollCooldown);
    };

    // Use type assertion for the event listener
    const wheelHandler = handleWheel as unknown as EventListener;
    window.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      clearTimeout(timeoutId);
    };
  }, [pages.length]); // Remove isScrolling from dependencies

  // Handle touch events for mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    console.log('touchStart', touchStart);
    console.log('isScrolling', isScrolling);
    console.log('touchStart === null', touchStart === null);
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    console.log('touchStart', touchStart);
    console.log('isScrolling', isScrolling);
    console.log('touchStart === null', touchStart === null);
    
    if (touchStart === null || isScrolling) {
      console.log('touchStart is null or isScrolling is true');
      return;
    }

    const touchEnd = e.touches[0].clientY;
    const delta = touchStart - touchEnd;

    if (Math.abs(delta) > 50) {
      setIsScrolling(true);
      
      if (delta > 0) {
        // Swipe up
        setCurrentPage(prev => 
          prev === pages.length - 1 ? 0 : prev + 1
        );
      } else {
        // Swipe down
        setCurrentPage(prev => 
          prev === 0 ? pages.length - 1 : prev - 1
        );
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    }
  };

  const handleTouchEnd = (): void => {
    setTouchStart(null);
  };

  return (
    <div 
      className="h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="transition-transform duration-1000 ease-in-out h-screen"
        style={{ transform: `translateY(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => (
          <div key={index} className="h-screen w-full ">
            {page}
          </div>
        ))}
      </div>
      
      {/* Optional navigation dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => !isScrolling && setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === index 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PageScroller;