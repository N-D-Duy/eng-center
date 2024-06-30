import React, { useState, useEffect } from 'react';
import { useAttendanceContext } from '../../Context/AttendanceContext';
import { useAuthContext } from '../../Context/AuthContext';
import { Button } from '../Buttons/Button';
import { useUserContext } from '../../Context/UserContext';
import { useCourseContext } from '../../Context/CourseContext';

export const CourseAttendance = () => {
    const { students, dates, SetDataAttendance, checkAttendance } = useAttendanceContext();
    const { role } = useAuthContext();
    const today = new Date().toISOString().slice(0, 10);
    const [initialAttendance, setInitialAttendance] = useState({});
    const [editMode, setEditMode] = useState(true);
    const {user} = useUserContext();
    const {courseDetail} = useCourseContext();

    useEffect(() => {
        const initialData = {};
        students.forEach(student => {
            initialData[student._id] = {};
            dates.forEach(date => {
                initialData[student._id][date] = checkAttendance(student._id, date);
            });
        });
        setInitialAttendance(initialData);
    }, [students, dates, checkAttendance]);

    const canEdit = dates.includes(today) && courseDetail.course.teacher._id === user._id && role === 'teacher';

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
    };

    const handleCheckboxChange = (studentId, date) => {
        setInitialAttendance(prevData => ({
            ...prevData,
            [studentId]: {
                ...prevData[studentId],
                [date]: !prevData[studentId][date],
            },
        }));
    };

    const handleSubmit = () => {
        console.log('Submitting edited data:', initialAttendance);
        SetDataAttendance(initialAttendance, today);
        // Gửi dữ liệu lên server
    };

    const renderButtons = () => {
        if (canEdit) {
            return <Button onClick={handleSubmit} />;
        }
        return null;
    };

    return (
        <div className="container-fluid">
            {console.log('today', today)}
            <div className="table-responsive containerScroll">
                <table className="table table-bordered table-hover" id="attendanceTable">
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky">Tất cả sinh viên</th>
                            {dates.map((date, index) => (
                                <th key={index} className={date === today ? 'editable text-center' : 'text-center'}>
                                    {date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="sticky">{student.account.full_name}</td>
                                {dates.map((date, index) => (
                                    <td key={index} className="text-center">
                                        {editMode && date === today ? (
                                            <input
                                                type="checkbox"
                                                className="custom-checkbox"
                                                checked={initialAttendance[student._id]?.[date] ?? false}
                                                onChange={() => handleCheckboxChange(student._id, date)}
                                            />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                className="custom-checkbox"
                                                checked={initialAttendance[student._id]?.[date] ?? false}
                                                disabled={date !== today || role !== 'teacher'}
                                            />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {renderButtons()}
        </div>
    );
};
