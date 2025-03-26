import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GET_USER_BY_ID, GET_USER_CONVERSATIONS } from "../../Graphql/Queries";
import Chatsidebar from "./chatsidebar";
// import  Link  from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import Receiver from "./receiver";
import Sender from "./sender";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageBox from "./MessageBox";
import UserProfile from "./UserProfile";
import { NEW_MESSAGE } from "../../Graphql/subscription";
import { useParams } from "next/navigation";
import Image from "next/image";
import { renderUrl } from "../../app/utils/assetsUrl";

const Chatindex = (props) => {
  const [isMoreData, setIsMoreData] = useState(true);
  const bottomref = useRef();
  const { user } = props;
  const params = useParams();
  const chatDetails = params?.chatDetails;
  const isActive = chatDetails?.split("&");
  const { data: receiverData, loading } = useQuery(GET_USER_BY_ID, {
    variables: { userId: Number(isActive?.[0]) },
  });
  const {
    data,
    loading: messageLoading,
    fetchMore,
    networkStatus,
    subscribeToMore
  } = useQuery(GET_USER_CONVERSATIONS, {
    variables: {
      chatId: Number(isActive?.[1]),
      senderId: Number(user?.id),
      receiverId: Number(isActive?.[0]),
    },
  });
  const goToBottom = useCallback(() => {
    if (bottomref && bottomref.current) {
      bottomref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomref, isActive]);
  useEffect(() => {
    goToBottom();
  }, [goToBottom]);


  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.getMyConversations?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setIsMoreData(
            fetchMoreResult && fetchMoreResult.getMyConversations.length !== 0
          );
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            ...prev,
            getMyConversations: [
              ...prev.getMyConversations,
              ...fetchMoreResult.getMyConversations,
            ],
          };
        },
      });
    }
  }, [data?.getMyConversations?.length, fetchMore, isMoreData, networkStatus]);
  useEffect(() => {
    const abc = subscribeToMore({
      document: NEW_MESSAGE,
      variables: {
        chatId: Number(isActive?.[1]) ? Number(isActive?.[1]) : 0,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newFeedItem = subscriptionData.data.messageCreated;
        return Object.assign({}, prev, {
          getMyConversations: [newFeedItem, ...prev.getMyConversations],
        });
      },
    });

    return abc;
  }, [isActive?.[1], subscribeToMore]);
  return (
    <>
      {loading || (messageLoading && <div className="loader" />)}
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="2xl:max-w-6xl mx-auto h-screen relative shadow-lg overflow-hidden border1 max-md:pt-14">
          <div className="flex bg-white dark:bg-dark2">
            {/* sidebar */}
            <Chatsidebar user={user} />
            {/* message center */}
            {chatDetails && (
              <div className="flex-1">
                {/* chat heading */}
                <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
                  <div className="flex items-center sm:gap-4 gap-2">
                    {/* toggle for mobile */}
                    <button
                      type="button"
                      className="md:hidden"
                      uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full"
                    >
                      <ion-icon
                        name="chevron-back-outline"
                        className="text-2xl -ml-4"
                      />
                    </button>
                    <div
                      className="relative cursor-pointer max-md:hidden"
                      uk-toggle="target: .rightt ; cls: hidden"
                    >
                      <Image
                        src={
                          receiverData?.user?.profile?.imageUrl ? renderUrl(receiverData?.user?.profile?.imageUrl) :
                            "/assets/images/placeholder.png"
                        }
                        alt=""
                        className="w-8 h-8 rounded-full shadow"
                        width={32}
                        height={32}
                      />
                      <div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px" />
                    </div>
                    <div
                      className="cursor-pointer"
                      uk-toggle="target: .rightt ; cls: hidden"
                    >
                      <div className="text-base font-bold">
                        {" "}
                        {receiverData?.user?.username}
                      </div>
                      <div className="text-xs text-green-500 font-semibold">
                        {" "}
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="button__ico">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hover:bg-slate-100 p-1.5 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="hover:bg-slate-100 p-1.5 rounded-full"
                      uk-toggle="target: .rightt ; cls: hidden"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* chats bubble */}
                <div
                  id="scrolling-chats"
                  className="flex flex-col-reverse w-full p-5 py-10 overflow-y-auto md:h-[calc(100vh-137px)] h-[calc(100vh-250px)]"
                >
                  {data?.getMyConversations?.length === 0 && (
                    <div className="py-10 text-center text-sm lg:pt-8">
                      <Image
                        src={
                          receiverData?.user?.profile?.imageUrl ? renderUrl(receiverData?.user?.profile?.imageUrl) :
                            "/assets/images/placeholder.png"
                        }
                        className="w-24 h-24 rounded-full mx-auto mb-3"
                        alt=""
                        width={96}
                        height={96}
                      />
                      <div className="mt-8">
                        <div className="md:text-xl text-base font-medium text-black dark:text-white">
                          {" "}
                          {receiverData?.user?.username}{" "}
                        </div>
                        <div className="text-gray-500 text-sm   dark:text-white/80">
                          {" "}
                          @ {receiverData?.user?.username}{" "}
                        </div>
                      </div>
                      <div className="mt-3.5">
                        <Link
                          href={`/profile/${receiverData?.user?.profile?.userId}`}
                          className="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery"
                        >
                          View profile
                        </Link>
                      </div>
                    </div>
                  )}
                  {data?.getMyConversations?.length > 0 && (
                    <InfiniteScroll
                      dataLength={data?.getMyConversations?.length}
                      next={handleFetchMore}
                      hasMore={isMoreData}
                      inverse={true}
                      loader={
                        isMoreData &&
                        data?.getMyConversations?.length > 14 && (
                          <h4 className="text-center">Loading...</h4>
                        )
                      }
                      scrollableTarget="scrolling-chats"
                      style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                      }}
                    >
                      <div className="text-sm font-medium space-y-6">
                        {data?.getMyConversations?.length > 0 &&
                          data?.getMyConversations
                            ?.toReversed()
                            ?.map((e) =>
                              e?.sender?.userId === user?.id ? (
                                <Sender data={e} />
                              ) : (
                                <Receiver data={e} />
                              )
                            )}
                        <div ref={bottomref} />
                      </div>
                    </InfiniteScroll>
                  )}
                </div>
                {/* sending message area */}
                <MessageBox user={user} />
              </div>
            )}
            {/* user profile right info */}
            <UserProfile receiverData={receiverData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Chatindex;
