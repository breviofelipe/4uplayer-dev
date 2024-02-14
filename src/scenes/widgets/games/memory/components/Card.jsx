
import classNames from "classnames";
import "./card.css";
import { Box, useTheme } from "@mui/material";
import { FaTheaterMasks } from "react-icons/fa";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
    const { palette } = useTheme();

    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
      };
      return (
        <div
          className={classNames("card", {
            "is-flipped": isFlipped,
            "is-inactive": isInactive
          })}
          onClick={handleClick}
        >
          <div className="card-face card-font-face">
            {/* <img src='https://res.cloudinary.com/dosghtja7/image/upload/v1696729580/assets/games/memory_hamlet/s3kv7y7cvo2qzcznt8gc.png' alt="verso" /> */}
            <FaTheaterMasks className="mask" size={36} color={palette.neutral.dark} />
          </div>
          <div className="card-face card-back-face">
            <FlexBetween style={{justifyContent: "center"}} >
              <UserImage image={card.image} size="75px"/>
            </FlexBetween>
          </div>
        </div>
      );

}

export default Card;