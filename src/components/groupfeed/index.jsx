import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_TOPICS, GET_GROUP_BY_ID } from "../../Graphql/Queries";
import AddPost from "./addPost";
import GroupPosts from "./posts";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import GroupTopics from "./Topics";
import { renderUrl } from "../../app/utils/assetsUrl";

const firstTopic = { name: 'All', id: null }

const Grouppage = (props) => {
  const { query } = useRouter();
  const [selectedTopic, setSelectedTopic] = useState(firstTopic)

  const router = useRouter();
  const { id } = router.query;


  const { data: topics } = useQuery(GET_ALL_TOPICS, {
    variables: {
      groupId: Number(id)
    }
  });



  const { data, loading } = useQuery(GET_GROUP_BY_ID, {
    variables: { groupId: Number(id) },
  });
  const { user } = props;

  const filteredPosts = query.topic ? (topics?.getAllTopics?.find(x => x?.id == query.topic)?.posts || []) : (data?.group?.posts || [])

  const isModerator = data?.group?.members?.filter(
    mem => mem.userId === user?.id
  )[0]?.isModerator

  if (!id) {
    // Handle case where id is undefined
    console.error('ID is undefined');
    return null; // or show a fallback
  }
  
  return (
    <>
      {loading && <div className="loader" />}
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner">
          <div
            className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10"
            id="js-oversized"
          >
            {/* feed story */}
            <div className="md:max-w-[510px] mx-auto flex-1 xl:space-y-6 space-y-3">
              {/* add story */}
              <AddPost user={user} />

              {/* topics */}
              <GroupTopics groupId={id} />



              {/* posts */}
              {filteredPosts?.length > 0 ? filteredPosts?.map((post) => {
                return <GroupPosts post={post} user={user} />;
              }) : <div className="text-center text-gray-500 dark:text-white/80">No posts found</div>}

              {/* placeholder */}
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
                <div
                  className={`rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2`}
                >
                  <div className="flex justify-between text-black dark:text-white">
                    <h1 className="font-bold text-xl text-dark">
                      {" "}
                      {data?.group?.name}{" "}
                    </h1>
                  </div>
                  <img
                    src={renderUrl(data?.group?.thumbnail)}
                    className="max-w-full	 max-h-80 mb-2 inset-0"
                    alt=""
                  />
                  <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                      >
                        {" "}
                        Group Members {data?.group?.memberCount}{" "}
                      </button>
                      <button
                        type="button"
                        className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                      >
                        {" "}
                        Invite
                      </button>

                      {(user?.id == data?.group.ownerId || isModerator) ? <Link
                        href={`/groupSettings/${id}`}
                        type="button"
                        className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery text-center"
                      >
                        <ion-icon name="settings" className="text-2xl" />
                      </Link> : null}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
                  <div className="flex justify-between text-black dark:text-white">
                    <h3 className="font-bold text-base"> Members </h3>
                  </div>
                  <div
                    className="relative capitalize font-normal text-sm mt-4 mb-2"
                    tabIndex={-1}
                    uk-slider="autoplay: true;finite: true"
                  >
                    <div className="overflow-hidden uk-slider-container">
                      <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                        {data?.group?.members?.length > 0 &&
                          data?.group?.members?.map((e) => (
                            <li className="w-1/2 pr-2">
                              <Link href={`/profile/${e?.userId}`}>
                                <div className="flex flex-col items-center shadow-sm p-2 rounded-xl border1">
                                  <div className="relative w-16 h-16 mx-auto mt-2">
                                    <Image
                                      width={100}
                                      height={100}
                                      src={
                                        e?.user?.profile?.imageUrl ? renderUrl(e?.user?.profile?.imageUrl) :
                                          "/assets/images/placeholder.png"
                                      }
                                      alt=""
                                      className="h-full object-cover rounded-full shadow w-full"
                                    />
                                  </div>

                                  <div className="mt-5 text-center w-full">
                                    {" "}
                                    <h5 className="font-semibold">
                                      {" "}
                                      {e?.user?.username}
                                    </h5>{" "}
                                    <div className="text-xs text-gray-400 mt-0.5 font-medium">
                                      {" "}
                                      {e?.user?.friendCount} Friend
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
                              </Link>
                            </li>
                          ))}
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

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Grouppage;
