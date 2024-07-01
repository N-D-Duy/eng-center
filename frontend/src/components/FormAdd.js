import { useState } from "react";
import { useTeacherContext } from "../Context/TeacherContext";
import { useStudentContext } from "../Context/StudentContext";
import { useParentContext } from "../Context/ParentContext";
import { Button } from "./Buttons/Button";
import { useCourseContext } from "../Context/CourseContext";
import { DaysOfWeek, EditFormText } from "./Form/FormEdit";
import { FirebaseImageUpLoad } from "./firebase/FirebaseImageUpLoad";
export const FormAddNewCourse = () => {
  const { AddNewCourse } = useCourseContext();
  const { teachers } = useTeacherContext();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [teacher, setTeacher] = useState([]);
  const [grade, setGrade] = useState();
  const [startDate, setStartDate] = useState("");
  const [numberWeeks, setNumberWeek] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setURL] = useState(null);

  const handleImageChange = (image) => {
    setSelectedImage(image); // Lưu ảnh đã chọn vào state của form
  };
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

    
    const newCourse ={
      "course": {
        name: name,
        description: description,
        category: category,
        price: +price,
        image: "http://example.com/image.jpg",
        grade: +grade,
        status: "active",
        teacher: teacher,
        capacity: +capacity,
        current_joined: 0
      },
      "schedule": {
        startDate: startDate,
        numberOfWeeks: +numberWeeks,
        daysOfWeek: selectedDays,
        startTime: startTime,
        endTime: endTime
      }
    };
    console.log("NewCourse", newCourse);
    const r = await AddNewCourse(JSON.stringify(newCourse));
    if (r) alert("Course information saved successfully!");
    else alert("Course information saved FAIL!");
    //Clear data
    // setDescription("");
    // setCategory("");
    // setName("");
    // setTeacher();
    // setGrade("");
    // setPrice(0);
    // setCapacity(0);
    // setStatus("active");
  };

  const allTeacherName = teachers.map((t) => t.account.full_name);

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
        <FirebaseImageUpLoad onImageChange={handleImageChange} onSetURL={setURL}/>

        <EditFormText
          label="Course Name"
          defaultValue={name}
          onChange={setName}
        />

        <EditFormText
          label="About"
          defaultValue={description}
          onChange={setDescription}
        />

        <EditFormText
          label="Category"
          defaultValue={category}
          onChange={setCategory}
        />

        <EditFormText label="Grade" defaultValue={grade} onChange={setGrade} />
        <EditFormText label="Price" defaultValue={price} onChange={setPrice} />

        <SelectOption
          keys={teachers.map((t) => t._id)}
          values={allTeacherName}
          title={"Teacher"}
          onChange={setTeacher}
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
        <Button onClick={handleEvenetClick} lable={"Create Course"} />
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
  const [studentIdCode, setStudentIdCode] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { AddNewTeacher } = useTeacherContext();
  const { AddNewParent } = useParentContext();
  const { AddNewStudent } = useStudentContext();
  const [url, setURL] = useState("https://firebasestorage.googleapis.com/v0/b/engcenter-cd204.appspot.com/o/images%2Fbxcwogzk32u?alt=media&token=7d312ea0-6ab8-43fd-ab4e-f01a41989040");

  const handleImageChange = (image) => {
    setSelectedImage(image); // Lưu ảnh đã chọn vào state của form
  };
  const handleSaveClick = async (e) => {
    console.log("Save Click: ", url);
    // e.preventDefault();
    // if (
    //   email === "" ||
    //   password === "" ||
    //   name === "" ||
    //   phone === "" ||
    //   role === ""
    // ) {
    //   alert("Please fill all required fields!");
    //   return;
    // }
    // if (role === "parent" && studentIdCode === "") {
    //   alert("Please fill id student required");
    //   return;
    // }
    
    // //call api at here
    // const newValueAccount = {
    //   user_name: name,
    //   full_name: name,
    //   password: password,
    //   role: role,
    //   status: "actived",
    //   email: email,
    //   phone: phone,
    // };
    // console.log("Save Click");
    // switch (role) {
    //   case "teacher":
    //     //call api to create teacher
    //     const dataTeacher = {
    //       "account": newValueAccount,
    //       "teacher": {
    //         session_count: 0,
    //         account: "",
    //       },
    //     }
    //     const responseTeacher = await AddNewTeacher(JSON.stringify(dataTeacher));
    //     if (responseTeacher) alert("User information saved successfully!");
    //     else alert("User information saved FAIL!");
    //     break;
    //   case "student":
    //     const dataStudent = {
    //       "account": newValueAccount,
    //       "student": {
    //         cocc_percent: 0,
    //         tuition_due: 0,
    //         tuition_total: 0,
    //         parent: "",
    //         account: ""
    //       }
    //     };
    //     console.log("Save Click");
    //     const responseStudent = await AddNewStudent(JSON.stringify(dataStudent)
    //     );
    //     if (responseStudent) alert("User information saved successfully!");
    //     else alert("User information saved FAIL!");
    //     //call api to create student
    //     break;
    //   case "parent":
    //     const dataParent = {
    //       account: newValueAccount,
    //       parent: {
    //         name: name,
    //         invite_code: studentIdCode,
    //         account: newValueAccount,
    //       },
    //     };
    //     const responseParent = await AddNewParent(JSON.stringify(dataParent));
    //     if (responseParent) alert("User information saved successfully!");
    //     else alert("User information saved FAIL!. Try Again!");
    //     break;
    //   default:
    //     break;
    // }
    // //Clear input
    // // setName("");
    // // setEmail("");
    // // setPhone("");
    // // setPassword("");
    // // setStatus("active");
  };

  return (
    <div className="card cardStyle">
      <div className="card-body cardBodyStyle">
        <div class="row mb-3" />
        <FirebaseImageUpLoad onImageChange={handleImageChange} onSetURL={setURL}/>

        <EditFormText
          label="Full Name"
          defaultValue={name}
          onChange={setName}
        />
        <SelectOption
          keys={["teacher", "student", "parent"]}
          values={["Teacher", "Student", "Parent"]}
          title= {"Role"}
          onChange={setRole}
        />
        {role === "parent" && (
          <>
            <EditFormText
              label="Invited Code"
              defaultValue={studentIdCode}
              onChange={setStudentIdCode}
            />
          </>
        )}
        <EditFormText label="Email" defaultValue={email} onChange={setEmail} />
        <EditFormText
          label="Password"
          defaultValue={password}
          onChange={setPassword}
        />
        <EditFormText label="Phone" defaultValue={phone} onChange={setPhone} />
        <Button lable="Save" onClick={handleSaveClick} />
      </div>
    </div>
  );
};

const SelectOption = ({ keys, values, title, onChange }) => {
  return (
    <>
      <div className="row mb-3">
        <label className="col-md-4 col-lg-3 col-form-label">{title}</label>
        <div className="col-md-8 col-lg-9">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => onChange(e.target.value)}
          >
            {keys.map((key, index) => (
              key._id ? <option value={key._id}>{values[index]}</option> : <option value={key}>{values[index]}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
