import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import { useCourseContext } from "../../Context/CourseContext";
import { useTeacherContext } from "../../Context/TeacherContext";
import { ButtonSave } from "../Buttons/ButtonSave";
import { useStudentContext } from "../../Context/StudentContext";
import { useParentContext } from "../../Context/ParentContext";
import { useAuthContext } from "../../Context/AuthContext";

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


export const FormEditTeacher = (prop)=>{
    const { teacher, updateTeacher } = useTeacherContext();

    const [name, setName] = useState(teacher.name);
    const [email, setEmail] = useState(teacher.email);
    const [phone, setPhone] = useState(teacher.phone);
    const [status, setStatus] = useState(teacher.status);

    useEffect(() => {
        setName(teacher.name);
        setEmail(teacher.email);
        setPhone(teacher.phone);
        setStatus(teacher.status);
    }, [teacher]);

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateTeacher(teacher.id, 'name', name);
        updateTeacher(teacher.id, 'email', email);
        updateTeacher(teacher.id, 'phone', phone);
        updateTeacher(teacher.id, 'status', status);
    };


    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form>
                <EditFormText label="Full Name" defaultValue={name} onChange={setName} />
                <EditFormText label="Email" defaultValue={email} onChange={setEmail()} />
                <EditFormText label="Phone" defaultValue={phone} onChange={setPhone()} />
                <EditFormText label="Status" defaultValue={status} onChange={setStatus()} />
                <ButtonSave onClick={handleSaveClick} title="Save" />
            </form>
        </div>
    );
}



export const FormEditUser = (prop)=>{
    const { user, updateUser } = useAuthContext();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [status, setStatus] = useState(user.status);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setStatus(user.status);
    }, [user]);

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateUser(user.id, 'name', name);
        updateUser(user.id, 'email', email);
        updateUser(user.id, 'phone', phone);
        updateUser(user.id, 'status', status);
    };


    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form>
                <EditFormText label="Full Name" defaultValue={name} onChange={setName} />
                <EditFormText label="Email" defaultValue={email} onChange={setEmail()} />
                <EditFormText label="Phone" defaultValue={phone} onChange={setPhone()} />
                <EditFormText label="Status" defaultValue={status} onChange={setStatus()} />
                <ButtonSave onClick={handleSaveClick} title="Save" />
            </form>
        </div>
    );
}

export const FormEditStudent = (prop)=>{
    const { student, updateStudent } = useStudentContext();

    const [fullName, setFullName] = useState(student.fullName);
    const [email, setEmail] = useState(student.email);
    const [phone, setPhone] = useState(student.phone);
    const [status, setStatus] = useState(student.status);

    useEffect(() => {
        setFullName(student.fullName);
        setEmail(student.email);
        setPhone(student.phone);
        setStatus(student.status);
    }, [student]);

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateStudent(student.id, 'fullName', fullName);
        updateStudent(student.id, 'email', email);
        updateStudent(student.id, 'phone', phone);
        updateStudent(student.id, 'status', status);
    };

    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form>
                <EditFormText label="Full Name" defaultValue={fullName} onChange={setFullName} />
                <EditFormText label="Email" defaultValue={email} onChange={setEmail()} />
                <EditFormText label="Phone" defaultValue={phone} onChange={setPhone()} />
                <EditFormText label="Status" defaultValue={status} onChange={setStatus()} />
                <ButtonSave onClick={handleSaveClick} title="Save" />
            </form>
        </div>
    );
}

export const FormEditParent = (prop)=>{
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

    const handleSaveClick = (e) => {
        e.preventDefault();
        updateParent(parent.id, 'userName', userName);
        updateParent(parent.id, 'email', email);
        updateParent(parent.id, 'phone', phone);
        updateParent(parent.id, 'status', status);
    };


    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form>
                <EditFormText label="Full Name" defaultValue={userName} onChange={setUserName} />
                <EditFormText label="Email" defaultValue={email} onChange={setEmail()} />
                <EditFormText label="Phone" defaultValue={phone} onChange={setPhone()} />
                <EditFormText label="Status" defaultValue={status} onChange={setStatus()} />
                <ButtonSave onClick={handleSaveClick} title="Save" />
            </form>
        </div>
    );
}



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