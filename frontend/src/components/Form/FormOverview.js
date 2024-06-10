import { convertTime } from "../Controller/Time"

export const OverviewCourse = (prop) => {
    return (
        <div class="tab-pane fade show active profile-overview" id="profile-overview">
            <h5 class="card-title">Description</h5>
            <p class="small fst-italic">{prop.description}</p>

            <h5 class="card-title">Course Details</h5> 
            <OverviewField key = "Course" value = {prop.name}/>
            <OverviewField key = "Teacher" value = {prop.teacher.name}/>
            <OverviewField key = "Grade" value = {prop.grade}/>
            <OverviewField key = "Status" value = {prop.status}/>
            <OverviewField key = "Capacity" value = {prop.capacity}/>
            <OverviewField key = "Start-Course" value = {convertTime(prop.startCourse)}/>
        </div>
    )
}


const OverviewField = ({key ,value}) => {
    return (<div class="row">
                <div class="col-lg-3 col-md-4 label">key</div>
                <div class="col-lg-9 col-md-8">value</div>
        </div>)
}