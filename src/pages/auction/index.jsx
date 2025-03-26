import React from "react";
import Allevents from "../../components/scheduledevents/allevents";
import { useCurrentuser } from "../../app/hook";
import SideBar from "../../app/sideBar";

const ScheduledEvent = () => {
    const { data: user } = useCurrentuser();

    return (
        <>
            <div id="wrapper">
                <SideBar user={user?.currentUser} /> 
                <Allevents />
            </div>
        </>
    );
};

export default ScheduledEvent;
