import { useEffect, useState } from "react";
import { convertTime } from "../Controller/Time";
import { useCourseContext } from "../../Context/CourseContext";
import { useTeacherContext } from "../../Context/TeacherContext";
import { ButtonSave } from "../Buttons/ButtonSave";
import { useAuthContext } from "../../Context/AuthContext";
import { useUserContext } from "../../Context/UserContext";
export const DaysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export const FormEditCourse = (prop) => {
  const { course, updateCourse } = useCourseContext();
  const { teachers } = useTeacherContext();

  const [description, setDescription] = useState(course.description);
  const [name, setName] = useState(course.name);
  const [teacher, setTeacher] = useState([]);
  const [grade, setGrade] = useState(course.grade);
  const [status, setStatus] = useState(course.status);
  const [startCourse, setStartCourse] = useState(
    convertTime(course.startCourse)
  );

  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [capacity, setCapacity] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const scheduleData = {
    startDate,
    endDate,
    startTime,
    endTime,
    selectedDays,
  };

  const handleDayToggle = async (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    setStartCourse(convertTime(course.createdAt));
  }, [course]);

  const handleEvenetClick = (e) => {
    e.preventDefault();
    updateCourse("description", description);
    updateCourse("name", name);
    updateCourse("teacher", teacher);
    updateCourse("grade", grade);
    updateCourse("status", status);
    updateCourse("startCourse", convertTime(startCourse));
  };

  const allTeacherName = teachers.map((t) => t.account.full_name);

  return (
    <>
      <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
        <div className="card cardStyle">
          <div className="card-body cardBodyStyle">
            <div class="row mb-3">
              <label
                for="profileImage"
                class="col-md-4 col-lg-3 col-form-label"
              >
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

            <EditFormText
              label="Grade"
              defaultValue={grade}
              onChange={setGrade}
            />
            <EditFormText
              label="Price"
              defaultValue={price}
              onChange={setPrice}
            />

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
                  <label>Days of the Week</label>
                  <br />
                  {DaysOfWeek.map((day) => (
                    <div
                      key={day.value}
                      className="form-check form-check-inline"
                    >
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
              </form>
            </div>
            <ButtonSave onClick={handleEvenetClick} title={"Save"} />
          </div>
        </div>
      </div>
    </>
  );
};

export const FormEditUser = () => {
  const { user, UpdateUser } = useUserContext();

  const [name, setName] = useState(user.account.full_name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [status, setStatus] = useState(user.status || "");

  useEffect(() => {
    setName(user.account.full_name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setStatus(user.status || "");
  }, [user]);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    var newUser = {
      full_name: name,
      email: email,
      phone: phone,
      status: status,
    };
    var response = await UpdateUser(newUser, user.account._id);
    if (response) alert("User information saved successfully!");
    else alert("User information saved failed!");
  };

  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      <form onSubmit={handleSaveClick}>
        <EditFormText
          label="Full Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EditFormText
          label="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <EditFormText
          label="Phone"
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <EditFormText
          label="Status"
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <ButtonSave title="Save" />
      </form>
    </div>
  );
};

export const FormEditUserOther = () => {
  const { otherUser, UpdateUser } = useUserContext();

  // State hooks for form fields
  const [name, setName] = useState(otherUser.account.full_name || "");
  const [email, setEmail] = useState(otherUser.account.email || "");
  const [phone, setPhone] = useState(otherUser.account.phone || "");
  const [status, setStatus] = useState(otherUser.account.status || "");

  // useEffect to update form fields when otherUser changes
  useEffect(() => {
    setName(otherUser.account.full_name || "");
    setEmail(otherUser.account.email || "");
    setPhone(otherUser.account.phone || "");
    setStatus(otherUser.account.status || "");
  }, [otherUser]);

  // Handle Save button click
  const handleSaveClick = async (e) => {
    console.log("Save button clicked");
    e.preventDefault();
    // Call setOtherUser to update specific fields of otherUser
    var newUser = {
      full_name: name,
      email: email,
      phone: phone,
      status: status,
    };
    console.log("New user: ", newUser, otherUser.account._id);

    var r = await UpdateUser(newUser, otherUser.account._id);
    if (r) alert("User information saved successfully!");
    else alert("User information saved failed!");
  };

  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      <form onSubmit={handleSaveClick}>
        <EditFormText
          label="Full Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EditFormText
          label="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <ButtonSave title="Save" />
      </form>
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
