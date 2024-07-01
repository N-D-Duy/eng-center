import { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import axios from "axios";
import { Button } from "../Buttons/Button";
import { APIPath } from "../../App";

export const FormChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const { user, setUser } = useUserContext();
  const handleChangePassword = async () => {
    if(currentPassword === "" || newPassword === "" || renewPassword === "") {
        alert("Please fill in all fields!");
        return;
    }
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Current email:", user.account.email ? user.account.email : user.account.user_name);

    if (newPassword !== renewPassword) {
      alert("New password and re-enter new password do not match!");
      return;
    }

    // Call API to update password
    try {
      const response = await axios.post(
        APIPath + `account/change-password`,
        {
          emailOrUsername: user.account.email ? user.account.email : user.account.user_name,
          oldPassword: currentPassword,
          newPassword: newPassword
        }
      );
      if (response.status === 200) {
        alert("Password updated successfully!");
        user.account.password = newPassword;
        setUser(user);
        setCurrentPassword("");
        setNewPassword("");
        setRenewPassword("");
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
        <EditFormPasswordText
          label={"Current Password"}
          onChange={setCurrentPassword}
        />
        <EditFormPasswordText label={"New Password"} onChange={setNewPassword} />
        <EditFormPasswordText
          label={"Re-enter New Password"}
          onChange={setRenewPassword}
        />

        <Button onClick={handleChangePassword} lable={"Save"} />
      </div>
    </>
  );
};


const EditFormPasswordText = ({
  label,
  defaultValue,
  onChange,
  type = null,
}) => {
  return (
    <div>
      <div class="row mb-3">
        <label class="col-md-4 col-lg-3 col-form-label">{label}</label>
        <div class="col-md-8 col-lg-9">
          <input
            type="password"
            class="form-control"
            value={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};