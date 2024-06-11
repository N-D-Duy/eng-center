import { useState } from "react";
import { convertTime } from "../Controller/Time";
import { useCourseContext } from "../../Context/CourseContext";
import { useTeacherContext } from "../../Context/TeacherContext";

export const FormEditCourse = (prop)=>{
    const {course, updateCourse} = useCourseContext();
    const { teachers } = useTeacherContext();

    const [description, setDescription] = useState(course.description);
    const [name, setName] = useState(course.name);
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState(course.grade);
    const [status, setStatus] = useState(course.status);
    const [startCourse, setStartCourse] = useState(convertTime(course.startCourse));


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
                    <a href="#none" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                    <a href="#none" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                    </div>
                </div>
                </div>
                <div class="row mb-3">
                      <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
                      <div class="col-md-8 col-lg-9">
                        <textarea name="about" class="form-control" onChange={setDescription}>{course.description}</textarea>
                      </div>
                </div>
                <EditFormText label="Course Name" defaultValue={convertTime(name)} onChange={setName} />

                <EditFormText label="Grade" defaultValue={convertTime(grade)} onChange={setGrade} />

                <SelectOption keys={teachers} values={allTeacherName} title={'Teacher'} onChange={setTeacher}/>
                
                <SelectOption keys={['active', 'disactive', 'pending']} values={ ['Active', 'Disactive', 'Pending']} title={'Status'} onChange={setStatus}/>
               
                <EditFormText label="Start" defaultValue={convertTime(startCourse)} onChange={setStartCourse} />
               
                <div class="text-center">
                      <button type="submit" class="btn btn-primary" onClick={handleEvenetClick}>Save Changes</button>
                </div>
                </form>
            </div>
    </>)
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