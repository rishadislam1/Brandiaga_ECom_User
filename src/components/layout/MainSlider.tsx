
import React, { useEffect, useRef, useState } from "react";

const sliderImages = [
  "https://images.unsplash.com/photo-1544891618-0d88ad53d553?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=60"
];

const MainSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide left effect
  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setActiveIndex(prev =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 2800);
    return () => {
      slideIntervalRef.current && clearInterval(slideIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl mt-6 hidden md:block">
      <div
        className="whitespace-nowrap transition-transform duration-700"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`
        }}
      >
        {sliderImages.map((img, idx) => (
          <img
            src={img}
            alt={`slide-${idx}`}
            className="inline-block w-full h-80 object-cover"
            key={img}
            style={{ minWidth: "100%" }}
          />
        ))}
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {sliderImages.map((_, idx) => (
          <span
            key={idx}
            className={`block w-3 h-3 rounded-full ${
              idx === activeIndex ? "bg-brandiaga-yellow-400" : "bg-gray-300"
            } border-2 border-white`}
            style={{ transition: "background 0.3s" }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
