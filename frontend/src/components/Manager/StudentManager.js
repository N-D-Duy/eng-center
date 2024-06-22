import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from './TableComponent';
import { useStudentContext } from '../../Context/StudentContext';

export const StudentManager = () => {
    const { students, SetStudent } = useStudentContext();
    const navigate = useNavigate();
    const [allStudents, setAllStudents] = useState([]);

    useEffect(() => {
        setAllStudents(students);
    }, [students]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Phone' },
        { header: 'Status' }
    ];

    const generateRow = (student, index) => (
        <GenerateStudentTr key={index} data={student} navigate={navigate} setStudent={SetStudent} />
    );

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Students</h5>
                            <TableComponent columns={columns} data={allStudents} generateRow={generateRow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GenerateStudentTr = ({ data, navigate, setStudent }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";
    return (
        <tr onClick={() => clickStudent(data, navigate, setStudent)}>
            <td className="text-center"><img src={data.image} alt="" /></td>
            <td><div className="text-primary fw-bold">{data.name}</div></td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td><span className={bgActive}>{data.status}</span></td>
        </tr>
    );
};

const clickStudent = (data, navigate, setStudent) => {
    setStudent(data);
    navigate('/admin/studentprofile');
};
