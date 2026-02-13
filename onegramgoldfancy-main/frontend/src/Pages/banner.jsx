import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const BannerCarousel = () => {
  const { banners, loadingBanners } = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const navigate = useNavigate();

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners]);

  /* ================= TOUCH HANDLERS ================= */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX.current - endX > 50) {
      setCurrent((prev) => (prev + 1) % banners.length);
    } else if (endX - startX.current > 50) {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  /* ================= SKELETON ================= */
  if (loadingBanners && banners.length === 0) {
    return (
      <div className="mt-14 px-4 pt-4">
        <div className="w-full h-[22vh] sm:h-[26vh] md:h-[70vh] rounded-xl bg-gray-300 animate-pulse" />
      </div>
    );
  }

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full mt-14 px-4 pt-4">
      <div
        className="relative w-full h-[22vh] sm:h-[26vh] md:h-[70vh] rounded-xl overflow-hidden shadow-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              {(banner.title || banner.paragraph) && (
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <div className="p-4 flex flex-col gap-2 max-w-[80%]">
                    {banner.title && (
                      <h2 className="text-lg sm:text-xl md:text-4xl font-semibold text-[#E6C873] leading-tight">
                        {banner.title}
                      </h2>
                    )}

                    {banner.paragraph && (
                      <p className="text-xs sm:text-sm md:text-lg text-white font-bold">
                        {banner.paragraph}
                      </p>
                    )}

                    {banner.button_text && (
                      <button
                        onClick={() => navigate("/products")}
                        className="mt-1 w-fit px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C9A24D] to-[#B08A2E]
           text-black text-xs md:text-base font-bold hover:bg-[#E6C873] transition"
                      >
                        {banner.button_text}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Pagination Dots */}
        <div className="absolute bottom-3 right-4 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                current === index
                  ? "bg-[#E6C873] scale-125"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
