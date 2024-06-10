export const FormEditCourse = (prop)=>{

    const [courseName, setCourseName] = useState(prop.name);

    return (<>
    <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
        <form>
            <div class="row mb-3">
            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
            <div class="col-md-8 col-lg-9">
                <img src= {prop.image} alt="Profile" />
                <div class="pt-2">
                <a href="#none" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                <a href="#none" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                </div>
            </div>
            </div>

            <div class="row mb-3">
            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
            <div class="col-md-8 col-lg-9">
                <input name="fullName" type="text" class="form-control" id="fullName" value="Kevin Anderson" />
            </div>
            </div>

            <div class="row mb-3">
            <label for="about" class="col-md-4 col-lg-3 col-form-label">About</label>
            <div class="col-md-8 col-lg-9">
                <textarea name="about" class="form-control">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
            </div>
            </div>

            <div class="row mb-3">
            <label for="Job" class="col-md-4 col-lg-3 col-form-label">Job</label>
            <div class="col-md-8 col-lg-9">
                <input name="job" type="text" class="form-control" id="Job" value="Web Designer" />
            </div>
            </div>

            <div class="row mb-3">
            <label for="Country" class="col-md-4 col-lg-3 col-form-label">Birth-Day</label>
            <div class="col-md-8 col-lg-9">
                <input name="country" type="text" class="form-control" id="Country" value="08/08/2008" />
            </div>
            </div>

            <div class="row mb-3">
            <label for="company" class="col-md-4 col-lg-3 col-form-label">Class</label>
            <div class="col-md-8 col-lg-9">
                <input name="company" type="text" class="form-control" id="company" value="Name Class" />
            </div>
            </div>


            <div class="row mb-3">
            <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
            <div class="col-md-8 col-lg-9">
                <input name="address" type="text" class="form-control" id="Address" value="A108 Adam Street, New York, NY 535022" />
            </div>
            </div>

            <div class="row mb-3">
            <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Phone</label>
            <div class="col-md-8 col-lg-9">
                <input name="phone" type="text" class="form-control" id="Phone" value="(436) 486-3538 x29071" />
            </div>
            </div>

            <EditField key = "Email" value = "abcd@gmail.com" onChange={setCourseName}/>
            </form>
        </div>
    </>)
}

const EditField = ({key ,value ,onChange}) => {
    return (<div class="row mb-3">
            <label for="Email" class="col-md-4 col-lg-3 col-form-label">{key}</label>
            <div class="col-md-8 col-lg-9">
                <input name="email" type="email" class="form-control" value={value} onChange={onChange} />
            </div>
    </div>)
}