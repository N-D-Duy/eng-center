import { useCourseContext } from "../../Context/CourseContext";
import OverviewCourse from "../Form/FormOverview";
import { NavButton } from "../Buttons/NavButton";
import { CourseAttendance } from "../Form/Attendance";
import { CardProfile } from "../Form/CardProfile";
import { FormEditCourse } from "../Form/FormEdit";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { FormChangePassword } from "../Form/FormChangePassword";

export const CourseProfile = () => {
  const { courseDetail, setCourseDetail } = useCourseContext();
  const { role } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseDetail) {
        setLoading(false);
    }else{
      const savedCourse = localStorage.getItem("courseDetail");
      if (savedCourse) {
        setCourseDetail(JSON.parse(savedCourse));
      }
    }
  }, [courseDetail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="section profile">
        <div className="row">
          <CardProfile
            label={courseDetail.course.name}
            image={courseDetail.course.image}
          />
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <NavButton
                    value="Overview"
                    target="#profile-overview"
                    active={true}
                  />
                  {/* {role === "admin" && (
                    <NavButton
                      value="Edit"
                      target="#profile-edit"
                      active={false}
                    />
                  )} */}
                </ul>
                <div className="tab-content pt-2">
                  <OverviewCourse />
                  {/* {role === "admin" && <FormEditCourse />} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Attendance</h1>
            <CourseAttendance />
          </div>
        </div>
      </section>
    </>
  );
};
