import { useTeacherContext } from "../../Context/TeacherContext";
import { NavButton } from "../Buttons/NavButton";
import { CardProfile } from "../Form/CardProfile";
import { useEffect, useState } from "react";
import { OverviewTeacher } from "../Form/FormOverview";
import { FormEditTeacher } from "../Form/FormEdit";

export const TeacherProfile = () => {
    
    const { teacher, setTeacher } = useTeacherContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teacher) {
            const savedTeacher = localStorage.getItem('teacher');
            if (savedTeacher) {
                setTeacher(JSON.parse(savedTeacher));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (teacher) {
            setLoading(false);
        }
    }, [teacher]);

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <section className="section profile">
                <div className="row">
                    <CardProfile label={teacher?.name} image={teacher?.image} />  
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <NavButton value="Overview" target="#profile-overview" active={true} />
                                    <NavButton value="Edit" target="#profile-edit" active={false} />
                                </ul>
                                <div className="tab-content pt-2">
                                    <OverviewTeacher />
                                    <FormEditTeacher />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeacherProfile;
