
import "./TwitchEmbed.css";

const TwitchEmbed = ({ embedId }) => {
    return <div className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?channel=${embedId}&autoplay=true&muted=true&parent=4uplayer-dev.vercel.app`}
        height="720"
        width="1280"
        allowfullscreen>
    </iframe>
  </div>
}

export default TwitchEmbed;