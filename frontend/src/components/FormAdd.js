import { useContext, useEffect, useState } from "react";
import { useTeacherContext } from "../Context/TeacherContext";
import { useStudentContext } from "../Context/StudentContext";
import { useParentContext } from "../Context/ParentContext";
import { Button } from "./Buttons/Button";
import { useCourseContext } from "../Context/CourseContext";
import { DaysOfWeek, EditFormText } from "./Form/FormEdit";

export const FormAddNewCourse = () => {
  const { AddNewCourse } = useCourseContext();
  const { teachers } = useTeacherContext();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [teacher, setTeacher] = useState([]);
  const [grade, setGrade] = useState();
  const [status, setStatus] = useState("active");
  const [startDate, setStartDate] = useState("");
  const [numberWeeks, setNumberWeek] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
    if (
      !name ||
      !description ||
      !category ||
      !teacher ||
      !grade ||
      !price ||
      !capacity ||
      !status ||
      !startDate ||
      !endTime ||
      !startTime ||
      !numberWeeks ||
      selectedDays.length === 0
    ) {
      alert("Please fill all required fields!");
      return;
    }
    //Check at here if startdate < today => alert("Start date must be greater than today")
    const today = new Date();
    const start = new Date(startDate);
    if (start < today) {
      alert("Start date must be greater than today");
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
    };
    console.log("NewCourse", newCourse);
    // const r = await AddNewCourse(newCourse);
    // if (r) alert("Course information saved successfully!");
    // else alert("Course information saved FAIL!");
    // //Clear data
    // setDescription("");
    // setCategory("");
    // setName("");
    // setTeacher();
    // setGrade("");
    // setPrice(0);
    // setCapacity(0);
    // setStatus("active");
  };

  const allTeacherName = teachers.map((t) => t.name);

  const scheduleData = {
    startDate,
    numberWeeks,
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

        <EditFormText
          label="Course Name"
          defaultValue={name}
          onChange={setName}
        />

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

        <label class="col-md-4 col-lg-3 col-form-label">Scheduele</label>
        <EditFormText
          label="Start Date"
          defaultValue={startDate}
          onChange={setStartDate}
          type={"date"}
        />
        <EditFormText
          label="Number of weeks"
          defaultValue={numberWeeks}
          onChange={setNumberWeek}
        />

        <div className="form-group">
          <label>Days of the Week</label>
          <br />
          {DaysOfWeek.map((day) => (
            <div key={day.value} className="form-check form-check-inline">
              <input
                type="checkbox"
                id={day.value}
                className="form-check-input"
                checked={selectedDays.includes(day.value)}
                onChange={() => handleDayToggle(day.value)}
              />
              <label htmlFor={day.value} className="form-check-label">
                {day.label}
              </label>
            </div>
          ))}
        </div>

        <EditFormText
          label="Start Time"
          defaultValue={startTime}
          onChange={setStartTime}
          type={"time"}
        />
        <EditFormText
          label="End Time"
          defaultValue={endTime}
          onChange={setEndTime}
          type={"time"}
        />
        <Button onClick={handleEvenetClick} title={"Create Course"} />
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
  const { AddNewStudent } = useStudentContext();

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
      user_name: name,
      full_name: name,
      password: password,
      role: role,
      status: status,
      email: email,
      phone: phone,
    };
    switch (role) {
      case "teacher":
        //call api to create teacher
        const responseTeacher = await AddNewTeacher({
          account: newValueAccount,
          teacher: {
            session_count: 0,
            account: "",
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
            account: newValueAccount,
          },
        });
        if (responseStudent) alert("User information saved successfully!");
        else alert("User information saved FAIL!");
        //call api to create student
        break;
      case "parent":
        const responseParent = await AddNewParent({
          account: newValueAccount,
          parent: {
            name: name,
            invite_code: studentIdCode,
            account: newValueAccount,
          },
        });
        if (responseParent) alert("User information saved successfully!");
        else alert("User information saved FAIL!");
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
        <div class="row mb-3" />
        <EditFormText
          label="Full Name"
          defaultValue={name}
          onChange={setName}
        />
        <SelectOption
          keys={["teacher", "student", "parent"]}
          values={["Teacher", "Student", "Parent"]}
          title="Role"
          actionChange={setRole}
        />
        {role === "parent" && (
          <EditFormText
            label="Invited Code"
            defaultValue={studentIdCode}
            onChange={setStudentIdCode}
          />
        )}
        <EditFormText label="Email" defaultValue={email} onChange={setEmail} />
        <EditFormText
          label="Password"
          defaultValue={password}
          onChange={setPassword}
        />
        <EditFormText label="Phone" defaultValue={phone} onChange={setPhone} />
        <SelectOption
          keys={["actived", "disactived", "pending"]}
          values={["Active", "Disactive", "Pending"]}
          title="Status"
          actionChange={setStatus}
        />
        <Button lable="Save" onClick={handleSaveClick} />
      </div>
    </div>
  );
};

const SelectOption = ({ keys, values, title, actionChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    actionChange(selectedValue);
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
