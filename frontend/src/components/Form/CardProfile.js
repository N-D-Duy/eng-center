
export const CardProfile = ({image, lable}) => { 
    return (<>
        <div class="col-xl-4">
            <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                        <img src= {image} alt="Profile" class="rounded-circle" />
                        <h2>{lable}</h2>
                    </div>
            </div>
        </div>
    </>)
}
