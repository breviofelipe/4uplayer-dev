
import { useEffect, useRef, useState } from "react";
import "./TwitchEmbed.css";

const TwitchEmbed = ({ embedId }) => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              setIsVisible(entry.isIntersecting);
          },
          { threshold: 1 } // Ajuste o threshold conforme necessário
      );

      if (elementRef.current) {
          observer.observe(elementRef.current);
      }

      return () => {
          if (elementRef.current) {
              observer.unobserve(elementRef.current);
          }
      };
  }, []);

  useEffect(() => {

  }, [isVisible]);


    return <div ref={elementRef} className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?video=${embedId}&autoplay=${isVisible}&muted=true&time=0h0m00s&parent=${domain}`}
        height="720"
        width="1280"
        allowFullScreen
        >
    </iframe>
  </div>
}

export default TwitchEmbed;