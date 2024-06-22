import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import { useParentContext } from "../../Context/ParentContext";
import { ButtonSave } from "../Buttons/ButtonSave";

export const ParentProfile = () => {
    const { parent, updateParent } = useParentContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!parent) {
            const savedParent = localStorage.getItem('parent');
            if (savedParent) {
                updateParent(JSON.parse(savedParent));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (parent) {
            setLoading(false);
        }
    }, [parent]);

    const handleSaveClick = () => {
        // Implement saving logic
        // Example:
        // updateParent('userName', userName);
        // updateParent('email', email);
        // updateParent('phone', phone);
        // updateParent('status', status);
    };

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <section className="section profile">
                <div className="row">
                    {/* Profile card */}
                    <div className="col-xl-4">
                        {/* Replace with Parent-specific profile card component */}
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5 className="card-title">{parent?.userName}</h5>
                                {/* Add additional parent profile details */}
                                <p className="small fst-italic">{parent?.email}</p>
                                <p className="small fst-italic">{parent?.phone}</p>
                            </div>
                        </div>
                    </div>
                    {/* Edit form */}
                    <div className="col-xl-8">
                        {/* Replace with Parent-specific edit form component */}
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5 className="card-title">Edit Profile</h5>
                                {/* Replace with Parent-specific form component */}
                                <FormEditParent />
                                <ButtonSave onClick={handleSaveClick} title="Save" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const FormEditParent = () => {
    const { parent, updateParent } = useParentContext();

    const [userName, setUserName] = useState(parent.userName);
    const [email, setEmail] = useState(parent.email);
    const [phone, setPhone] = useState(parent.phone);
    const [status, setStatus] = useState(parent.status);

    useEffect(() => {
        setUserName(parent.userName);
        setEmail(parent.email);
        setPhone(parent.phone);
        setStatus(parent.status);
    }, [parent]);

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="userName" className="form-label">User Name</label>
                <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <input type="text" className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
        </form>
    );
};

export default ParentProfile;
