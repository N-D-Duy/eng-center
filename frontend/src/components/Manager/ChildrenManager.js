import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from './TableComponent';
import { useUserContext } from '../../Context/UserContext';
import { useAuthContext } from '../../Context/AuthContext';
import { useChildrenContext } from '../../Context/ChildrenContext';

export const ChildrenManager = () => {
    const { allchildren } = useChildrenContext();
    const navigate = useNavigate();
    const [allStudents, setAllStudents] = useState([]);

    useEffect(() => {
        setAllStudents(allchildren);
    }, [allchildren]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Phone' }
    ];

    const generateRow = (student, index) => (
        <GenerateStudentTr key={index} data={student} navigate={navigate} />
    );

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Students</h5>
                            {console.log("All Child" ,allStudents)}
                            <TableComponent columns={columns} data={allStudents} generateRow={generateRow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GenerateStudentTr = ({ data, navigate }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";
    const { setOtherUser } = useUserContext();
    const {role} = useAuthContext();
    const clickOther = () => {
        console.log(data);
        setOtherUser(data);
        navigate(`/${role}/otherprofile`);
    };
    return (
        <tr onClick={clickOther}>
            <td className="text-center vertical-align"><img src={data.account.image} alt="" /></td>
            <td className= "vertical-align"><div className="text-primary fw-bold">{data.account.full_name}</div></td>
            <td className= "vertical-align">{data.account.email}</td>
            <td className= "vertical-align">{data.account.phone}</td>
        </tr>
    );
};
