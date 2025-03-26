import { NetworkStatus, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { GALLERY_ITEMS } from "../../Graphql/Queries";

const Gallery = (props) => {
  const router = useRouter();
  const { user } = props;
  const [isMoreData, setIsMoreData] = useState(true);
  const { id } = router.query;
  const { data, loading, fetchMore, networkStatus } = useQuery(GALLERY_ITEMS, {
    variables: { userId: Number(id) },
  });
  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.galleryItems?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.galleryItems.length === 0) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            galleryItems: [
              ...prev.galleryItems,
              ...fetchMoreResult.galleryItems,
            ],
          };
        },
      });
    }
  }, [data?.galleryItems?.length, fetchMore, isMoreData, networkStatus]);

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
  console.log(user, "<==gallery");
  return (
    <>
      {/* post heading */}
      <div className="flex items-center justify-between py-3">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Gallery
        </h1>
      </div>
      {/* Post list */}
      <div
        className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-6"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100"
      >
        {data?.galleryItems?.length > 0 &&
          data?.galleryItems?.map((e) => (
            <Link
              href={`/gallery/detail/${e?.postId}/${user?.id}`}
              key={`/gallery/detail/${e?.postId}/${user?.id}`}
            >
              <div className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
                <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
                  <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                    {e.type === "IMAGE" ? (
                      <Image
                        width={"100"}
                        height={"100"}
                        src={e?.url}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    ) : e.type === "Video" ? (
                      <video
                        src={e?.url}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    ) : null}
                  </div>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm uk-transition-fade">
                    <div className="flex items-center justify-center gap-4 text-white w-full h-full">
                      <div className="flex items-center gap-2">
                        {" "}
                        <ion-icon
                          className="text-2xl"
                          name="heart-circle"
                        />{" "}
                        {e?.Post.likeCount}
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <ion-icon
                          className="text-2xl"
                          name="chatbubble-ellipses"
                        />{" "}
                        {e?.Post.commentCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <GalleryDetails
                loading={loading}
                data={selectedData}
                user={user}
              /> */}
            </Link>
          ))}

        {/* placeholders */}
        {loading && (
          <>
            <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
            <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
            <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
            <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
