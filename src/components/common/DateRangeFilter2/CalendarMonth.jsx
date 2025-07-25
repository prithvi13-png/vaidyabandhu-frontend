import React from 'react'
import CalendarDay from './CalendarDay'
import { WEEKDAYS } from './constants'

const CalendarMonth = ({ calendarDays, onDateClick }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 6,
      marginBottom: 8,
    }}
  >
    {WEEKDAYS.map((day, idx) => (
      <div
        key={idx}
        style={{
          textAlign: 'center',
          padding: 4,
          fontSize: '0.75rem',
          color: '#98a6ad',
          fontWeight: 600,
        }}
      >
        {day}
      </div>
    ))}

    {calendarDays.map((dateObj, idx) => (
      <CalendarDay key={idx} dateObj={dateObj} onClick={onDateClick} />
    ))}
  </div>
)

export default CalendarMonth
