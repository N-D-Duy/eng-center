import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import { useCourseContext } from "../../Context/CourseContext";
import { useTeacherContext } from "../../Context/TeacherContext";
import { ButtonSave } from "../Buttons/ButtonSave";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/UserContext";

export const FormEditCourse = (prop)=>{
    const {course, updateCourse} = useCourseContext();
    const { teachers } = useTeacherContext();

    const [description, setDescription] = useState(course.description);
    const [name, setName] = useState(course.name);
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState(course.grade);
    const [status, setStatus] = useState(course.status);
    const [startCourse, setStartCourse] = useState(convertTime(course.startCourse));

    useEffect(() => {
        setStartCourse(convertTime(course.createdAt));
    }, [course]);


    const handleEvenetClick = (e) => {
        e.preventDefault();
        updateCourse('description', description);
        updateCourse('name', name);
        updateCourse('teacher', teacher);
        updateCourse('grade', grade);
        updateCourse('status', status);
        updateCourse('startCourse', convertTime(startCourse));
    }

    const allTeacherName = teachers.map(t => t.name);

    return (<>
        <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form>
                <div class="row mb-3">
                <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                <div class="col-md-8 col-lg-9">
                    <img src= {course.image} alt="Profile" />
                    <div class="pt-2">
                    <div class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></div>
                    <div class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></div>
                    </div>
                </div>
                </div>
                <div class="row mb-3">
                      <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
                      <div class="col-md-8 col-lg-9">
                        <textarea name="about" class="form-control" onChange={setDescription}>{course.description}</textarea>
                      </div>
                </div>
                <EditFormText label="Course Name" defaultValue={name} onChange={setName} />

                <EditFormText label="Grade" defaultValue={grade} onChange={setGrade} />

                <SelectOption keys={teachers} values={allTeacherName} title={'Teacher'} onChange={setTeacher}/>
                
                <SelectOption keys={['active', 'disactive', 'pending']} values={ ['Active', 'Disactive', 'Pending']} title={'Status'} onChange={setStatus}/>
               
                <EditFormText label="Start" defaultValue={convertTime(startCourse)} onChange={setStartCourse} />
               
                <ButtonSave onClick={handleEvenetClick} title={'Save'}/>
                </form>
            </div>
    </>)
}


export const FormEditUser = ()=>{
    const { user } = useUserContext();

    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [status, setStatus] = useState(user.status || "");

    useEffect(() => {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setStatus(user.status || "");
    }, [user]);

    const handleSaveClick = (e) => {
        e.preventDefault();

        alert("User information saved successfully!");
    };

    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form onSubmit={handleSaveClick}>
                <EditFormText label="Full Name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                <EditFormText label="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <EditFormText label="Phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                <EditFormText label="Status" defaultValue={status} onChange={(e) => setStatus(e.target.value)} />
                <ButtonSave title="Save" />
            </form>
        </div>
    );
}

export const FormEditUserOther = () => {
    const { otherUser, } = useUserContext();

    // State hooks for form fields
    const [name, setName] = useState(otherUser.name || "");
    const [email, setEmail] = useState(otherUser.email || "");
    const [phone, setPhone] = useState(otherUser.phone || "");
    const [status, setStatus] = useState(otherUser.status || "");

    // useEffect to update form fields when otherUser changes
    useEffect(() => {
        setName(otherUser.name || "");
        setEmail(otherUser.email || "");
        setPhone(otherUser.phone || "");
        setStatus(otherUser.status || "");
    }, [otherUser]);

    // Handle Save button click
    const handleSaveClick = (e) => {
        console.log("Save button clicked");
        e.preventDefault();
        // Call setOtherUser to update specific fields of otherUser

        // Optionally, you can add an alert or message to indicate successful save
        alert("User information saved successfully!");
    };

    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form onSubmit={handleSaveClick}>
                <EditFormText label="Full Name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                <EditFormText label="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <EditFormText label="Phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                <EditFormText label="Status" defaultValue={status} onChange={(e) => setStatus(e.target.value)} />
                <ButtonSave title="Save" />
            </form>
        </div>
    );
};

const EditFormText  = ({label, defaultValue, onChange}) => {
    return (<div>
        <div class="row mb-3">
            <label class="col-md-4 col-lg-3 col-form-label">{label}</label>
            <div class="col-md-8 col-lg-9">
                <input class="form-control" value={defaultValue} onChange={onChange} />
            </div>
    </div>
    </div>)
}



const SelectOption = ({ keys, values, title, onChange }) => {
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
    };

    return (
        <>
        <div className="row mb-3">
            <label class="col-md-4 col-lg-3 col-form-label">{title}</label>
            <div class="col-md-8 col-lg-9">
                        <select className="form-select" aria-label="Default select example" onChange={handleChange}>
                    {keys.map((key, index) => (
                        <option value={key}>
                            {values[index]}
                        </option>
                    ))}
                </select>
            </div>
           
        </div>
        </>
    );
};