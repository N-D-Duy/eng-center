// src/components/EventDetails.js
import React from 'react';

const EventDetails = ({ date, events }) => {
    if (!date) return <p>Select a date to see events</p>;

    const eventList = events.filter(event => new Date(event.date).toDateString() === date.toDateString());

    return (
        <div className="event-details">
            <h2>Events on {date.toDateString()}</h2>
            {eventList.length > 0 ? (
                eventList.map((event, index) => (
                    <div key={index} className="event-item">
                        <h3>{event.title}</h3>
                        <p>{event.date}</p>
                    </div>
                ))
            ) : (
                <p>No events or classes on this day.</p>
            )}
        </div>
    );
};

export default EventDetails;
