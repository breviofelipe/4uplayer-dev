
import "./TwitchEmbed.css";

const TwitchEmbed = ({ embedId }) => {
    return <div className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?video=${embedId}&autoplay=false&muted=true&time=0h0m00s&parent=localhost`}
        height="720"
        width="1280"
        allowfullscreen>
    </iframe>
  </div>
}

export default TwitchEmbed;