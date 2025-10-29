"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import styles from "./HomeSlider.module.css";

export default function HomeSlider() {
  const images = [
    "/image/imgSlider1.png",
    "/image/imgSlider2.png",
    "/image/imgSlider3.png",
    "/image/imgSlider4.png",
  ];

  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidesPerView(3);
      else if (width >= 640) setSlidesPerView(1.4);
      else setSlidesPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (slidesPerView === null) return null;

  return (
    <div className={styles.container} dir="rtl">
   
      <div className={styles.textArea} dir="rtl">
        <h2 className={styles.title}>
          <span className={styles.icon}>؟</span> چرا تورینو؟
        </h2>
        <h3 className={styles.subtitle}>تور طبیعت‌گردی و تاریخی</h3>
        <p className={styles.paragraph}>
          اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در یک اقامتگاه بوم‌گردی اتاق بگیرید،
          تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید،
          می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
        </p>
      </div>

     
      <div className={styles.sliderArea}>
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setCurrent(s.realIndex)}
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={slidesPerView}
          spaceBetween={-60}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 140,
            modifier: 1,
            slideShadows: false,
          }}
          className={styles.mySwiper}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className={styles.slide}>
              <img src={src} alt={`slide-${idx}`} className={styles.slideImg} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.bottomNav}>
          <button
            className={styles.navBtn}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            &lt;
          </button>

          <div className={styles.fraction}>
            <span>{current + 1}</span>
            <span className={styles.sep}>/</span>
            <span>{images.length}</span>
          </div>

          <button
            className={styles.navBtn}
            onClick={() => swiperRef.current?.slideNext()}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
