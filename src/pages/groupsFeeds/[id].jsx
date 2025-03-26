import React from "react";
import Grouppage from "../../components/groupfeed";
import SideBar from "../../app/sideBar";
import { useCurrentuser } from "../../app/hook/useCurrentuser";


// export async function getStaticPaths() {
//   return {
//     paths: [], // No pre-defined paths, dynamic at runtime
//     fallback: true, // Dynamically render missing paths
//   };
// }

const GroupFeed = () => {
  const { data: user } = useCurrentuser();
  return (
    <>
      <div id="wrapper relative">
        <SideBar user={user?.currentUser} />
        <Grouppage user={user?.currentUser} />
      </div>
    </>
  );
};

export default GroupFeed;
