import { useEffect, useState } from "react";
import { useCourseContext } from "../../Context/CourseContext";
import { useUserContext } from "../../Context/UserContext";
import { DaysOfWeek } from "./FormEdit";
import { Button } from "../Buttons/Button";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAttendanceContext } from "../../Context/AttendanceContext";
import axios from "axios";
import { APIPath } from "../../App";

export const OverviewCourse = () => {
  const { courseDetail, fetchAllRoleCourses } = useCourseContext();
  const [scheduleData, setScheduleData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const { role } = useAuthContext();
  const { user } = useUserContext();
  const { students } = useAttendanceContext();

  useEffect(() => {
    if(courseDetail){
      setScheduleData(courseDetail.schedule);
      setStartDate(courseDetail.schedule[0].day);
      setEndDate(courseDetail.schedule[courseDetail.schedule.length - 1].day);
      setStartTime(courseDetail.schedule[0].start_time);
      setEndTime(courseDetail.schedule[0].end_time);
      setSelectedDays(updateSelectedDays(courseDetail.schedule));
    }
  }, [courseDetail]);
  
  const navigate = useNavigate();
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.getDay(); // returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  };

  const updateSelectedDays = (schedule) => {
    const updatedSelectedDays = new Set();
    schedule.forEach((s) => {
      const dayOfWeek = getDayOfWeek(s.day);
      updatedSelectedDays.add(dayOfWeek);
    });
    return updatedSelectedDays;
  };
  
  const [selectedDays, setSelectedDays] = useState();

  const handleLeaveCourse = async () => {
    const response = await axios.post(APIPath + `course/leave`, {
      course: courseDetail.course._id,
      student: user._id,
    });
    if (response.status === 200) {
      alert("You have left the course successfully!");
      fetchAllRoleCourses();
      navigate("/");
    } else {
      alert("Failed to leave the course!");
    }
  };
  const handleJoinCourse = async () => {
    const response = await axios.post(APIPath + `course/join`, {
      course: courseDetail.course._id,
      student: user._id,
    });
    if (response.status === 200) {
      alert("You have join the course successfully!");
      fetchAllRoleCourses();
      setTimeout(() => {
        window.location.reload()
      }, 200);
    } else {
      alert("Failed to leave the course!");
    }
  };


  return (
    <div
      class="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 class="card-title">About</h5>
      <p class="small fst-italic">{courseDetail.course.description}</p>
      <h5 class="card-title">Profile Details</h5>
      <OverviewField label="Course Name" value={courseDetail.course.name} />
      <OverviewField label="Grade" value={courseDetail.course.grade} />
      <OverviewField
        label="Teacher"
        value={courseDetail.course.teacher.account.full_name}
      />
      <OverviewField
        label="Capacity"
        value={
          courseDetail.course.current_joined +
          "/" +
          courseDetail.course.capacity
        }
      />
      <OverviewField label="Category" value={courseDetail.course.category} />
      <OverviewField label="Price" value={courseDetail.course.price} />
      <OverviewField label="Status" value={courseDetail.course.status} />
      <OverviewField label="Start" value={startDate} />
      <OverviewField label="Finish" value={endDate} />
      <OverviewField label="Begin" value={startTime} />
      <OverviewField label="End" value={endTime} />
      <div className="form-group">
        <div class="col-lg-3 col-md-4 label">Days of the Week</div>
        <br />
        {DaysOfWeek.map((day) => (
          <div key={day.value} className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input custom-checkbox"
              checked={selectedDays?.has(day.value - 1)}
              disabled={true}
            />
            <label htmlFor={day.value} className="form-check-label">
              {day.label}
            </label>
          </div>
        ))}
      </div>
      {role == "student" && (
        <div className="row">
         <div class="row mb-3"></div>
          {(students.some(student => student._id === user._id) ? (
          <Button lable={"Leave Course"} onClick={handleLeaveCourse} />) : (
          <Button lable={"Join Course"} onClick={handleJoinCourse} />
          ))}
        </div>
      )}
    </div>
  );
};

export const OverviewUser = () => {
  const { user } = useUserContext();

  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 className="card-title">Overview</h5>
      <OverviewField label="Full Name" value={user.account.full_name} />
      <OverviewField label="Email" value={user.account.email} />
      <OverviewField label="Phone" value={user.account.phone} />
      {/* Add more fields as needed */}
    </div>
  );
};

export const OverviewUserOther = () => {
  const { otherUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (otherUser) {
      setLoading(false);
    }
  }, [otherUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="tab-pane fade show active profile-overview"
      id="profile-overview"
    >
      <h5 className="card-title">Overview</h5>
      <OverviewField label="Full Name" value={otherUser.account.full_name} />
      <OverviewField label="Email" value={otherUser.account.email} />
      <OverviewField label="Phone" value={otherUser.account.phone} />
      {/* Add more fields as needed */}
    </div>
  );
};

const OverviewField = ({ label, value }) => {
  return (
    <div class="row">
      <div class="col-lg-3 col-md-4 label">{label}</div>
      <div class="col-lg-9 col-md-8">{value}</div>
    </div>
  );
};

export default OverviewCourse;
