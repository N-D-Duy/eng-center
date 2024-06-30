import { useTeacherContext } from "../../Context/TeacherContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import { useUserContext } from "../../Context/UserContext";
import { useAuthContext } from "../../Context/AuthContext";
import { userImageDefault } from "../../config/imageDefault";
export const TeacherManager = () => {
    const { teachers } = useTeacherContext();
    const navigate = useNavigate();
    const [allTeachers, setAllTeachers] = useState(teachers);

    useEffect(() => {
        setAllTeachers(teachers);
    }, [teachers]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Phone' },
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
    const { setOtherUser } = useUserContext();
    const {role} = useAuthContext();
    
    const clickTeacher = () => {
        setOtherUser(data);
        navigate(`/${role}/otherprofile`);
    };

    return (
        <tr onClick={clickTeacher}>
            <td className="text-left vertical-align"><img src={data.account.image ? data.account.image : userImageDefault} alt="" style={{width: "50px"}}/></td>
            <td className= "vertical-align"><div className="text-primary fw-bold">{data.account.full_name}</div></td>
            <td className= "vertical-align">{data.account.email}</td>
            <td className= "vertical-align">{data.account.phone}</td>
        </tr>
    );
};

