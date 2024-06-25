import React, { useState } from 'react';
import { useAttendanceContext } from '../../Context/AttendanceContext';
import { useAuthContext } from '../../Context/AuthContext';
import { ButtonSave } from '../Buttons/ButtonSave';

export const CourseAttendance = () => {
    const { students, dates, attendanceData, markAttendance, checkAttendance } = useAttendanceContext();
    const { role } = useAuthContext();
    const today = new Date().toISOString().slice(0, 10);

    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});

    // Kiểm tra ngày hôm nay có trong danh sách không
    const canEditToday = dates.includes(today);

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
        setEditedData({});
    };

    const handleCheckboxChange = (studentId, date) => {
        console.log('Checkbox changed:', studentId, date);
        setEditedData(prevData => {
            const updatedData = { ...prevData };
            if (!updatedData[studentId]) {
                updatedData[studentId] = {};
            }
            updatedData[studentId][date] = !updatedData[studentId][date];
            return updatedData;
        });
    };

    const handleSubmit = () => {
        console.log('Submitting edited data:', editedData);
        // Gửi dữ liệu lên server
    };

    const renderButtons = () => {
        if (role === 'teacher' && canEditToday) {
            return <ButtonSave onClick={handleSubmit} />;
        }
        return null;
    };

    return (
        <div className="container-fluid">
            <div className="table-responsive containerScroll">
                <table className="table table-bordered table-hover" id="attendanceTable">
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky">Tất cả sinh viên</th>
                            {dates.map((date, index) => (
                                <th key={index} className={date === today ? 'editable text-center' : 'text-center'}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="sticky">{student.name}</td>
                                {dates.map((date, index) => (
                                    <td key={index} className="text-center">
                                        {editMode ? (
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="custom-checkbox"
                                                    checked={!!editedData[student._id]?.[date]}
                                                    onChange={() => handleCheckboxChange(student._id, date)}
                                                />
                                                {student.name}
                                            </label>
                                        ) : (
                                            <input
                                                type="checkbox"
                                                className="custom-checkbox"
                                                checked={checkAttendance(student._id, date)}
                                                disabled = {date !== today}
                                                onChange={() => handleCheckboxChange(student._id, date)}
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
