import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import GroupIndex from "../../components/groups";

const Groups = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper relative">
        <SideBar user={user?.currentUser} />
        <GroupIndex user={user?.currentUser} />
      </div>
    </>
  );
};

export default Groups;
