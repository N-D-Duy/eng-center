import React, { useContext, useEffect, useState } from 'react';
import { FormEditUser } from './Form/FormEdit';
import { OverviewUser, OverviewUserOther } from './Form/FormOverview';
import { NavButton } from './Buttons/NavButton';
import { CardProfile } from './Form/CardProfile';
import { useUserContext } from '../Context/UserContext';

const UserProfile = () => {
    const { user , setUser } = useUserContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            const saved = localStorage.getItem('user');
            if (saved) {
                setUser(JSON.parse(saved));
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
                    {console.log(user)}
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


export const UserOtherProfile = (prop) => {
   
    return (
        <>
            <section className="section profile">
                <div className="row">
                    {console.log(prop)}
                    <CardProfile label={prop?.name} image={prop?.image} />  
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <NavButton value="Overview" target="#profile-overview" active={true} />
                                    <NavButton value="Edit" target="#profile-edit" active={false} />
                                </ul>
                                <div className="tab-content pt-2">
                                    <OverviewUserOther prop = {prop} />
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
