import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
// import  Link  from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MARK_READ_ALL_MESSAGES } from "../../Graphql/Mutations";
import { GET_CHAT_MEMBER, NOT_CHATED_USERS } from "../../Graphql/Queries";
import Image from "next/image";
import { renderUrl } from "../../app/utils/assetsUrl";

const Chatsidebar = (props) => {
  const [isAlluser, setIsAlluser] = useState("Firends");
  const [searchValue, setSearchValue] = useState("");
  const params = useParams();
  const chatDetails = params?.chatDetails;
  const { user } = props;
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const { data } = useQuery(GET_CHAT_MEMBER, {
    variables: { userId: user?.id },
  });
  const { data: AllUser } = useQuery(NOT_CHATED_USERS, {
    variables: { userId: user?.id },
  });
  const isActive = chatDetails?.split("&");
  const [MarkReadAllMessagesInChat, { loading }] = useMutation(
    MARK_READ_ALL_MESSAGES,
    {
      refetchQueries: [GET_CHAT_MEMBER],
    }
  );
  const MarkasReaded = (e) => {
    MarkReadAllMessagesInChat({
      variables: {
        chatId: Number(e),
      },
    });
  };
  return (
    <>
      {loading && <div className="loader" />}
      <div className="md:w-[360px] relative border-r dark:border-slate-700">
        <div
          id="side-chat"
          className="top-0 left-0 max-md:fixed max-md:w-5/6 max-md:h-screen bg-white z-50 max-md:shadow max-md:-translate-x-full dark:bg-dark2"
        >
          {/* heading title */}
          <div className="p-4 ">
            <div className="flex mt-2 items-center justify-between">
              <h2 className="text-2xl font-bold text-black ml-1 dark:text-white">
                {" "}
                Chats{" "}
              </h2>
              {/* right action buttons */}
              <div className="flex items-center gap-2.5">
                <button className="group">
                  <ion-icon
                    name="settings-outline"
                    className="text-2xl flex group-aria-expanded:rotate-180"
                  />
                </button>
                <div
                  className="md:w-[270px] w-full"
                  uk-dropdown="pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small"
                >
                  <nav>
                    <a href="#">
                      {" "}
                      <ion-icon
                        className="text-2xl shrink-0 -ml-1"
                        name="checkmark-outline"
                      />{" "}
                      Mark all as read{" "}
                    </a>
                    <a href="#">
                      {" "}
                      <ion-icon
                        className="text-2xl shrink-0 -ml-1"
                        name="notifications-outline"
                      />{" "}
                      notifications setting{" "}
                    </a>
                    <a href="#">
                      {" "}
                      <ion-icon
                        className="text-xl shrink-0 -ml-1"
                        name="volume-mute-outline"
                      />{" "}
                      Mute notifications{" "}
                    </a>
                  </nav>
                </div>
                <button className="">
                  <ion-icon
                    name="checkmark-circle-outline"
                    className="text-2xl flex"
                  />
                </button>
                {/* mobile toggle menu */}
                <button
                  type="button"
                  className="md:hidden"
                  uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                >
                  <ion-icon name="chevron-down-outline" />
                </button>
              </div>
            </div>
            {/* search */}
            <div className="relative mt-4">
              <div className="absolute left-3 bottom-1/2 translate-y-1/2 flex">
                <ion-icon name="search" className="text-xl" />
              </div>
              <input
                type="text"
                onChange={isAlluser ? onChange : null}
                placeholder="Search"
                className="w-full !pl-10 !py-2 !rounded-lg"
              />
            </div>
            {/* users list */}
          </div>
          <div className="flex justify-around pt-3 border-b dark:border-slate-700">
            {" "}
            <div>
              <button
                className={isAlluser === "Firends" && "font-bold"}
                onClick={() => setIsAlluser("Firends")}
              >
                Firends
              </button>
            </div>
            <div>
              <button
                className={isAlluser === "Groups" && "font-bold"}
                onClick={() => setIsAlluser("Groups")}
              >
                Groups
              </button>
            </div>
            <div>
              <button
                className={isAlluser === "All_Users" && "font-bold"}
                onClick={() => setIsAlluser("All_Users")}
              >
                All Users
              </button>
            </div>
          </div>
          <div className="space-y-2 p-2 overflow-y-auto h-[calc(100vh-127px)]">
            {isAlluser === "All_Users" ? (
              AllUser?.notChated?.length > 0 ? (
                AllUser?.notChated?.map((e) => {
                  return (
                    <Link
                      key={`chat-${e?.id}`}
                      href={`/chat/${e?.id}`}
                      className={`relative flex items-center gap-4 p-2 duration-200 rounded-xl ${Number(isActive?.[0]) === e?.id
                          ? "bg-secondery"
                          : "hover:bg-secondery"
                        } `}
                    >
                      <div className="relative w-14 h-14 shrink-0">
                        <Image
                          src={
                            e?.profile?.imageUrl ? renderUrl(e?.profile?.imageUrl) :
                              "/assets/images/placeholder.png"
                          }
                          alt=""
                          className="object-cover w-full h-full rounded-full"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="mr-auto text-sm text-black dark:text-white font-medium">
                            {e?.username || "unknown"}{" "}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-center mt-2">No User Found</p>
              )
            ) : isAlluser === "Firends" ? (
              data?.getChatMembers?.length > 0 ? (
                data?.getChatMembers?.map((e) => {
                  const receiver = e.members.find((a) => a.userId !== user?.id);

                  return (
                    <Link
                      key={`chat-${receiver?.userId}&${receiver?.chatId}`}
                      href={`/chat/${receiver?.userId}&${receiver?.chatId}`}
                      onClick={() => MarkasReaded(receiver?.chatId)}
                      className={`relative flex items-center gap-4 p-2 duration-200 rounded-xl ${Number(isActive?.[0]) === receiver?.userId &&
                          Number(isActive?.[1]) === receiver?.chatId
                          ? "bg-secondery"
                          : "hover:bg-secondery"
                        } `}
                    >
                      <div className="relative w-14 h-14 shrink-0">
                        <Image
                          src={
                            receiver?.user?.profile?.imageUrl ? renderUrl(receiver?.user?.profile?.imageUrl) :
                              "/assets/images/placeholder.png"
                          }
                          height={100}
                          width={100}
                          alt=""
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="mr-auto text-sm text-black dark:text-white font-medium">
                            {receiver?.user?.username || "unknown"}{" "}
                          </div>
                          <div className="text-xs font-light text-gray-500 dark:text-white/70">
                            {moment(Number(e.lastMessage?.createdAt)).format(
                              "MMM DD"
                            )}
                          </div>
                          {e?.unreadMessagesCount > 0 && (
                            <div className="bg-blue-600 rounded-full dark:bg-slate-700 text-center text-white p-2 text-xs">
                              {e?.unreadMessagesCount}
                            </div>
                          )}
                        </div>
                        <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                          {e?.lastMessage?.message?.substring(0, 35)}
                          {e?.lastMessage?.message?.length > 35 && "..."} -{" "}
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-center mt-2">No User Found</p>
              )
            ) : null}
          </div>
        </div>
        {/* overly */}
        <div
          id="side-chat"
          className="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden"
          uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
        />
      </div>
    </>
  );
};

export default Chatsidebar;
