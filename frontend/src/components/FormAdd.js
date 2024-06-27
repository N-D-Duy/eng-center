import { useContext, useEffect, useState } from "react";
import { useTeacherContext } from "../Context/TeacherContext";
import { useStudentContext } from "../Context/StudentContext";
import { useParentContext } from "../Context/ParentContext";
import { ButtonSave } from "./Buttons/ButtonSave";
import { useCourseContext } from "../Context/CourseContext";
const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

export const FormAddNewCourse = () => {
   const {AddNewCourse} = useCourseContext();
  const { teachers } = useTeacherContext();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [teacher, setTeacher] = useState([]);
  const [grade, setGrade] = useState();
  const [status, setStatus] = useState("active");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);


  
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [capacity, setCapacity] = useState();

  const handleDayToggle = async (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const handleEvenetClick = async (e) => {
    e.preventDefault();
    // call api at here and show Notice
    if(name == "" || description == "" || category == "" || teacher == "" || grade == "" || price == "" || capacity == "" ||
     status == "" || startDate == "" || endDate == "" || startTime == "" || endTime == "" || selectedDays.length == 0){
      alert("Please fill all required fields!");
      return;
    }
    const newCourse = {
      name: name,
      description: description,
      category: category,
      teacher: teacher._id,
      grade: grade,
      price: price,
      capacity: capacity,
      status: status,
      schedule: scheduleData,
    }
    const r = await AddNewCourse(newCourse);
    if (r) alert("Course information saved successfully!");
    else alert("Course information saved FAIL!");
    //Clear data
    setDescription("");
    setCategory("");
    setName("");
    setTeacher();
    setGrade("");
    setPrice(0);
    setCapacity(0);
    setStatus("active");
  };

  const allTeacherName = teachers.map((t) => t.name);

  const scheduleData = {
      startDate,
      endDate,
      startTime,
      endTime,
      selectedDays,
  };

  
  return (
    <div className="card cardStyle">
      <div className="card-body cardBodyStyle">
        <div class="row mb-3">
          <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">
            Profile Image
          </label>
          <div class="col-md-8 col-lg-9">
            <img src="" alt="Profile" />
            <div class="pt-2">
              <div
                class="btn btn-primary btn-sm"
                title="Upload new profile image"
              >
                <i class="bi bi-upload"></i>
              </div>
              <div
                class="btn btn-danger btn-sm"
                title="Remove my profile image"
              >
                <i class="bi bi-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="about" class="col-md-4 col-lg-3 col-form-label">
            About
          </label>
          <div class="col-md-8 col-lg-9">
            <textarea
              name="about"
              class="form-control"
              onChange={setDescription}
            >
              {description}
            </textarea>
          </div>
        </div>
        <EditFormText
          label="Course Name"
          defaultValue={name}
          onChange={setName}
        />
        <EditFormText
          label="Category"
          defaultValue={category}
          onChange={setCategory}
        />

        <EditFormText label="Grade" defaultValue={grade} onChange={setGrade} />
        <EditFormText label="Price" defaultValue={price} onChange={setPrice} />

        <SelectOption
          keys={teachers}
          values={allTeacherName}
          title={"Teacher"}
          onChange={setTeacher}
        />

        <SelectOption
          keys={["active", "disactive", "pending"]}
          values={["Active", "Disactive", "Pending"]}
          title={"Status"}
          onChange={setStatus}
        />

        <EditFormText
          label="Capacity"
          defaultValue={capacity}
          onChange={setCapacity}
        />
        <div className="card-body">
          <form>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time (HH:mm)</label>
            <input
              type="time"
              id="startTime"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time (HH:mm)</label>
            <input
              type="time"
              id="endTime"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Days of the Week</label><br />
            {daysOfWeek.map((day) => (
              <div key={day.value} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  id={day.value}
                  className="form-check-input"
                  checked={selectedDays.includes(day.value)}
                  onChange={() => handleDayToggle(day.value)}
                />
                <label htmlFor={day.value} className="form-check-label">{day.label}</label>
              </div>
            ))}
          </div>
          </form>
        </div>
        <ButtonSave onClick={handleEvenetClick} title={"Create Course"} />
      </div>
    </div>
  );
};

export const FormAddNewUser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState("teacher");
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState("active");
  const [studentIdCode, setStudentIdCode] = useState();

  const { AddNewTeacher } = useTeacherContext();
  const { AddNewParent } = useParentContext();
  const { AddNewStudent, fetchStudent } = useStudentContext();

  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      phone === "" ||
      role === ""
    ) {
      alert("Please fill all required fields!");
      return;
    }
    if (role === "parent" && studentIdCode === "") {
      alert("Please fill id student required");
      return;
    }
    //call api at here
    const newValueAccount = {
      user_name: email,
      full_name: name,
      password: password,
      role: role,
      status: status,
      emai: email,
      phone: phone,
    };
    switch (role) {
      case "teacher":
        //call api to create teacher
        const responseTeacher = await AddNewTeacher({
          account: newValueAccount,
          teacher: {
            session_count: 0,
          },
        });
        if (responseTeacher) alert("User information saved successfully!");
        else alert("User information saved FAIL!");
        break;
      case "student":
        const responseStudent = await AddNewStudent({
          account: newValueAccount,
          student: {
            session_count: 0,
          },
        });
        if (responseStudent) alert("User information saved successfully!");
        else alert("User information saved FAIL!");
        //call api to create student
        break;
      case "parent":
        const value = await fetchStudent(studentIdCode);
        if (value === null) {
          alert("Student not found. Try again");
          return;
        }
        await AddNewParent({
          account: newValueAccount,
          parent: {
            name: name,
            invite_code: studentIdCode,
          },
        });
        break;
      default:
        break;
    }
    //Clear input
    // setName("");
    // setEmail("");
    // setPhone("");
    // setPassword("");
    // setStatus("active");
  };

  return (
    <div className="card cardStyle">
      <div className="card-body cardBodyStyle">
        <EditFormText
          label="Full Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="col-12 formGroupStyle">
          <label htmlFor="roleSelect" className="form-label labelStyle" >
            Select
          </label>
          <div className="col-12">
            <select
              className="form-select selectStyle"
              id="roleSelect"
              aria-label="Default select example"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>
        </div>
        {role === "parent" && (
          <div
            className="col-12 formGroupStyle"
            id="register-studentID-div"
          >
            <label
              htmlFor="studentIdCode"
              className="form-label labelStyle"
            >
              Invited Code
            </label>
            <input
              type="text"
              name="studentIdCode"
              className="form-control inputStyle"
              onChange={(e) => setStudentIdCode(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please, enter the invited code!
            </div>
          </div>
        )}
        <EditFormText
          label="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <EditFormText
          label="Password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <EditFormText
          label="Phone"
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SelectOption
          keys={["active", "disactive", "pending"]}
          values={["Active", "Disactive", "Pending"]}
          title="Status"
          onChange={setStatus}
        />
        <ButtonSave title="Save" onClick={handleSaveClick} />
      </div>
    </div>
  );
};

const EditFormText = ({ label, defaultValue, onChange }) => {
  return (
    <div>
      <div class="row mb-3">
        <label class="col-md-4 col-lg-3 col-form-label">{label}</label>
        <div class="col-md-8 col-lg-9">
          <input
            class="form-control"
            value={defaultValue}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

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
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
          >
            {keys.map((key, index) => (
              <option value={key}>{values[index]}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
