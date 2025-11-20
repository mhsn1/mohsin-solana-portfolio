import React, { useState, useRef, useEffect } from 'react';
// ✅ Standard <a> tag use kiya taake 'next/link' ka error na aaye
// CSS _app.js mein imported hai

const BlogSlider = ({ posts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgRef = useRef(null);
  const itemsRef = useRef([]);

  // --- Background Box Animation ---
  useEffect(() => {
    // Thoda wait karein taake DOM render ho jaye
    const timer = setTimeout(() => {
      const bg = bgRef.current;
      if (bg) {
        bg.classList.add('active');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // --- 3D Card Style Calculator ---
  const getStyle = (index) => {
    let offset = index - activeIndex;
    
    // Loop Logic: Agar last item ke baad first ana ho
    if (offset < -2) offset += posts.length;
    if (offset > 2) offset -= posts.length;
    
    let transform = '';
    let zIndex = 0;
    let opacity = 0;
    let pointerEvents = 'none';

    if (offset === 0) {
      // ACTIVE CARD (Center)
      transform = 'translate(-50%, -50%) scale(1)';
      zIndex = 10;
      opacity = 1;
      pointerEvents = 'auto';
    } else if (offset === 1) {
      // NEXT CARD (Right)
      transform = 'translate(10%, -50%) scale(0.85) perspective(1000px) rotateY(-35deg)';
      zIndex = 5;
      opacity = 0.7;
      pointerEvents = 'auto';
    } else if (offset === -1) {
      // PREV CARD (Left)
      transform = 'translate(-110%, -50%) scale(0.85) perspective(1000px) rotateY(35deg)';
      zIndex = 5;
      opacity = 0.7;
      pointerEvents = 'auto';
    } else if (offset === 2) {
      // FAR NEXT (Right background)
      transform = 'translate(60%, -50%) scale(0.7) perspective(1000px) rotateY(-45deg)';
      zIndex = 2;
      opacity = 0.4;
    } else if (offset === -2) {
      // FAR PREV (Left background)
      transform = 'translate(-160%, -50%) scale(0.7) perspective(1000px) rotateY(45deg)';
      zIndex = 2;
      opacity = 0.4;
    } else {
      // HIDDEN
      transform = 'translate(-50%, -50%) scale(0)';
      opacity = 0;
    }

    return { transform, zIndex, opacity, pointerEvents };
  };

  return (
    <div className="news-slider-wrapper">
      <div className="news-slider">
        
        {/* White Moving Background (Visual only) */}
        <div ref={bgRef} className="item-bg active"></div>

        {posts.map((post, index) => {
          const dateObj = new Date(post.date);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString('default', { month: 'short' });
          
          const styles = getStyle(index);
          const isActive = index === activeIndex;

          return (
            <div 
              key={post.slug}
              ref={el => itemsRef.current[index] = el}
              className={`news-slider__item ${isActive ? 'active' : ''}`}
              style={styles}
              onClick={() => setActiveIndex(index)}
            >
              <a href={`/blog/${post.slug}`} className="news__item">
                <div className="news-date">
                  <span className="news-date__title">{day}</span>
                  <span className="news-date__txt">{month}</span>
                </div>
                <div className="news__title">{post.title}</div>
                <p className="news__txt">
                  {post.excerpt ? post.excerpt.substring(0, 100) + "..." : "Read full article..."}
                </p>
                <div className="news__btn">READ MORE</div>
              </a>
            </div>
          );
        })}

        {/* Arrows */}
        <div className="news-slider__arrows">
          <button className="news-slider__arrow" onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="news-slider__arrow" onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogSlider;