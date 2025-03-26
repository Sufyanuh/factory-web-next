import React from "react";
import SideBar from "../../app/sideBar";
import Profileindex from "../../components/profile";
import { useCurrentuser } from "../../app/hook";

const Profile = () => {
  const { data: user } = useCurrentuser();
  return (
    <div id="wrapper">
      <SideBar user={user?.currentUser} />
      <Profileindex />
    </div>
  );
};

export default Profile;
