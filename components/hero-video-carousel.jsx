"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideoCarousel({ videos, ctaLabel, lang = "tr" }) {
  const safeVideos = Array.isArray(videos) ? videos : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  const activeVideo = safeVideos[activeIndex] ?? safeVideos[0];
  const activeCaption =
    activeVideo?.captions?.[lang] ?? activeVideo?.captions?.tr ?? "";

  useEffect(() => {
    const videoNode = videoRef.current;

    if (!videoNode || !activeVideo) {
      return undefined;
    }

    const handleEnded = () => {
      setActiveIndex((current) => (current + 1) % safeVideos.length);
    };

    videoNode.addEventListener("ended", handleEnded);

    const safetyTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % safeVideos.length);
    }, 9000);

    videoNode.play().catch(() => {
      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % safeVideos.length);
      }, 4000);
    });

    return () => {
      videoNode.removeEventListener("ended", handleEnded);
      window.clearTimeout(safetyTimer);
    };
  }, [activeVideo, safeVideos.length]);

  if (!activeVideo) {
    return null;
  }

  return (
    <div className="hero-video-shell" id="hemen-basla">
      <video
        key={activeVideo.src}
        ref={videoRef}
        className="hero-video"
        src={activeVideo.src}
        autoPlay
        muted
        playsInline
        preload="metadata"
      />

      <div className="hero-video-overlay" />

      <div className="hero-video-content">
        {activeCaption ? (
          <p key={activeIndex} className="hero-caption">
            {activeCaption}
          </p>
        ) : null}

        <div className="hero-lower-bar">
          <div className="hero-indicators" aria-label="Video navigation">
            {safeVideos.map((video, index) => (
              <button
                key={video.src}
                type="button"
                className={`hero-indicator ${
                  index === activeIndex ? "is-active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show clip ${index + 1}: ${video.title}`}
              />
            ))}
          </div>

          <a
            className="hero-approach-link"
            href="#yaklasimimiz"
          >
            {ctaLabel}
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
