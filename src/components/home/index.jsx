import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { NEWS_FEED_POSTS } from "../../Graphql/Queries";
import HomePosts from "./posts";
import AddPost from "./addPost";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

const Homepage = (props) => {
  const [isMoreData, setIsMoreData] = useState(true);
  const { data, loading, fetchMore, networkStatus, refetch } = useQuery(NEWS_FEED_POSTS, { notifyOnNetworkStatusChange: true });
  const { user } = props;

  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.newsfeedPosts?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setIsMoreData(
            fetchMoreResult && fetchMoreResult.newsfeedPosts.length !== 0
          );
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            ...prev,
            newsfeedPosts: [
              ...prev.newsfeedPosts,
              ...fetchMoreResult.newsfeedPosts,
            ],
          };
        },
      });
    }
  }, [data?.newsfeedPosts?.length, fetchMore, isMoreData, networkStatus]);

  // useEffect(() => {
  //   window.addEventListener("scroll", function () {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       console.log("Last page");
  //       handleFetchMore(); // Show loading spinner and make fetch request to api
  //     }
  //   });
  // }, [handleFetchMore]);

  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div className="main__inner">
        {/* stories */}

        <div
          className="flex max-lg:flex-col xl:gap-5 md:gap-3 md:mt-10"
          id="js-oversized"
        >
          {/* feed story */}
          <div className="md:max-w-[510px] mx-auto flex-1 xl:space-y-6 space-y-3">
            {/* add story */}

            <AddPost user={user} />

            {data?.newsfeedPosts?.length > 0 && <InfiniteScroll
              className="space-y-4"
              dataLength={data?.newsfeedPosts?.length} //This is important field to render the next data
              next={handleFetchMore}
              hasMore={true}
              loader={
                <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                    <div className="flex-1 space-y-3">
                      <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                      <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                  </div>
                  <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3">
                    {" "}
                  </div>
                  <div className="flex gap-3">
                    <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                    <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                    <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                    <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                  </div>
                </div>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={refetch}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              }
            >
              {data?.newsfeedPosts?.map((post) => {
                return <HomePosts key={`post-${post.id}`} post={post} user={user} />;
              })}
              {/* placeholder */}

            </InfiniteScroll>}

            {loading && (
              <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                  <div className="flex-1 space-y-3">
                    <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                    <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                </div>
                <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3">
                  {" "}
                </div>
                <div className="flex gap-3">
                  <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                  <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                  <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                  <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                </div>
              </div>
            )}
          </div>
          {/* right sidebar */}
          <div className="lg:max-w-[370px] md:max-w-[510px] mx-auto">
            <div
              className="xl:space-y-6 space-y-3 md:pb-12"
              uk-sticky="end: #js-oversized; offset: 50; media:992"
            >
              {/* peaple you might know */}
              <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base">
                    {" "}
                    Peaple You might know{" "}
                  </h3>
                  <button type="button">
                    {" "}
                    <ion-icon name="sync-outline" className="text-xl" />{" "}
                  </button>
                </div>
                <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
                  <div className="flex items-center gap-3">
                    <Link href="profile.html">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-7.jpg"
                        alt=""
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href="profile.html">
                        <h4 className="font-semibold text-sm text-black dark:text-white">
                          {" "}
                          Johnson smith
                        </h4>
                      </Link>
                      <div className="mt-0.5"> Suggested For You </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                    >
                      {" "}
                      Follow{" "}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="profile.html">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-5.jpg"
                        alt=""
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href="profile.html">
                        <h4 className="font-semibold text-sm text-black dark:text-white">
                          {" "}
                          James Lewis
                        </h4>
                      </Link>
                      <div className="mt-0.5"> Followed by Johnson </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                    >
                      {" "}
                      Follow{" "}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="profile.html">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-2.jpg"
                        alt=""
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href="profile.html">
                        <h4 className="font-semibold text-sm text-black dark:text-white">
                          {" "}
                          John Michael
                        </h4>
                      </Link>
                      <div className="mt-0.5"> Followed by Monroe</div>
                    </div>
                    <button
                      type="button"
                      className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                    >
                      {" "}
                      Follow{" "}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="profile.html">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-3.jpg"
                        alt=""
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href="profile.html">
                        <h4 className="font-semibold text-sm text-black dark:text-white">
                          {" "}
                          Monroe Parker
                        </h4>
                      </Link>
                      <div className="mt-0.5"> Suggested For You </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                    >
                      {" "}
                      Follow{" "}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="profile.html">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-4.jpg"
                        alt=""
                        className="bg-gray-200 rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href="profile.html">
                        <h4 className="font-semibold text-sm text-black dark:text-white">
                          {" "}
                          Martin Gray
                        </h4>
                      </Link>
                      <div className="mt-0.5"> Suggested For You </div>
                    </div>
                    <button
                      type="button"
                      className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                    >
                      {" "}
                      Follow{" "}
                    </button>
                  </div>
                </div>
              </div>
              {/* latest marketplace items */}
              <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Premium Photos </h3>
                  <button type="button">
                    {" "}
                    <ion-icon name="sync-outline" className="text-xl" />{" "}
                  </button>
                </div>
                <div
                  className="relative capitalize font-medium text-sm text-center mt-4 mb-2"
                  tabIndex={-1}
                  uk-slider="autoplay: true;finite: true"
                >
                  <div className="overflow-hidden uk-slider-container">
                    <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                      <li className="w-1/2 pr-2">
                        <Link href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full md:h-40 h-full">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/product/product-3.jpg"
                                alt=""
                                className="object-cover w-full h-full inset-0"
                              />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                              {" "}
                              $12{" "}
                            </div>
                          </div>
                          <div className="mt-3 w-full"> Gaming Mouse </div>
                        </Link>
                      </li>
                      <li className="w-1/2 pr-2">
                        <Link href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full md:h-40 h-full">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/product/product-1.jpg"
                                alt=""
                                className="object-cover w-full h-full inset-0"
                              />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                              {" "}
                              $18{" "}
                            </div>
                          </div>
                          <div className="mt-3 w-full"> Deep Cleanse </div>
                        </Link>
                      </li>
                      <li className="w-1/2 pr-2">
                        <Link href="#">
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="relative w-full md:h-40 h-full">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/product/product-5.jpg"
                                alt=""
                                className="object-cover w-full h-full inset-0"
                              />
                            </div>
                            <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                              {" "}
                              $12{" "}
                            </div>
                          </div>
                          <div className="mt-3 w-full"> Chill Lotion </div>
                        </Link>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                      uk-slider-item="previous"
                    >
                      {" "}
                      <ion-icon name="chevron-back" className="text-2xl" />
                    </button>
                    <button
                      type="button"
                      className="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                      uk-slider-item="next"
                    >
                      {" "}
                      <ion-icon name="chevron-forward" className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
              {/* online friends */}
              <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Online Friends </h3>
                  <button type="button">
                    {" "}
                    <ion-icon name="sync-outline" className="text-xl" />{" "}
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-3 mt-4">
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-2.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-3.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-4.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-5.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-6.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                  <Link href="profile.html">
                    <div className="w-10 h-10 relative">
                      <Image
                        width={'100'}
                        height={'100'}
                        src="/assets/images/avatars/avatar-7.jpg"
                        alt=""
                        className="w-full h-full absolute inset-0 rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 m-0.5 bg-green-500 rounded-full w-2 h-2" />
                    </div>
                  </Link>
                </div>
              </div>
              {/* Pro Members */}
              <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Pro Members </h3>
                </div>
                <div
                  className="relative capitalize font-normal text-sm mt-4 mb-2"
                  tabIndex={-1}
                  uk-slider="autoplay: true;finite: true"
                >
                  <div className="overflow-hidden uk-slider-container">
                    <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                      <li className="w-1/2 pr-2">
                        <Link href="profile.html"></Link>
                        <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                          <Link href="profile.html"></Link>
                          <Link href="profile.html">
                            <div className="relative w-16 h-16 mx-auto mt-2">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/avatars/avatar-5.jpg"
                                alt=""
                                className="h-full object-cover rounded-full shadow w-full"
                              />
                            </div>
                          </Link>
                          <div className="mt-5 text-center w-full">
                            <Link href="profile.html">
                              {" "}
                              <h5 className="font-semibold">
                                {" "}
                                Martin Gray
                              </h5>{" "}
                            </Link>
                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                              {" "}
                              12K Followers
                            </div>
                            <button
                              type="button"
                              className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                            >
                              {" "}
                              Follow{" "}
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="w-1/2 pr-2">
                        <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                          <Link href="profile.html">
                            <div className="relative w-16 h-16 mx-auto mt-2">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/avatars/avatar-4.jpg"
                                alt=""
                                className="h-full object-cover rounded-full shadow w-full"
                              />
                            </div>
                          </Link>
                          <div className="mt-5 text-center w-full">
                            <Link href="profile.html">
                              {" "}
                              <h5 className="font-semibold">
                                {" "}
                                Alexa Park
                              </h5>{" "}
                            </Link>
                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                              {" "}
                              12K Followers
                            </div>
                            <button
                              type="button"
                              className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                            >
                              {" "}
                              Follow{" "}
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="w-1/2 pr-2">
                        <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                          <Link href="profile.html">
                            <div className="relative w-16 h-16 mx-auto mt-2">
                              <Image
                                width={'100'}
                                height={'100'}
                                src="/assets/images/avatars/avatar-4.jpg"
                                alt=""
                                className="h-full object-cover rounded-full shadow w-full"
                              />
                            </div>
                          </Link>
                          <div className="mt-5 text-center w-full">
                            <Link href="profile.html">
                              {" "}
                              <h5 className="font-semibold">
                                {" "}
                                James Lewis
                              </h5>{" "}
                            </Link>
                            <div className="text-xs text-gray-400 mt-0.5 font-medium">
                              {" "}
                              15K Followers
                            </div>
                            <button
                              type="button"
                              className="bg-secondery block font-semibold mt-4 py-1.5 rounded-lg text-sm w-full border1"
                            >
                              {" "}
                              Follow{" "}
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="absolute -translate-y-1/2 bg-slate-100 rounded-full top-1/2 -left-4 grid w-9 h-9 place-items-center dark:bg-dark3"
                      uk-slider-item="previous"
                    >
                      {" "}
                      <ion-icon name="chevron-back" className="text-2xl" />
                    </button>
                    <button
                      type="button"
                      className="absolute -right-4 -translate-y-1/2 bg-slate-100 rounded-full top-1/2 grid w-9 h-9 place-items-center dark:bg-dark3"
                      uk-slider-item="next"
                    >
                      {" "}
                      <ion-icon name="chevron-forward" className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Trends */}
              <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                <div className="flex justify-between text-black dark:text-white">
                  <h3 className="font-bold text-base"> Trends for you </h3>
                  <button type="button">
                    {" "}
                    <ion-icon name="sync-outline" className="text-xl" />{" "}
                  </button>
                </div>
                <div className="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80">
                  <Link href="#">
                    <div className="flex items-center gap-3 p">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 -mt-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">
                          {" "}
                          artificial intelligence{" "}
                        </h4>
                        <div className="mt-0.5"> 1,245,62 post </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 -mt-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">
                          {" "}
                          Web developers
                        </h4>
                        <div className="mt-0.5"> 1,624 post </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 -mt-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">
                          {" "}
                          Ui Designers
                        </h4>
                        <div className="mt-0.5"> 820 post </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="#" className="block">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 -mt-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black dark:text-white text-sm">
                          {" "}
                          affiliate marketing{" "}
                        </h4>
                        <div className="mt-0.5"> 480 post </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Homepage;
