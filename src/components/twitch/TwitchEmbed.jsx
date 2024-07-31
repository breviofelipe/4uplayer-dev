
import "./TwitchEmbed.css";

const TwitchEmbed = ({ embedId }) => {
    return <div className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?video=${embedId}&autoplay=true&muted=true&time=0h2m30s&parent=localhost`}
        height="720"
        width="1280"
        allowfullscreen>
    </iframe>
  </div>
}

export default TwitchEmbed;