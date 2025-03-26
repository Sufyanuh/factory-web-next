import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import Notificationindex from "../../components/notification/Notification";

const Notifications = () => {
  const { data: user } = useCurrentuser();
//   console.log(user, "<<<<<=user");
  return (
    <div id="wrapper">
      <SideBar user={user?.currentUser} />
      <Notificationindex />
    </div>
  );
};

export default Notifications;
