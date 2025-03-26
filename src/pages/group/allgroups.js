import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import GroupIndex from "../../components/groups";
import Allgroups from "../../components/groups/allGroups";

const AllGroups = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper relative">
        <SideBar user={user?.currentUser} />
        <Allgroups user={user?.currentUser} />
      </div>
    </>
  );
};

export default AllGroups;
