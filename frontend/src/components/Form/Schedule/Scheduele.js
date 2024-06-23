import React, { useEffect, useState } from 'react';
import EventCalendar from './EventCalendar';
import EventDetails from './EventDetails';
import { Container, Row, Col } from 'react-bootstrap';
import { useScheduleContext } from '../../../Context/ScheduleContext';

export const Schedule = () => {
    const { scheduleData } = useScheduleContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState(scheduleData);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        setEvents(scheduleData);
    }, [scheduleData]);

    return (
        <Container className="main-container">
            <Row>
                <Col md={6} className="calendar-column">
                <EventCalendar onDateClick={handleDateClick} events = {events} />
                </Col>
                <Col md={6} className="details-column">
                    <EventDetails date={selectedDate} events={events} />
                </Col>
            </Row>
        </Container>
    );
};
