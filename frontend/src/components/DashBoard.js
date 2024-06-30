import { Table } from "react-bootstrap";
import { useNewCourseContext } from "../Context/NewCourseContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useCourseContext } from "../Context/CourseContext";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { ListCard } from "./Buttons/ListCard";
import { useEffect, useState } from "react";
import { newCourseImageDefalut } from "../config/imageDefault";
const AutoplaySlider = withAutoplay(AwesomeSlider);
export const Dashboard = () => {
  const { newCourseData } = useNewCourseContext();
  const { role } = useAuthContext();
  const { courses, setCourse } = useCourseContext();
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
      setAllCourses(courses);
  }, [courses]);

  const renderSlides = (courses) => {
    return courses.map((course, index) => (
        <div key={index} data-src= {newCourseImageDefalut} onClick={() => ClickCourse(course, navigate, setCourse, role)} />
    ))
  };

  return (
    <div>
    <AutoplaySlider play={true} cancelOnInteraction={false} interval={3000}>
        {renderSlides(newCourseData)}
    </AutoplaySlider>
    <div className="marginTop100">
        <ListCard cardData={courses}/>
    </div>
    </div>
  );
};


const ClickCourse = async (data, navigate, setCourse, role) => {
  await setCourse(data);
  navigate(`/${role}/courseprofile`);
};
