import { NetworkStatus, useQuery } from "@apollo/client";
import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIZED_SCHEDULED_SHOWS } from "../../Graphql/Queries";
import Categories from "../shop/shopcategories";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Allevents = () => {
  const router = useRouter();
  const [isMoreData, setIsMoreData] = useState(true);
  const { data, loading, fetchMore, networkStatus } = useQuery(
    CATEGORIZED_SCHEDULED_SHOWS,
    { variables: { take: 10 } }
  );

  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.categorizedScheduledShows?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.categorizedScheduledShows.length === 0
          ) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            categorizedScheduledShows: [
              ...prev.categorizedScheduledShows,
              ...fetchMoreResult.categorizedScheduledShows,
            ],
          };
        },
      });
    }
  }, [
    data?.categorizedScheduledShows?.length,
    fetchMore,
    isMoreData,
    networkStatus,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("Last page");
        handleFetchMore(); // Show loading spinner and make fetch request to API
      }
    });
  }, [handleFetchMore]);
  
  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div className="main__inner pt-6">
        {/* heading title */}
        <div className="page__heading">
          <button onClick={() => router.back()} href={-1}>
            <ion-icon name="chevron-back-outline" /> Back
          </button>
          <h1>Schedule Events</h1>
        </div>
        {/* category list */}
        <Categories link={"scheduleevents"} />

        <div className="mt-8">
          {data?.categorizedScheduledShows?.length > 0 &&
            data?.categorizedScheduledShows?.map((e) => (
              <>
                <div className="flex items-center justify-between py-3" key={e.id}>
                  <h1 className="text-xl font-bold text-black dark:text-white">
                    {e.name}{" "}
                  </h1>
                </div>
                <div
                  className="grid gap-3 lg:gap-4 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-3 grid-cols-2"
                  uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100;repeat:true"
                >
                  {/* single reels */}
                  {e?.scheduledStreams?.length > 0 &&
                    e?.scheduledStreams?.map((stream) => {
                      const date = moment(Number(stream.date)).format(
                        "DD-MM-YYYY"
                      );
                      const time = moment(Number(stream.time)).format("HH:mm");
                      const duration = moment(
                        `${date} ${time}`,
                        "DD-MM-YYYY HH:mm"
                      ).calendar({ sameElse: "MM.DD.YYYY" });
                      return (
                        <>
                          <Link href={stream.isStarted ? `/auction/${stream.id}` : `/scheduleevents/${stream.id}`} key={stream.id}>
                            {" "}
                            <div className="relative w-full lg:h-[270px] aspect-[2.5/4] overflow-hidden rounded-lg shrink-0 uk-transition-toggle">
                              {stream.mediaType === "IMAGE" ? (
                                <Image
                                  className="object-cover w-full h-full"
                                  src={stream?.media || "assets/images/icon-play.svg"}
                                  alt=""
                                  height={100}
                                  width={100}
                                />
                                // <></>
                              ) : (
                                <video
                                  className="object-cover w-full h-full"
                                  src={stream.media}
                                  alt=""
                                  autoPlay={false}
                                />
                              )}
                              <Image
                                src="assets/images/icon-play.svg"
                                alt=""
                                className="w-12 h-12 absolute z-10 top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 uk-transition-fade"
                                height={100}
                                width={100}
                              />
                              <div className="absolute top-1 z-10 text-start bg-full p-3">
                                {stream.isStarted ? (
                                  <p className="text-white p-2 text-sm bg-red-600 rounded">
                                    Live
                                  </p>
                                ) : (
                                  <p className="text-white text-sm">
                                    {duration}
                                  </p>
                                )}
                              </div>
                              <div
                                className="w-full h-screen absolute top-0"
                                style={{ background: "#0000004f" }}
                              />
                              <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-8 p-3 flex justify-between text-white uk-transition-slide-bottom">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={stream.user?.profile?.imageUrl}
                                    alt=""
                                    className="w-5 h-5 rounded-full"
                                    height={100}
                                    width={100}
                                  />
                                  <div className="text-sm">
                                    {" "}
                                    {stream?.user?.username}{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="font-normal pt-3 pb-2.5">
                              <div className="line-clamp-2 text-sm">
                                {" "}
                                {e?.title}{" "}
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                </div>
                {e?.scheduledStreams?.length === 0 && (
                  <p className="w-full text-center">
                    No Streams available in this category
                  </p>
                )}
              </>
            ))}
          {loading && (
            <>
              <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
              <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
              <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
              <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
            </>
          )}
          {/* post heading */}
        </div>
      </div>
    </main>
  );
};

export default Allevents;
