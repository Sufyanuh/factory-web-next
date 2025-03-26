import React from "react";
import Createpost from "../components/home/createpost";
import Homepage from "../components/home/index";
import SideBar from "../app/sideBar";
import { useCurrentuser } from "../app/hook";

const Home = () => {
  const { data: user } = useCurrentuser();
  console.log(user, "<<<<<=user");
  return (
    <>
      <div id="wrapper">
        <SideBar user={user?.currentUser} />
        <Homepage user={user?.currentUser} />
        <Createpost />
      </div>
    </>
  );
};

export default Home;
