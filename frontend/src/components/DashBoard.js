import { Table } from "react-bootstrap";
import { useNewCourseContext } from "../Context/NewCourseContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useCourseContext } from "../Context/CourseContext";
import AwesomeSlider from "react-awesome-slider";
import ClipLoader from 'react-spinners/ClipLoader';
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { ListCard } from "./Buttons/ListCard";
import { useEffect, useState } from "react";
import { newCourseImageDefault } from "../config/imageDefault";
const AutoplaySlider = withAutoplay(AwesomeSlider);
export const Dashboard = () => {
  const { newCourseData } = useNewCourseContext();
  const { role } = useAuthContext();
  const { courses, setCourse } = useCourseContext();
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const [loadDone , setLoadDone] = useState(false);
  const [slideImage , setSlideImage] = useState(false);

  useEffect(() => {
    setAllCourses(courses);
    loadImages();
  }, [courses]);

  const loadImages = async () => {
    if (courses.length > 0) {
      const images = await Promise.all(courses.map(async course => {
        const imageUrl = course.image ? course.image : newCourseImageDefault;
        return await loadImage(imageUrl);
      }));
      setAllImage(images);
      setSlideImage(renderSlides(courses));
      setTimeout(() => {
        setLoadDone(true);
      }, 1500); // Thời gian delay để hiển thị ảnh
    }
  };

  const loadImage = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(imageUrl);
      img.onerror = () => reject(newCourseImageDefault);
      img.src = imageUrl;
    });
  };

  const renderSlides = courses => {
    return courses.map((course, index) => (
      <div key={index} data-src={loadDone ? allImage[index] : newCourseImageDefault} onClick={() => ClickCourse(course, navigate, setCourse, role)} />
    ));
  };

  return (
    <div>
      {loadDone ? (
        <AutoplaySlider play={true} cancelOnInteraction={false} interval={1000}>
          {slideImage}
        </AutoplaySlider>
      ) : (
        <div className="loading-demo">
          <ClipLoader color="#36d7b7" size={150} />
        </div>
      )}
      <div className="marginTop100">
        <ListCard cardData={courses} onClickCard={(i) => ClickCourse(courses[i], navigate, setCourse, role)}/>
      </div>
    </div>
  );
};


const ClickCourse = async (data, navigate, setCourse, role) => {
  await setCourse(data);
  navigate(`/${role}/courseprofile`);
};
