import { useEffect, useState } from "react";
import { useCourseContext } from "../../Context/CourseContext";
import { useTeacherContext } from "../../Context/TeacherContext";
import { Button } from "../Buttons/Button";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
export const DaysOfWeek = [
  { value: 2, label: "Monday" },
  { value: 3, label: "Tuesday" },
  { value: 4, label: "Wednesday" },
  { value: 5, label: "Thursday" },
  { value: 6, label: "Friday" },
  { value: 7, label: "Saturday" },
  { value: 8, label: "Sunday" },
];

export const FormEditCourse = (prop) => {
  const navigate = useNavigate();
  const { courseDetail, UpdateCourseDetail } = useCourseContext();
  const { teachers } = useTeacherContext();
  const [description, setDescription] = useState(
    courseDetail.course.description
  );
  const [name, setName] = useState(courseDetail.course.name);
  const [teacher, setTeacher] = useState(courseDetail.course.teacher._id);
  const [grade, setGrade] = useState(courseDetail.course.grade);
  const [status, setStatus] = useState(courseDetail.course.status);

  const [price, setPrice] = useState(courseDetail.course.price);
  const [category, setCategory] = useState(courseDetail.course.category);
  const [capacity, setCapacity] = useState(courseDetail.course.capacity);

const handleEvenetClick = async (e) => {
    e.preventDefault();
    const newCourse = {
        name: name,
        description: description,
        teacher: teacher,
        grade: grade,
        status: status,
        price: price,
        category: category,
        capacity: capacity,
        current_joined: courseDetail.course.current_joined,
    };
    const response = await UpdateCourseDetail(
        JSON.stringify(newCourse),
        courseDetail.course._id
    );
    if (response) alert("Course information saved successfully!");
    else alert("Course information saved failed!");
};

  const handleTeacherSelected = (value) => {
    setTeacher(value);
  };
  const handleStatusSelected = (value) => {
    setStatus(value);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    alert("Delete course");
    navigate("/admin");
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
              onSelect={handleTeacherSelected}
            />

            <SelectOption
              keys={["active", "disactive", "pending"]}
              values={["Active", "Disactive", "Pending"]}
              title={"Status"}
              onSelect={handleStatusSelected}
            />

            <EditFormText
              label="Capacity"
              defaultValue={capacity}
              onChange={setCapacity}
            />
            <Button onClick={handleEvenetClick} lable={"Save"} />
            <div className="mt-3"></div>
            <Button onClick={handleDeleteClick} lable={"Delete"} />
          </div>
        </div>
      </div>
    </>
  );
};

export const FormEditUser = () => {
  const { user, UpdateUser } = useUserContext();

  const [name, setName] = useState(user.account.full_name || "");
  const [email, setEmail] = useState(user.account.email || "");
  const [phone, setPhone] = useState(user.account.phone || "");

  useEffect(() => {
    setName(user.account.full_name || "");
    setEmail(user.account.email || "");
    setPhone(user.account.phone || "");
  }, [user]);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    var newUser = {
      full_name: name,
      email: email,
      phone: phone,
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
        <Button lable="Save" onClick={handleSaveClick} />
      </form>
    </div>
  );
};

export const FormEditUserOther = () => {
  const { otherUser, UpdateUser } = useUserContext();
  const navigate = useNavigate();
  // State hooks for form fields
  const [name, setName] = useState(otherUser.account.full_name || "");
  const [email, setEmail] = useState(otherUser.account.email || "");
  const [phone, setPhone] = useState(otherUser.account.phone || "");
  // useEffect to update form fields when otherUser changes
  useEffect(() => {
    setName(otherUser.account.full_name || "");
    setEmail(otherUser.account.email || "");
    setPhone(otherUser.account.phone || "");
  }, [otherUser]);

  // Handle Save button click
  const handleSaveClick = async (e) => {
    console.log("Save button clicked");
    e.preventDefault();
    // Call setOtherUser to update specific fields of otherUser
    const newOtherUser = {
      full_name: name,
      email: email,
      phone: phone,
      status: "active"
    };
    console.log("New user: ", newOtherUser, otherUser.account._id);
    var r = await UpdateUser(newOtherUser, otherUser.account._id);
    if (r) alert("User information saved successfully!");
    else alert("User information saved failed!");
  };

  const handleDeleteClick = async (e) => {
    console.log("Delete user clicked");
    navigate("/admin");
  };

  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      <EditFormText
        label="Full Name"
        defaultValue={name}
        onChange={setName}
      />
      <EditFormText
        label="Email"
        defaultValue={email}
        onChange={setEmail}
      />
      <EditFormText
        label="Phone"
        defaultValue={phone}
        onChange={setPhone}
      />
      <Button lable="Save" onClick={handleSaveClick} />
      <div className="mt-3"></div>
      <Button lable="Delete" onClick={handleDeleteClick} />
    </div>
  );
};

export const EditFormText = ({
  label,
  defaultValue,
  onChange,
  type = null,
}) => {
  return (
    <div>
      <div class="row mb-3">
        <label class="col-md-4 col-lg-3 col-form-label">{label}</label>
        <div class="col-md-8 col-lg-9">
          <input
            type={type ? type : "form"}
            class="form-control"
            value={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};
const SelectOption = ({ keys, values, title, onSelect }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };

  return (
    <div>
      <div className="row mb-3">
        <label class="col-md-4 col-lg-3 col-form-label">{title}</label>
        <div class="col-md-8 col-lg-9">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
          >
            {keys.map((key, index) => (
              <option value={key._id}>{values[index]}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
