import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import {
  ADD_FRIENDS,
  CANCEL_REQUESTS,
  REMOVE_FRIENDS,
} from "../../Graphql/Mutations";
import { GET_USER_BY_ID } from "../../Graphql/Queries";
import { useCurrentuser } from "../../app/hook";
import Gallery from "./gallery";
import ProfilePost from "./post";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import EditProfile from "./edit";

const Profileindex = () => {
  const router = useRouter();
  const { data: user } = useCurrentuser();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_USER_BY_ID, {
    variables: { userId: Number(id) },
  });
  const [SendRequest, { error, loading: AddToFreindloading }] = useMutation(
    ADD_FRIENDS,
    {
      refetchQueries: [
        GET_USER_BY_ID,
        {
          variables: { userId: Number(id) },
        },
      ],
    }
  );
  const [RemoveFreind, { loading: RemoveFreindloading }] = useMutation(
    REMOVE_FRIENDS,
    {
      refetchQueries: [
        GET_USER_BY_ID,
        {
          variables: { userId: Number(id) },
        },
      ],
    }
  );
  const [CancelRequest, { loading: CancelFreindloading }] = useMutation(
    CANCEL_REQUESTS,
    {
      refetchQueries: [
        GET_USER_BY_ID,
        {
          variables: { userId: Number(id) },
        },
      ],
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
      variables: {
        userId: Number(user?.currentUser?.id),
        friendId: Number(id),
      },
    });
    toast.success("Unfriend Successfully!!");
  };
  return (
    <>
      {loading ||
      AddToFreindloading ||
      RemoveFreindloading ||
      CancelFreindloading ? (
        <div className="loader" />
      ) : null}{" "}
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner">
          {/* profile  */}
          <div className="py-6 relative">
            <div className="flex md:gap-16 gap-4 max-md:flex-col">
              <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                  <Image
                    width={"100"}
                    height={"100"}
                    src={
                      data?.user?.profile?.imageUrl ??
                      "/assets/images/placeholder.png"
                    }
                    alt=""
                    className="w-full h-full absolute object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex block"
                >
                  {" "}
                  <ion-icon name="camera" className="text-2xl" />
                </button>
              </div>
              <div className="max-w-2x flex-1">
                <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
                  {" "}
                  {data?.user?.username}{" "}
                </h3>
                <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">
                  @{data?.user?.username}{" "}
                </p>
                <p className="text-sm mt-2 md:font-normal font-light">
                  {" "}
                  {data?.user?.profile?.bio}
                </p>

                <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
                  <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                    {/* <div>
                      <p>Posts</p>
                      <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                        162
                      </h3>
                    </div> */}
                    <div>
                      <p>Friends</p>
                      <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                        {data?.user?.friendCount}
                      </h3>
                    </div>
                    <div>
                      <p>Mutual Friends</p>
                      <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                        {data?.user?.mutualFriendsCount}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {user?.currentUser?.id !== Number(id) ? (
                      data?.user?.isFriend === "REQUESTED" ? (
                        <button
                          onClick={() => Cancelrequest(data?.user?.id)}
                          type="button"
                          className="button bg-pink-100 text-pink-600 border border-pink-200"
                        >
                          Canel Request
                        </button>
                      ) : data?.user?.isFriend === "FRIEND" ? (
                        <button
                          onClick={() => UnFriend(data?.user?.id)}
                          type="button"
                          className="button bg-pink-100 text-pink-600 border border-pink-200"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          onClick={() => Addfriend(data?.user?.id)}
                          type="button"
                          className="button text-gray-600 bg-slate-200 "
                        >
                          Follow
                        </button>
                      )
                    ) : (
                      <button
                        uk-toggle="target: #EditProfile"
                        type="button"
                        className="button text-gray-600 bg-slate-200 "
                      >
                        Edit
                      </button>
                    )}
                    {user?.currentUser?.id !== Number(id) && (
                      <Link
                        href={`/chat/${data?.user?.id}`}
                        className="button bg-pink-600 text-white"
                      >
                        Message
                      </Link>
                    )}
                    <div>
                      <button
                        type="button"
                        className="rounded-lg bg-slate-200/60 flex px-2 py-1.5 dark:bg-dark2"
                      >
                        {" "}
                        <ion-icon
                          className="text-xl"
                          name="ellipsis-horizontal"
                        />
                      </button>
                      <div
                        className="w-[240px]"
                        uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10"
                      >
                        <nav>
                          <Link href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="time-outline"
                            />{" "}
                            Mute story{" "}
                          </Link>
                          <Link href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="flag-outline"
                            />{" "}
                            Report{" "}
                          </Link>
                          <Link href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="share-outline"
                            />{" "}
                            Share profile{" "}
                          </Link>
                          <hr />
                          <Link
                            href="#"
                            className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                          >
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="stop-circle-outline"
                            />{" "}
                            Block{" "}
                          </Link>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {/* sticky tabs */}
            <div uk-sticky="cls-active: bg-slate-100/60 z-30 backdrop-blur-lg px-4 dark:bg-slate-800/60; start: 500; animation: uk-animation-slide-top">
              <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
                <ul
                  className="flex gap-2 justify-center border-t dark:border-slate-700"
                  uk-switcher="connect: #story_tab ; animation: uk-animation-fade, uk-animation-slide-left-medium"
                >
                  <li>
                    {" "}
                    <Link
                      href="#"
                      className="flex items-center p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      {" "}
                      <ion-icon
                        className="mr-2 text-2xl"
                        name="camera-outline"
                      />{" "}
                      Gallery
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link
                      href="#"
                      className="flex items-center p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      {" "}
                      <ion-icon
                        className="mr-2 text-2xl"
                        name="pricetags-outline"
                      />{" "}
                      Post{" "}
                    </Link>{" "}
                  </li>
                </ul>
              </nav>
            </div>
            <div id="story_tab" className="uk-switcher">
              {/* Post list */}
              <div>
                {/* hightlets slider post */}

                {/* Gallery list  */}
                <div className="mt-8">
                  <Gallery user={data?.user} />
                </div>
                {/* load more */}
              </div>
              {/* Product  list */}

              {/* Post list */}
              <div className="pt-16">
                <ProfilePost user={data?.user} />
              </div>
            </div>
          </div>
          <EditProfile user={data?.user} />
        </div>
      </main>
    </>
  );
};

export default Profileindex;
