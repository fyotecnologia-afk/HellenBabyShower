"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import weddingData from "@/data/weddingData.json";
import styles from "@/styles/Welcome.module.css";
import stylesTrail from "@/styles/TrailAnimation.module.css";
import { TypeAnimation } from "react-type-animation";

const Welcome: React.FC = () => {
  const { names, date } = weddingData;

  const mesesAbreviados = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  const eventDate = new Date(date);
  const dia = String(eventDate.getDate()).padStart(2, "0");
  const mes = mesesAbreviados[eventDate.getMonth()];
  const año = eventDate.getFullYear();

  // Refs
  const subtitleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Control del typewriter
  const [startAnimation, setStartAnimation] = useState(false);

  const frase = weddingData?.frase ?? "NOS ELEGIMOS PARA SIEMPRE";

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.5 },
    });

    if (
      subtitleRef.current &&
      titleRef.current &&
      namesRef.current &&
      dateRef.current
    ) {
      tl.from(subtitleRef.current, { opacity: 0, y: 20 })
        .from(titleRef.current, { opacity: 0, y: 20 })

        // 👉 Aquí empieza el typewriter
        .add(() => {
          setStartAnimation(true);
        })

        // 👉 Después aparecen estos
        .from(namesRef.current, { opacity: 0, scale: 0.8 }, "+=2")
        .from(dateRef.current, { opacity: 0, y: 20 }, "-=0.6");
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div
        ref={subtitleRef}
        className={styles.header}
        style={{ marginTop: 80 }}
      >
        <h1 ref={titleRef} className={styles.names}>
          it's a girl!
        </h1>
      </div>

      {/* Frase con typing */}
      <div className={stylesTrail.container}>
        <div className={stylesTrail.quoteWrapper}>
          {startAnimation && (
            <TypeAnimation
              sequence={[frase, 1000]}
              wrapper="span"
              cursor={false}
              speed={50}
              className={stylesTrail.quoteText}
            />
          )}
        </div>
      </div>

      {/* Nombres */}
      <h1 ref={namesRef} className={styles.names}>
        {names}
      </h1>

      {/* Fecha */}
      <div ref={dateRef} className={styles.dateWrapper}>
        <div className={styles.dateBlock}>
          <span className={styles.line}></span>
          <span className={styles.weekday}>
            {eventDate
              .toLocaleDateString("es-MX", { weekday: "long" })
              .toUpperCase()}
          </span>
          <span className={styles.line}></span>
        </div>

        <div className={styles.dateCenter}>
          <span className={styles.month}>{mes}</span>
          <span className={styles.day}>{dia}</span>
        </div>

        <div className={styles.dateBlock}>
          <span className={styles.line}></span>
          <span className={styles.year}>{año}</span>
          <span className={styles.line}></span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
