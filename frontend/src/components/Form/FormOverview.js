import React, { useState } from 'react';
import { useAppContext } from '../../Context/AppContext';

const OverviewCourse = () => {
    const {course} = useAppContext();
    const [description, setDescription] = useState(course.description);
    const [name, setName] = useState(course.name);
    const [teacher, setTeacher] = useState(course.teacher.name);
    const [grade, setGrade] = useState(course.grade);
    const [status, setStatus] = useState(course.status);
    const [capacity, setCapacity] = useState(course.capacity);
    const [startCourse, setStartCourse] = useState(convertTime(course.startCourse));

    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 className="card-title">Description</h5>
            <textarea
                className="small fst-italic form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <h5 className="card-title">Course Details</h5>
            <OverviewField label="Course" value={name} onChange={(e) => setName(e.target.value)} />
            <OverviewField label="Teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
            <OverviewField label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
            <OverviewField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
            <OverviewField label="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            <OverviewField label="Start-Course" value={startCourse} onChange={(e) => setStartCourse(e.target.value)} />
        </div>
    );
};

const OverviewField = ({ label, value, onChange }) => {
    return (
        <div className="row mb-3">
            <div className="col-lg-3 col-md-4 label">{label}</div>
            <div className="col-lg-9 col-md-8">
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default OverviewCourse;

function convertTime(time) {
    // Implement your time conversion logic here
    return time;
}
