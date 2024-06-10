import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import logo from '../../img/logo192.png'

export const CardProfile = (prop) => { 

    return (<>
        <div class="col-xl-4">

            <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center" id = "course-detail-img">
                    <img src= {logo} alt="Profile" class="rounded-circle" />
                    <h2>prop.name</h2>
                    </div>
            </div>
        </div>
    </>)
}
