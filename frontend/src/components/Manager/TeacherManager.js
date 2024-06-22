
import { useTeacherContext } from "../../Context/TeacherContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import TableComponent from "./TableComponent";
import { useUserContext } from "../../Context/UserContext";
export const TeacherManager = () => {
    const { teachers } = useTeacherContext();
    const navigate = useNavigate();
    const [allTeachers, setAllTeachers] = useState([]);

    useEffect(() => {
        setAllTeachers(teachers);
    }, [teachers]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Phone' },
        { header: 'Status' }
    ];

    const generateRow = (teacher, index) => (
        <GenerateTeacherTr key={index} data={teacher} navigate={navigate} />
    );

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Teachers</h5>
                            <TableComponent columns={columns} data={allTeachers} generateRow={generateRow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
const GenerateTeacherTr = ({ data, navigate }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";
    const { setOtherUser } = useUserContext();

    const clickTeacher = () => {
        setOtherUser(data);
        navigate('/admin/otherprofile');
    };

    return (
        <tr onClick={clickTeacher}>
            <td className="text-center"><img src={data.image} alt="" /></td>
            <td><div className="text-primary fw-bold">{data.name}</div></td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td><span className={bgActive}>{data.status}</span></td>
        </tr>
    );
};