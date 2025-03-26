import React from "react";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";
import Purchase from "../../components/purchase/purchase";

const Purchasehistory = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper relative">
        <SideBar user={user?.currentUser} />
        <Purchase/>
      </div>
    </>
  );
};

export default Purchasehistory;
