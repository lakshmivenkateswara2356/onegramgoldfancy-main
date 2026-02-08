import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import image from "../../Assets/nec.png";
import female from "../../Assets/dummy.webp";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const chainRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* ============================
       DESKTOP ANIMATION
    ============================ */
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(
        chainRef.current,
        { x: 300, y: 100, scale: 1 },
        { x: 300, y: 500 },
        0
      );

      tl.to(chainRef.current, {
        x: -600,
        y: 1200,
        scale: 1.5,
        delay: 0.3,
      });

      tl.to(chainRef.current, {
        x: 0,
        y: 1600,
        scale: 2,
        ease: "power2.out",
      });
    });

    /* ============================
       MOBILE ANIMATION
    ============================ */
    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-wrapper",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(
        chainRef.current,
        { x: 0, y: -100, scale: 1 },
        { x: 100, y: 100, scale: 1.1 },
        0
      );

      tl.to(chainRef.current, {
        x: -50,
        y: 1000,
        scale: 1.3,
      });

      tl.to(chainRef.current, {
        x: 0,
        y: 1430,
        scale: 1.6,
        ease: "power2.out",
      });
    });

    /* 🔥 REQUIRED FOR iOS */
    ScrollTrigger.refresh();

    return () => mm.revert();
  }, []);

  return (
    <main className="about-wrapper">
      {/* FLOATING CHAIN */}
      <img
        ref={chainRef}
        className="floating-chain"
        src={image}
        alt="Gold Chain"
      />

      {/* SECTION 1 */}
      <section className="section one">
        <div className="section-content">
          <h2>Our Gold Story</h2>
          <p>
            One Gram Gold Jewelry represents affordable luxury crafted for modern
            elegance.
          </p>
          <p>
            Inspired by traditional Indian designs, each piece reflects timeless
            beauty.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="section two">
        <div className="section-content">
          <h2>Crafted With Precision</h2>
          <p>
            Advanced gold plating techniques ensure long-lasting shine and
            durability.
          </p>
          <p>
            Each design is tested for comfort, strength, and brilliance.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="section three">
        <div className="section-content">
          <img src={female} alt="Model" />
        </div>
      </section>
    </main>
  );
};

export default About;