import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  ADD_FRIENDS,
  CANCEL_REQUESTS,
  REMOVE_FRIENDS,
} from "../../Graphql/Mutations";
import { GET_ALL_SEARCHED_USER } from "../../Graphql/Queries";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import { renderUrl } from "../../app/utils/assetsUrl";

const Suggestions = (props) => {
  const { user } = props;
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const { data, loading } = useQuery(GET_ALL_SEARCHED_USER, {
    variables: { text: searchValue },
  });
  const [SendRequest, { error, loading: AddToFreindloading }] = useMutation(
    ADD_FRIENDS,
    { refetchQueries: [GET_ALL_SEARCHED_USER, { variables: { text: "" } }] }
  );
  const [RemoveFreind, { loading: RemoveFreindloading }] = useMutation(
    REMOVE_FRIENDS,
    {
      refetchQueries: [GET_ALL_SEARCHED_USER, { variables: { text: "" } }],
    }
  );
  const [CancelRequest, { loading: CancelFreindloading }] = useMutation(
    CANCEL_REQUESTS,
    {
      refetchQueries: [GET_ALL_SEARCHED_USER, { variables: { text: "" } }],
    }
  );

  const Addfriend = async (id) => {
    await SendRequest({
      variables: { friendId: Number(id) },
    });
    if (error) {
      toast.error(error);
    } else toast.success("Request has been Sent!!");
  };
  const Cancelrequest = async (id) => {
    await CancelRequest({
      variables: { friendId: Number(id) },
    });
    if (error) {
      toast.error(error);
    } else toast.success("Request has been Cancelled!!");
  };
  const UnFriend = async (id) => {
    await RemoveFreind({
      variables: { userId: Number(user.id), friendId: Number(id) },
    });
    toast.success("Unfriend Successfully!!");
  };
  return (
    <div>
      {loading ||
      AddToFreindloading ||
      RemoveFreindloading ||
      CancelFreindloading ? (
        <div className="loader" />
      ) : null}
      <div className="relative flex items-center justify-between mt-6 border-b block">
        <div
          uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          className="w-full  ring-4 ring-slate-100 rounded-lg z-30 mb-5"
        >
          <div className="bg-slate-200 py-2 px-3.5 rounded-md w-full flex items-center gap-3">
            <button type="submit" className="flex">
              <ion-icon className="text-2xl" name="search" />
            </button>
            <input
              type="text"
              className="!bg-transparent !outline-none !w-full"
              placeholder="Search"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div
        className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 text-xs font-normal text-gray-500 dark:text-white/80"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100"
      >
        {data?.searchUsersByText?.length > 0 &&
          data?.searchUsersByText?.map((e) => (
            <div key={`suggestion-${e.id}`} className="flex flex-col items-center shadow-sm p-2 rounded-xl bg-white border1 dark:bg-dark2">
              <Link href={`/profile/${e?.id}`}>
                <div className="relative w-20 h-20 mx-auto mt-3">
                  <Image
                    src={
                      e?.profile?.imageUrl ? renderUrl(e?.profile?.imageUrl) : "/assets/images/placeholder.png"
                    }
                    alt=""
                    className="h-full object-cover rounded-full shadow w-full"
                    width="80"
                    height="80"
                  />
                </div>
              </Link>
              <div className="mt-5 text-center w-full">
                <Link href={`/profile/${e?.id}`}>
                  <h4 className="font-semibold text-sm text-black dark:text-white">
                    {e?.username}
                  </h4>
                </Link>
                <div className="mt-1">
                  {e?.mutualFriendsCount} Mutual Friends
                </div>
                {e.isFriend === "REQUESTED" ? (
                  <button
                    onClick={() => Cancelrequest(e?.id)}
                    type="button"
                    className="block font-semibold mt-4 py-1.5 rounded-lg text-[13px] w-full bg-slate-100/70 dark:bg-slate-700"
                  >
                    Canel Request
                  </button>
                ) : e.isFriend === "FRIEND" ? (
                  <button
                    onClick={() => UnFriend(e?.id)}
                    type="button"
                    className="block font-semibold mt-4 py-1.5 rounded-lg text-[13px] w-full bg-slate-100/70 dark:bg-slate-700"
                  >
                    UnFriend
                  </button>
                ) : (
                  <button
                    onClick={() => Addfriend(e?.id)}
                    type="button"
                    className="block font-semibold mt-4 py-1.5 rounded-lg text-[13px] w-full bg-slate-100/70 dark:bg-slate-700"
                  >
                    Add Friend
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Suggestions;
