"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function HeroVideoCarousel({ videos, ctaLabel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);

  const activeVideo = useMemo(() => videos[activeIndex], [videos, activeIndex]);

  useEffect(() => {
    const videoNode = videoRef.current;

    if (!videoNode) {
      return undefined;
    }

    const handleEnded = () => {
      setActiveIndex((current) => (current + 1) % videos.length);
    };

    videoNode.addEventListener("ended", handleEnded);

    const safetyTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % videos.length);
    }, 9000);

    videoNode.play().catch(() => {
      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % videos.length);
      }, 4000);
    });

    return () => {
      videoNode.removeEventListener("ended", handleEnded);
      window.clearTimeout(safetyTimer);
    };
  }, [activeVideo, videos.length]);

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
        <div className="hero-lower-bar">
          <div className="hero-indicators" aria-label="Video navigation">
            {videos.map((video, index) => (
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
            href={activeVideo.creditUrl}
            target="_blank"
            rel="noreferrer"
          >
            {ctaLabel}
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
