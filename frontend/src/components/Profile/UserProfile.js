import { NavButton } from "../Buttons/NavButton";
import { CardProfile } from "../Form/CardProfile";
import { useEffect, useState } from "react";
import { OverviewUser } from "../Form/FormOverview";

export const UserProfile = () => {
    
    const { user, setUser } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teacher) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <>
            <section className="section profile">
                <div className="row">
                    <CardProfile label={user?.name} image={user?.image} />  
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <NavButton value="Overview" target="#profile-overview" active={true} />
                                    <NavButton value="Edit" target="#profile-edit" active={false} />
                                </ul>
                                <div className="tab-content pt-2">
                                    <OverviewUser />
                                    <FormEditUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserProfile;
