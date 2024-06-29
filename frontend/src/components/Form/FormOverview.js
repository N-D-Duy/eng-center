import { useEffect, useState } from 'react';
import { useCourseContext } from '../../Context/CourseContext';
import { convertTime } from '../Controller/Time';
import { useUserContext } from '../../Context/UserContext';
import { DaysOfWeek } from './FormEdit';

export const OverviewCourse = () => {
    const {course} = useCourseContext();
    const [date, setDate] = useState();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(() => {
        setDate(convertTime(course.createdAt));
    }, [course]);

    const scheduleData = {
        startDate,
        endDate,
        startTime,
        endTime,
        selectedDays,
    };
    

    return (
        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                <h5 class="card-title">About</h5>
                <p class="small fst-italic">{course.description}</p>
                <h5 class="card-title">Profile Details</h5>
                <OverviewField label="Course Name" value={course.name} />
                <OverviewField label="Grade" value={`${course.name}.${course.grade}`} />
                <OverviewField label="Teacher" value={course.teacher.account.full_name} />
                <OverviewField label="Capacity" value={course.current_joined + "/" + course.capacity} />
                <OverviewField label="Category" value={course.category} />
                <OverviewField label="Price" value={course.price} />
                <OverviewField label="Status" value={course.status} />
                <OverviewField label="Begin" value={date} />
                <OverviewField label="End" value={date} />
                <div className="form-group">
                  <label>Days of the Week</label>
                  <br />
                  {DaysOfWeek.map((day) => (
                    <div
                      key={day.value}
                      className="form-check form-check-inline"
                    >
                      <input
                        type="checkbox"
                        id={day.value}
                        className="form-check-input"
                        checked={selectedDays.includes(day.value)}
                        disabled = {true}
                      />
                      <label htmlFor={day.value} className="form-check-label">
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
        </div>
    );
};



export const OverviewUser = () => {
    const { user } = useUserContext();

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Overview</h5>
            <OverviewField label="Full Name" value={user.account.full_name} />
            <OverviewField label="Email" value={user.email} />
            <OverviewField label="Phone" value={user.phone} />
            <OverviewField label="Status" value={user.status} />
            {/* Add more fields as needed */}
        </div>
    );
};


export const OverviewUserOther = () => {
    const { otherUser } = useUserContext();
    console.log(otherUser);
    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Overview</h5>
            <OverviewField label="Full Name" value={otherUser.account.full_name} />
            <OverviewField label="Email" value={otherUser.account.email} />
            <OverviewField label="Phone" value={otherUser.account.phone} />
            <OverviewField label="Status" value={otherUser.account.status} />
            {/* Add more fields as needed */}
        </div>
    );
};


const OverviewField = ({ label, value }) => {
    return (
        <div class="row">
            <div class="col-lg-3 col-md-4 label">{label}</div>
            <div class="col-lg-9 col-md-8">{value}</div>
        </div>
    );
};

export default OverviewCourse;
