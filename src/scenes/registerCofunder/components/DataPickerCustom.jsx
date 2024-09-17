import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';




const DataPickerCustom = ({ initialDate = new Date() , onChange }) => {
    const { palette } = useTheme();
const DatePickerWrapper = styled.div`
  display: flex;
  background-color: ${palette.background.default};
  border-radius: 50px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  font-family: Arial, sans-serif;
`;

const DateSection = styled.div`
  padding: 10px 20px;
  color: white;
  text-align: center;
`;

const Day = styled(DateSection)`
  background-color: #01061C;
  border-radius: 40px 0 0 40px;
  font-size: 24px;
  font-weight: bold;
  min-width: 60px;
`;

const Month = styled(DateSection)`
  background-color: #01061C;
  font-size: 18px;
  flex-grow: 1;
  padding: 10px 30px;
`;

const Year = styled(DateSection)`
  background-color: #01061C;
  border-radius: 0 40px 40px 0;
  font-size: 24px;
  font-weight: bold;
  min-width: 80px;
`;
  const [date, setDate] = useState(initialDate);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleDayClick = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    updateDate(newDate);
  };

  const handleMonthClick = () => {
    const newDate = new Date(date);
    newDate.setMonth((date.getMonth() + 1) % 12);
    updateDate(newDate);
  };

  const handleYearClick = () => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - 1);
    updateDate(newDate);
  };

  const updateDate = (newDate) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <DatePickerWrapper>
      <Day onClick={handleDayClick}>{String(date.getDate()).padStart(2, '0')}</Day>
      <Month onClick={handleMonthClick}>{months[date.getMonth()]}</Month>
      <Year onClick={handleYearClick}>{date.getFullYear()}</Year>
    </DatePickerWrapper>
  );
};

export default DataPickerCustom;