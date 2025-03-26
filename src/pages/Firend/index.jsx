import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import Firendindex from "../../components/firends";

const Friends = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <SideBar user={user?.currentUser} />
      <Firendindex user={user?.currentUser} />
    </>
  );
};

export default Friends;
