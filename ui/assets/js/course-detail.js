import {convertTime} from './course-manager.js'

document.addEventListener('DOMContentLoaded', function() {
    var data = 'admin'; // Ví dụ: lấy data từ api
    
});

function generateImgProfile(data){
    var content = document.getElementById('course-detail-img');
    content.innerHTML = `
            <img src="${data.img}" alt="Profile" class="rounded-circle">
            <h2>${data.nameClass}</h2>
    `;
}

function generateOverview(data){
    var content = document.getElementById('profile-overview');
    content.innerHTML = `
            <h5 class="card-title">Description</h5>
            <p class="small fst-italic">${data.description}</p>

            <h5 class="card-title">Course Details</h5> 
            <div class="row">
            <div class="col-lg-3 col-md-4 label ">Course Name</div>
            <div class="col-lg-9 col-md-8">${data.name}</div>
            </div>

            <div class="row">
            <div class="col-lg-3 col-md-4 label">Teacher</div>
            <div class="col-lg-9 col-md-8">${data.techer._id}</div>
            </div>
        
            <div class="row">
            <div class="col-lg-3 col-md-4 label">Grade</div>
            <div class="col-lg-9 col-md-8">${data.grade}.${data.price}</div>
            </div>
            <div class="row">
            <div class="col-lg-3 col-md-4 label">Status</div>
            <div class="col-lg-9 col-md-8">${data.status}</div>
            </div>

            <div class="row">
            <div class="col-lg-3 col-md-4 label">Capacity</div>
            <div class="col-lg-9 col-md-8">01/40</div>
            </div>

            <div class="row">
            <div class="col-lg-3 col-md-4 label">Start-Course</div>
            <div class="col-lg-9 col-md-8">${convertTime(data.createAt)}/div>
            </div>
    `;
}

function checkShowEditProfile(role){
    var btneditRole = document.getElementById('btn-edit-profile');
    switch(role){
        case 'admin':{
            btneditRole.classList += 'd-block'
            return true;
        }
        default:{
            btneditRole.classList += 'd-none'
            return false;
        }
    }
    return false;
}

function generateEditview(data){
    var content = document.getElementById('profile-edit');
    content.innerHTML = `
            <form>
            <div class="row mb-3">
            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
            <div class="col-md-8 col-lg-9">
                <img src="${data.img}" alt="Profile">
                <div class="pt-2">
                <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                </div>
            </div>
            </div>

            <div class="row mb-3">
            <label for="courseName" class="col-md-4 col-lg-3 col-form-label">Course Name</label>
            <div class="col-md-8 col-lg-9">
                <input name="courseName" type="text" class="form-control" id="courseName" value="${data.name}">
            </div>
            </div>
            <div class="row mb-3">
            <label for="teacher" class="col-md-4 col-lg-3 col-form-label">Teacher</label>
            <div class="col-md-8 col-lg-9">
                <input name="teacher" type="text" class="form-control" id="teacher" value="${data.techer._id}">
            </div>
            </div>

            <div class="row mb-3">
            <label for="grade" class="col-md-4 col-lg-3 col-form-label">Grade</label>
            <div class="col-md-8 col-lg-9">
                <input name="grade" type="text" class="form-control" id="grade" value="${data.grade}.${data.price}">
            </div>
            </div>


            <div class="row mb-3">
            <label for="status" class="col-md-4 col-lg-3 col-form-label">Status</label>
            <div class="col-md-8 col-lg-9">
                <input name="status" type="text" class="form-control" id="status" value="${data.status}">
            </div>
            </div>

            <div class="row mb-3">
            <label for="capacity" class="col-md-4 col-lg-3 col-form-label">Capacity</label>
            <div class="col-md-8 col-lg-9">
                <input name="capacity" type="text" class="form-control" id="capacity" value="${data.capacity}">
            </div>
            </div>

            <div class="row mb-3">
            <label for="startCourse" class="col-md-4 col-lg-3 col-form-label">Start Course</label>
            <div class="col-md-8 col-lg-9">
                <input name="startCourse" type="text" class="form-control" id="startCourse" value="${convertTime(data.createAt)}">
            </div>
            </div>
        </form>
    `;
}