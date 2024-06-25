import React from 'react';
import '../../attendance.css';
import { useAttendanceContext } from '../../Context/AttendanceContext';

export const CourseAttendance = () => {
    const { students, dates, markAttendance, checkAttendance } = useAttendanceContext();

    const handleCheckboxChange = (studentId, date) => {
        markAttendance(studentId, date);
    };

    return (
        <div className="container-fluid">
            <div className="table-responsive containerScroll">
                <table className="table table-bordered table-hover" id="attendanceTable">
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky">All Students</th>
                            {dates.map((date, index) => (
                                <th key={index}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="sticky">{student.name}</td>
                                {dates.map((date, index) => (
                                    <td key={index}>
                                        <input
                                            type="checkbox"
                                            className="custom-checkbox"
                                            checked={checkAttendance(student._id, date)}
                                            onChange={() => handleCheckboxChange(student._id, date)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
