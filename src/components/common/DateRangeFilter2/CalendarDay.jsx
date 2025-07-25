import React from 'react'

const CalendarDay = ({ dateObj, onClick }) => {
  const { isCurrentMonth, isStart, isEnd, isSelected, isToday, day, date } = dateObj;

  return (
    <div
      onClick={() => onClick(date)}
      style={{
        textAlign: 'center',
        padding: '6px 0',
        cursor: 'pointer',
        borderRadius: '50%',
        width: 28,
        height: 28,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.85rem',
        color: !isCurrentMonth ? '#ccc' : isStart || isEnd ? '#fff' : '#495057',
        backgroundColor:
          isStart || isEnd ? '#057bff' : isSelected ? '#e6f2ff' : 'transparent',
        border: isToday ? '1px solid #adb5bd' : 'none',
        fontWeight: isStart || isEnd || isToday ? 600 : 400,
        transition: 'all 0.15s ease',
      }}
      className="calendar-day"
    >
      {day}
    </div>
  );
};

export default CalendarDay;
