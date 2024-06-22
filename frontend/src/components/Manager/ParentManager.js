import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from './TableComponent';
import { useParentContext } from '../../Context/ParentContext';
import { useUserContext } from '../../Context/UserContext';

export const ParentManager = () => {
    const { parents, } = useParentContext();
    const { setUserOther } = useUserContext();
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
        { header: 'Status' }
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

    const clickOther = () => {
        setOtherUser(data);
        navigate('/admin/otherprofile');
    };

    return (
        <tr onClick={clickOther}>
            <td className="text-center"><img src={data.image} alt="" /></td>
            <td><div className="text-primary fw-bold">{data.name}</div></td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td><span className={bgActive}>{data.status}</span></td>
        </tr>
    );
};

