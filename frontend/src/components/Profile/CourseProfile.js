import { useCourseContext } from "../../Context/CourseContext";
import OverviewCourse from "../Form/FormOverview";
import { NavButton } from "../Buttons/NavButton";
import { CourseAttendance } from "../Form/Attendance";
import { CardProfile } from "../Form/CardProfile";
import { FormEditCourse } from "../Form/FormEdit";
import { useEffect, useState } from "react";

export const CourseProfile = () => {
    const { course, setCourse } = useCourseContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!course) {
            const savedCourse = localStorage.getItem('course');
            if (savedCourse) {
                setCourse(JSON.parse(savedCourse));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (course) {
            setLoading(false);
        }
    }, [course]);

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <section className="section profile">
                <div className="row">
                    <CardProfile label={course?.name} image={course?.image} />  
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <NavButton value="Overview" target="#profile-overview" active={true} />
                                    <NavButton value="Edit" target="#profile-edit" active={false} />
                                </ul>
                                <div className="tab-content pt-2">
                                    <OverviewCourse />
                                    <FormEditCourse />
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
