// src/components/EventDetails.js
import React from 'react';

const EventDetails = ({ date, events }) => {
    if (!date) return <p>Select a date to see events</p>;

    const eventList = events.filter(event => new Date(event.day).toDateString() === date.toDateString());

    return (
        <div className="event-details">
            <h2>Schedule on {date.toDateString()}</h2>
            {console.log("EventList:" , eventList)}
            {eventList.length > 0 ? (
                eventList.map((event, index) => (
                    <CardSchedule key={index} name={event.course.name} teacher={event.teacher.name} start_time={event.start_time} end_time={event.end_time} />
                ))
            ) : (
                <p>There is no event on this day</p> 
            )}
        </div>
    );
};

const CardSchedule = (prop) => {
    return (<>
        <div className='container mt-5'>
            <div className='card shadow bg-primary'>
                <div className='card-body'>
                <div className='row gx-md-4 gy-4'>
                    <div className='col-md-6'>
                    <div className='info-box'>
                        <i className='bi bi-geo-alt fs-2 text-light'></i>
                        <div>
                        <h3 className='text-light'>Course</h3>
                        <p className='text-light'>{prop.name}</p>
                        </div>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='info-box'>
                        <i className='bi bi-telephone fs-2 text-light'></i>
                        <div>
                        <h3 className='text-light'>Teacher</h3>
                        <p className='text-light'>{prop.teacher}</p>
                        </div>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='info-box'>
                        <i className='bi bi-clock fs-2 text-light'></i>
                        <div>
                        <h3 className='text-light'>Start Time</h3>
                        <p className='text-light'>{prop.start_time}</p>
                        </div>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='info-box'>
                        <i className='bi bi-clock fs-2 text-light'></i>
                        <div>
                        <h3 className='text-light'>End Time</h3>
                        <p className='text-light'>{prop.end_time}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </>)
}

export default EventDetails;
