import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from './TableComponent';
import { useParentContext } from '../../Context/ParentContext';
import { useUserContext } from '../../Context/UserContext';
import { useAuthContext } from '../../Context/AuthContext';
import { userImageDefault } from '../../config/imageDefault';

export const ParentManager = () => {
    const { parents } = useParentContext();
    const navigate = useNavigate();
    const [allParents, setAllParents] = useState([]);

    useEffect(() => {
        setAllParents(parents);
    }, [parents]);

    const columns = [
        { header: 'Image' },
        { header: 'Name' },
        { header: 'Email' },
        { header: 'Phone' },
    ];

    const generateRow = (parent, index) => (
        <GenerateParentTr key={index} data={parent} navigate={navigate} />
    );

    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Parents</h5>
                            <TableComponent columns={columns} data={allParents} generateRow={generateRow} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const GenerateParentTr = ({ data, navigate, setParent }) => {
    const bgActive = data.status === 'active' ? "badge bg-success" : "badge bg-warning";
    const { setOtherUser } = useUserContext();

    const {role} = useAuthContext();
    
    const ClickOther = () => {
        setOtherUser(data);
        navigate(`/${role}/otherprofile`);
    };

    return (
        <tr onClick={ClickOther}>
            <td className="text-left vertical-align"><img src={data.account.image ? data.account.image : userImageDefault} alt="" style={{width: "50px"}}/></td>
            <td className= "vertical-align"><div className="text-primary fw-bold">{data.account.full_name}</div></td>
            <td className= "vertical-align">{data.account.email}</td>
            <td className= "vertical-align">{data.account.phone}</td>
        </tr>
    );
};

