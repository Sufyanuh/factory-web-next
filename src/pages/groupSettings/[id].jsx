import React from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_GROUP_BY_ID } from '../../Graphql/Queries';
import { useCurrentuser } from '../../app/hook/useCurrentuser';
import SideBar from '../../app/sideBar';
import GroupSettingsPage from '../../components/groupsettings';

const Groupsettings = () => {
    const router = useRouter();
    const { data: user } = useCurrentuser();

    const { id } = router.query;

    const { data, loading } = useQuery(GET_GROUP_BY_ID, {
        variables: { groupId: Number(id) },
    });

    return (
        <>
            <div id="wrapper relative">
                <SideBar user={user?.currentUser} />
                <GroupSettingsPage user={user?.currentUser} group={data?.group} />
            </div>
        </>
    )
}

export default Groupsettings