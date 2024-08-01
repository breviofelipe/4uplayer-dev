
import { useEffect, useRef, useState } from "react";
import "./TwitchEmbed.css";

const TwitchEmbed = ({ embedId }) => {
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
      if (isVisible) {
          console.log('O componente está visível!');
          // Dispare qualquer ação desejada aqui
      }
      if(!isVisible){
          
      }
  }, [isVisible]);


    return <div ref={elementRef} className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?video=${embedId}&autoplay=${isVisible}&muted=true&time=0h0m00s&parent=4uplayer-dev.vercel.app`}
        height="720"
        width="1280"
        allowfullscreen>
    </iframe>
  </div>
}

export default TwitchEmbed;