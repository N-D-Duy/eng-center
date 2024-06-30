import { EditFormText } from "./FormEdit";
import { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import axios from "axios";
import { Button } from "../Buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";

export const FormChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangePassword = async () => {
    if(currentPassword === "" || newPassword === "" || renewPassword === "") {
        alert("Please fill in all fields!");
        return;
    }
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    if (newPassword !== renewPassword) {
      alert("New password and re-enter new password do not match!");
      return;
    }
    if (user.account.password !== currentPassword) {
      alert("Current password is incorrect!");
      return;
    }

    // Call API to update password
    try {
      const response = await axios.put(
        `http://165.232.161.56:8000/api/account/change-password`,
        {
          id: user.account._id,
          password: newPassword,
        }
      );
      if (response.status === 200) {
        alert("Password updated successfully!");
        user.account.password = newPassword;
        setUser(user);
        navigate(location.pathname, { replace: true });
        return;
      }
    } catch (error) {
      console.error("Error:", error);

      alert("Error updating password!");
      return;
    }
  };

  return (
    <>
      <div class="tab-pane fade pt-3" id="profile-change-password">
        <EditFormText
          label={"Current Password"}
          onChange={setCurrentPassword}
        />
        <EditFormText label={"New Password"} onChange={setNewPassword} />
        <EditFormText
          label={"Re-enter New Password"}
          onChange={setRenewPassword}
        />

        <Button onClick={handleChangePassword} lable={"Save"} />
      </div>
    </>
  );
};
