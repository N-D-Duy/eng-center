import { useCourseContext } from "../Context/CourseContext"
import { NavButton } from "./Buttons/NavButton"
import { CardProfile } from "./Form/CardProfile"
import { FormEditCourse } from "./Form/FormEdit"
import OverviewCourse from "./Form/FormOverview"

export const CourseProfile = () => {
    const {course} = useCourseContext();
    return (<>
        <section class="section profile">
        <div class="row">
            <CardProfile lable= {course.name} image={course.image} />  
            <div class="col-xl-8">
            <div class="card">
                <div class="card-body pt-3">
                    <ul class="nav nav-tabs nav-tabs-bordered">
                        <NavButton value="Overview" target="#profile-overview" active={true} />
                        <NavButton value="Edit" target="#profile-edit" active={false} />
                    </ul>
                    <div class="tab-content pt-2">
                        <OverviewCourse />
                        <FormEditCourse />
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </>)
} 