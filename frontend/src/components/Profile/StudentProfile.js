import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import { useStudentContext } from "../../Context/StudentContext";
import { ButtonSave } from "../Buttons/ButtonSave";

export const StudentProfile = () => {
    const { student, updateStudent } = useStudentContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!student) {
            const savedStudent = localStorage.getItem('student');
            if (savedStudent) {
                updateStudent(JSON.parse(savedStudent));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (student) {
            setLoading(false);
        }
    }, [student]);

    const handleSaveClick = () => {
        // Implement saving logic
        // Example:
        // updateStudent('userName', userName);
        // updateStudent('email', email);
        // updateStudent('phone', phone);
        // updateStudent('status', status);
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
                        {/* Replace with Student-specific profile card component */}
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5 className="card-title">{student?.userName}</h5>
                                {/* Add additional student profile details */}
                                <p className="small fst-italic">{student?.email}</p>
                                <p className="small fst-italic">{student?.phone}</p>
                            </div>
                        </div>
                    </div>
                    {/* Edit form */}
                    <div className="col-xl-8">
                        {/* Replace with Student-specific edit form component */}
                        <div className="card">
                            <div className="card-body pt-3">
                                <h5 className="card-title">Edit Profile</h5>
                                {/* Replace with Student-specific form component */}
                                <FormEditStudent />
                                <ButtonSave onClick={handleSaveClick} title="Save" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const FormEditStudent = () => {
    const { student, updateStudent } = useStudentContext();

    const [userName, setUserName] = useState(student.userName);
    const [email, setEmail] = useState(student.email);
    const [phone, setPhone] = useState(student.phone);
    const [status, setStatus] = useState(student.status);

    useEffect(() => {
        setUserName(student.userName);
        setEmail(student.email);
        setPhone(student.phone);
        setStatus(student.status);
    }, [student]);

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

export default StudentProfile;
