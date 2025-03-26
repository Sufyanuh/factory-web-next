import { NetworkStatus, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { GET_USERS_POSTS_BY_ID } from "../../Graphql/Queries";

const ProfilePost = (props) => {
  const router = useRouter();
  const [isMoreData, setIsMoreData] = useState(true);
  const { user } = props;
  const { id } = router.query;
  const { data, loading, fetchMore, networkStatus } = useQuery(
    GET_USERS_POSTS_BY_ID,
    {
      variables: { userId: Number(id) },
    }
  );
  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.getPostsByUserId?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.getPostsByUserId.length === 0
          ) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            getPostsByUserId: [
              ...prev.getPostsByUserId,
              ...fetchMoreResult.getPostsByUserId,
            ],
          };
        },
      });
    }
  }, [data?.getPostsByUserId?.length, fetchMore, isMoreData, networkStatus]);

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
  return (
    <>
      {loading && (
        <>
          <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
          <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
          <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
        </>
      )}
      <div
        className="grid lg:grid-cols-3 grid-cols-2 gap-4"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100;repeat:true"
      >
        {data?.getPostsByUserId?.length > 0 &&
          data?.getPostsByUserId?.map((e) => (
            <div
              key={e.id}
              className="relative lg:rounded-xl rounded-md overflow-hidden shadow bg-white dark:bg-dark2"
            >
              <div className="flex items-center gap-3 sm:px-4 py-3 p-2 text-sm font-normal">
                <Link href="#" className="max-md:hidden">
                  <Image
                    width={"100"}
                    height={"100"}
                    src={
                      user?.profile?.imageUrl ??
                      "/assets/images/placeholder.png"
                    }
                    alt="no Img Found"
                    className="w-6 h-6 rounded-full"
                  />
                </Link>
                <div className="flex-1">
                  <Link href="#">
                    <h4 className="text-black dark:text-white">
                      {" "}
                      {user?.username}{" "}
                    </h4>
                  </Link>
                </div>
                <div className="absolute top-0.5 right-0 md:m-2.5 m-1">
                  <button type="button" className="button__ico w-8 h-8">
                    {" "}
                    <ion-icon
                      className="text-xl"
                      name="ellipsis-horizontal"
                    />{" "}
                  </button>
                  <div
                    className="w-[232px]"
                    uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
                  >
                    <nav>
                      <Link href="#">
                        {" "}
                        <ion-icon
                          className="text-xl shrink-0"
                          name="bookmark-outline"
                        />{" "}
                        Add favorites{" "}
                      </Link>
                      <Link href="#">
                        {" "}
                        <ion-icon
                          className="text-xl shrink-0"
                          name="flag-outline"
                        />{" "}
                        Report{" "}
                      </Link>
                      <Link href="#">
                        {" "}
                        <ion-icon
                          className="text-xl shrink-0"
                          name="share-outline"
                        />{" "}
                        Share{" "}
                      </Link>
                      <hr />
                      <Link
                        href="#"
                        className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                      >
                        {" "}
                        <ion-icon
                          className="text-xl shrink-0"
                          name="stop-circle-outline"
                        />{" "}
                        Remove{" "}
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              <Link href={`/post/${e.id}`}>
                <div className="relative w-full h-48">
                  {e?.attachments[0]?.type === "IMAGE" ? (
                    <Image
                      width={"100"}
                      height={"100"}
                      src={e?.attachments[0]?.url}
                      alt=""
                      className="w-full h-full object-cover inset-0"
                    />
                  ) : e?.attachments[0]?.type === "Video" ? (
                    <video
                      src={e?.attachments[0]?.url}
                      controls
                      className="w-full h-full object-cover inset-0"
                    />
                  ) : null}
                </div>
              </Link>
              <div className="flex items-center md:gap-3 gap-1 md:py-2.5 md:px-3 p-1.5">
                <button
                  type="button"
                  className={`button__ico flex ${
                    e.isLiked
                      ? "text-red-500 bg-red-100 dark:bg-red-600 dark:text-white"
                      : "text-white-500 bg-slate-200/70 dark:bg-slate-700"
                  }`}
                >
                  {" "}
                  <ion-icon
                    className="md:text-2xl text-lg"
                    name="heart-outline"
                  />{" "}
                  {e.likeCount}
                </button>
                <button type="button" className="button__ico flex">
                  {" "}
                  <ion-icon
                    className="md:text-2xl text-lg"
                    name="chatbubble-ellipses-outline"
                  />{" "}
                  {e.commentCount}
                </button>
                <button type="button" className="button__ico ml-auto">
                  {" "}
                  <ion-icon
                    className="md:text-2xl text-lg"
                    name="bookmark-outline"
                  />{" "}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProfilePost;
