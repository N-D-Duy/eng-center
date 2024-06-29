import { NavButton } from "../Buttons/NavButton";
import { CardProfile } from "../Form/CardProfile";
import { useEffect, useState } from "react";
import { OverviewUser, OverviewUserOther } from "../Form/FormOverview";
import { useUserContext } from "../../Context/UserContext";
import { useAuthContext } from "../../Context/AuthContext";
import { FormEditUser, FormEditUserOther } from "../Form/FormEdit";
import { FormChangePassword } from "../Form/FormChangePassword";

export const UserProfile = () => {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <>
      <section className="section profile">
        <div className="row">
          <CardProfile label={user?.account.full_name} image={user?.image} />
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <NavButton
                    value="Overview"
                    target="#profile-overview"
                    active={true}
                  />
                  <NavButton
                    value="Edit"
                    target="#profile-edit"
                    active={false}
                  />
                  <NavButton
                    value="Change Password"
                    target="#profile-change-password"
                    active={false}
                  />
                </ul>
                <div className="tab-content pt-2">
                  <OverviewUser />
                  <FormEditUser />
                  <FormChangePassword />
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
  const { otherUser, setOtherUser } = useUserContext();
  const { role } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (otherUser) {
      setLoading(false);
    } else {
      const savedUser = localStorage.getItem("otherUser");
      if (savedUser) {
        setOtherUser(JSON.parse(savedUser));
      }
    }
  }, [otherUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="section profile">
        <div className="row">
          <CardProfile
            image={otherUser?.account.image}
            label={otherUser?.account.full_name}
          />
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <NavButton
                    value="Overview"
                    target="#profile-overview"
                    active={true}
                  />
                  {role === "admin" && (
                    <NavButton
                      value="Edit"
                      target="#profile-edit"
                      active={false}
                    />
                  )}
                </ul>
                <div className="tab-content pt-2">
                  <OverviewUserOther />
                  {role === "admin" && <FormEditUserOther />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
