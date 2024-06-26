import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './HookCountdown';
import "./CountdownTimer.css";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Saque liberado</span>
    </div>
  );
};

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
