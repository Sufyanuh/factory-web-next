import React from "react";
import SideBar from "../../app/sideBar";
import { useCurrentuser } from "../../app/hook";
import Chatindex from "../../components/chat";

const Chat = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper">
        <SideBar user={user?.currentUser} />
        <Chatindex user={user?.currentUser} />
      </div>
    </>
  );
};

export default Chat;
