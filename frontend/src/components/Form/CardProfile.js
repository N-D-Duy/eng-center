import { useEffect } from "react"

export const CardProfile = ({image, label}) => { 

    return (<>
        <div class="col-xl-4">
            <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                        <img src= {image} alt="Profile" class="rounded-circle" />
                        <h2>{label}</h2>
                    </div>
            </div>
        </div>
    </>)
}
