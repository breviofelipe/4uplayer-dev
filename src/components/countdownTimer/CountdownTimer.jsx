import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './HookCountdown';
import "./CountdownTimer.css";

import PostButton from 'components/PostButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={'Dias'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Horas'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Secs'} isDanger={false} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  

  const fetchUnlock = async () =>{
    try{
      const response = await fetch(
          url+`/wallet/unlock-wallet`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        }
      );

      if(response.ok){
        navigate(0);
      }
    } catch (err){
      console.log(err);
    };      
  }

  const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Saque liberado</span>
        <PostButton onClick={fetchUnlock} text={'Desbloquear'}/>
      </div>
    );
  };

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
