// src/components/EventCalendar.js
import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateDates = (month, year) => {
    const dates = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevMonthDays = firstDay.getDay();
    const nextMonthDays = 6 - lastDay.getDay();

    // Thêm các ngày từ tháng trước
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        dates.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }

    // Thêm các ngày trong tháng hiện tại
    for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Thêm các ngày từ tháng tiếp theo
    for (let i = 1; i <= nextMonthDays; i++) {
        dates.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return dates;
};

const EventCalendar = ({ onDateClick, events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const dates = generateDates(currentMonth, currentYear);


    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const getEventsForDate = (date) => {
        return events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    };

    return (
        <Container className="calendar-container">
            <h1>Event Calendar</h1>
            <div className="calendar-controls">
                <Button variant="secondary" onClick={handlePrevMonth}>Previous</Button>
                <Button variant="secondary" onClick={handleNextMonth}>Next</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {daysOfWeek.map(day => <th key={day}>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: Math.ceil(dates.length / 7) }).map((_, weekIndex) => (
                        <tr key={weekIndex}>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const { date, isCurrentMonth } = dates[weekIndex * 7 + dayIndex];
                                const eventList = getEventsForDate(date);
                                return (
                                    <td
                                        key={dayIndex}
                                        onClick={isCurrentMonth ? () => onDateClick(date) : null}
                                        className={!isCurrentMonth ? 'disabled-day' : ''}
                                    >
                                        {date && date.getDate()}
                                        {date && isCurrentMonth && eventList.length > 0 && (
                                            <div className="event-indicators">
                                                {eventList.map((_, index) => (
                                                    <div key={index} className="event-indicator"></div>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default EventCalendar;


const Event = ({ date, events }) => {
    if (!date) return null; // Kiểm tra nếu date là undefined

    const eventList = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    return (
        <div>
            {eventList.map((event, index) => (
                <div key={index} className="event">
                    {event.title}
                </div>
            ))}
        </div>
    );
};