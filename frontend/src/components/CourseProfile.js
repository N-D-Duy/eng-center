import { NavButton } from "./Buttons/NavButton"
import { CardProfile } from "./Form/CardProfile"
import OverviewCourse from "./Form/FormOverview"


export const CourseProfile = () => {
    return (<>
       <CardProfile />  
        <div class="card">
                <div class="card-body pt-3">
                <ul class="nav nav-tabs nav-tabs-bordered">

                    <li class="nav-item">
                        <NavButton prop={{ value: "Overview", target: "#profile-overview" }} active={ true } />
                    </li>

                    <li class="nav-item">
                        <NavButton prop={{ value: "Edit", target: "#profile-edit" }} active={ false } />
                    </li>
                </ul>
                <div class="tab-content pt-2">
                    <OverviewCourse />
                </div>
                </div>
            </div>
       
    </>)
} 