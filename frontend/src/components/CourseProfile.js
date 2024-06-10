import { CardProfile } from "./CardProfile";


export const CourseDetails = () => {
    const data = null;
    return (<>
        <main id="main" class="main">

        <div class="pagetitle">
        <h1>Course Detail</h1>
        </div>

        <section class="section profile">
        <div class="row">
            <CardProfile prop = {null} />

            <div class="col-xl-8">

            </div>
        </div>

        <div class="row">
            <div class="col-xl-16">
                <div class="card">
                    <div class="card-body pt-3">
                        <h5 class="card-title">Attendance</h5>
                    </div>
                    <table id="studentTable" border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <script>
                                const totalSessions = 15; // Total number of sessions
                                for (let i = 1; i <= totalSessions; i++) {
                                    document.write('<th>Session ' + i + '</th>');
                                }
                            </script>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

                </div>  
            </div>
        </div>
        </section>

        </main>
        
    </>)
}