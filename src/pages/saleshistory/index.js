import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import Sales from "../../components/sales/sales";

const Saleshistory = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper relative">
        <SideBar user={user?.currentUser} />
        <Sales/>
      </div>
    </>
  );
};

export default Saleshistory;
