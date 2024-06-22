import { NavButton } from "../Buttons/NavButton";
import { CardProfile } from "../Form/CardProfile";
import { useEffect, useState } from "react";
import { OverviewUser, OverviewUserOther } from "../Form/FormOverview";
import { useUserContext } from "../../Context/UserContext";
import { useAuthContext } from "../../Context/AuthContext";
import { FormEditUser, FormEditUserOther } from "../Form/FormEdit";

export const UserProfile = () => {
    
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, [user]);

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

export const UserOtherProfile = () => {
    
    const { otherUser } = useUserContext();
    const { role } = useAuthContext();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (otherUser) {
            setLoading(false);
        }
    }, [otherUser]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <section className="section profile">
                <div className="row">
                    <CardProfile label={otherUser?.name} image={otherUser?.image} />  
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <NavButton value="Overview" target="#profile-overview" active={true} />
                                    {role === 'admin' && <NavButton value="Edit" target="#profile-edit" active={false} />}
                                </ul>
                                <div className="tab-content pt-2">
                                    <OverviewUserOther />
                                    {role === 'admin' && <FormEditUserOther />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
