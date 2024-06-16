import React, { useState } from 'react';
import '../../attendance.css';
import { ButtonSave } from '../Buttons/ButtonSave';

export const CourseAttendance = () => {
    const dataList = ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'];
    const studentsData = [
        {
            student: 'John Doe',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jane Smith',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jim Beam',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'John Doe',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jane Smith',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jim Beam',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'John Doe',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jane Smith',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jim Beam',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'John Doe',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jane Smith',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jim Beam',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'John Doe',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jane Smith',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
        {
            student: 'Jim Beam',
            dates: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02', '2022-01-03', '2022-01-01', '2022-01-02'],
        },
    ];
    

    const handleEventClick = () => {
        alert('Save clicked');
    }

    return (
        <div className="container-fluid">
            <div className="table-responsive containerScroll">
                <table className="table table-bordered table-hover" id="attendanceTable">
                    <thead className="thead-light">
                        <tr>
                            <th className="sticky">All Student</th>
                            <GenerateDate dataListDate={dataList} />
                        </tr>
                    </thead>
                    <tbody>
                        <GenerateStudent studentsData={studentsData} />
                    </tbody>
                </table>
            </div>
            <ButtonSave onClick={handleEventClick} />
        </div>
    );
};

const GenerateDate = ({ dataListDate }) => {
    return (
        <>
            {dataListDate.map((data, index) => (
                <th key={index}>{data}</th>
            ))}
        </>
    );
}

const GenerateStudent = ({studentsData}) => {
    return (
        <>
            {studentsData.map((data, index) => (
                <GenerateStudentTr key={index} data={data} />
            ))}
        </>
    );
}

const GenerateStudentTr = ({ data }) => {
    const [checkedDates, setCheckedDates] = useState([]);
    const handleCheckboxChange = (date) => {
        const isChecked = checkedDates.includes(date);

        if (isChecked) {
            // Nếu đã chọn, loại bỏ khỏi mảng
            setCheckedDates(checkedDates.filter(d => d !== date));
        } else {
            // Nếu chưa chọn, thêm vào mảng
            setCheckedDates([...checkedDates, date]);
        }
    };
    return (
        <tr>
            <td className="sticky">{data.student}</td>
            {data.dates.map((date, index) => (
                <td key={index} onClick={() => handleCheckboxChange(date)}>
                    <input type="checkbox" checked={checkedDates.includes(date)}/>
                </td>
            ))}
        </tr>
    );
}
