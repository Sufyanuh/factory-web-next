import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { GET_MY_NOTIFICATIONS } from "../../Graphql/Queries";
import { MARK_READ_NOTIFICATIONS } from "../../Graphql/Mutations";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Notificationindex = () => {
  const router = useRouter();
  const [isMoreData, setIsMoreData] = useState(true);
  const { data, loading, fetchMore, networkStatus } =
    useQuery(GET_MY_NOTIFICATIONS);
  const [MarkReadNotification] = useMutation(MARK_READ_NOTIFICATIONS, {
    refetchQueries: [GET_MY_NOTIFICATIONS],
  });
  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.getMyNotifications?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.getMyNotifications.length === 0
          ) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            getMyNotifications: [
              ...prev.getMyNotifications,
              ...fetchMoreResult.getMyNotifications,
            ],
          };
        },
      });
    }
  }, [data?.getMyNotifications?.length, fetchMore, isMoreData, networkStatus]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("Last page");
        handleFetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleFetchMore]);

  const markAsreaded = async (id) => {
    await MarkReadNotification({ variables: { notificationId: id } });
  };
  return (
    <>
      {loading && <div className="loader" />}
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner w-full pt-0">
          <div className="flex items-center justify-between px-5 py-4 mt-3">
            <h3 className="md:text-xl text-lg font-medium  text-black dark:text-white">
              Notification
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={router.back}>
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* contents list */}
          <div className="px-2 -mt-2 text-sm font-normal">
            <div className="px-5 py-3 -mx-2">
              <h4 className="font-semibold">New</h4>
            </div>
            {data?.getMyNotifications?.length > 0 ? (
              data?.getMyNotifications?.map((e) => {
                return (
                  <>
                    {e.type === "NEW_COMMENT" ||
                    e.type === "TAGGED_ON_POST" ||
                    e.type === "GROUP_JOINED" ? (
                      <Link
                        key={e.id}
                        onClick={() => markAsreaded(e?.id)}
                        href={`/post/${e?.postId}`}
                        className={`relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery ${
                          e?.isUnread === "true" && `bg-teal-500/5 mb-1`
                        }
                      `}
                      >
                        <div className="relative w-12 h-12 shrink-0">
                          {" "}
                          <Image
                            src={
                              e?.sender?.profile?.imageUrl ??
                              "/assets/images/placeholder.png"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-full"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className="flex-1 ">
                          <p>
                            {" "}
                            <b className="font-bold mr-1">
                              {" "}
                              {e?.sender?.username}
                            </b>{" "}
                            <br />
                            {e.title}
                            {/* {e.title.replace(`@${e.sender.username}`, ""} */}
                          </p>
                          <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                            {" "}
                            {moment(Number(e?.createdAt)).isSame(
                              new Date(),
                              "month"
                            )
                              ? moment(Number(e?.createdAt)).fromNow()
                              : moment(Number(e?.createdAt)).format("lll")}{" "}
                          </div>
                          {e?.isUnread === "true" && (
                            <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5" />
                          )}
                        </div>
                      </Link>
                    ) : e.type === "FRIEND" ? (
                      <Link
                        key={e.id}
                        onClick={() => markAsreaded(e?.id)}
                        href={`/profile/${e?.senderId}`}
                        className={`relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery ${
                          e?.isUnread === "true" && `bg-teal-500/5 mb-1`
                        }
                  `}
                      >
                        <div className="relative w-12 h-12 shrink-0">
                          {" "}
                          <Image
                            src={
                              e?.sender?.profile?.imageUrl ??
                              "/assets/images/placeholder.png"
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-full"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className="flex-1 ">
                          <p>
                            {" "}
                            <b className="font-bold mr-1">
                              {" "}
                              {e?.sender?.username}
                            </b>{" "}
                            <br />
                            {e.title}
                            {/* {e.title.replace(`@${e.sender.username}`, ""} */}
                          </p>
                          <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                            {" "}
                            {moment(Number(e?.createdAt)).isSame(
                              new Date(),
                              "month"
                            )
                              ? moment(Number(e?.createdAt)).fromNow()
                              : moment(Number(e?.createdAt)).format("lll")}{" "}
                          </div>
                          {e?.isUnread === "true" && (
                            <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5" />
                          )}
                        </div>
                        <button
                          type="button"
                          className="button text-white bg-secondery"
                        >
                          View
                        </button>
                      </Link>
                    ) : null}
                  </>
                );
              })
            ) : (
              <p className="text-center">NO COMMENT FOUND</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Notificationindex;
