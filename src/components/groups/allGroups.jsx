import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_GROUPS } from "../../Graphql/Queries";
import Link from "next/link";
import Image from "next/image";

const Allgroups = (props) => {
  const { user } = props;
  const { data, loading } = useQuery(GET_ALL_GROUPS);
  return (
    <>
      {loading && <div className="loader" />}

      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small] ">
        <div className="max-w-3xl p-6 mx-auto ">
          <nav
            className="border-b dark:border-slate-700"
            uk-sticky="cls-active: dark:bg-transparent bg-slate-100/60 z-30 backdrop-blur-lg px-4 ;  animation: uk-animation-slide-top"
          >
            <div className="page__heading">
              <h1>All Groups</h1>
            </div>

            {/* tab style two .  default this tab is hidden just remove to see style tab 2 */}
            <div className="relative flex items-center justify-between mt-6  block">
              <div
                uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                className="w-full  ring-4 ring-slate-100 rounded-lg z-30 mb-5"
              >
                <div className="dark:bg-transparent bg-slate-200 py-2 px-3.5 rounded-md w-full flex items-center gap-3">
                  <button type="submit" className="flex">
                    <ion-icon className="text-2xl" name="search" />
                  </button>
                  <input
                    type="text"
                    className="!bg-transparent !outline-none !w-full"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </nav>
          {data?.groups?.length > 0 && (
            <div
              className="grid xs:grid-cols-3 md:grid-cols-3 gap-3 mt-2"
              // uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100;repeat:true"
            >
              {data?.groups?.map((group) => (
                <>
                  <Link href={`/groupsFeeds/${group?.id}`}>
                    {" "}
                    <div className="relative w-full lg:h-[270px] aspect-[2.5/4] overflow-hidden rounded-lg shrink-0 ">
                      <Image
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                        src={group.thumbnail || "/assets/images/placeholder.png"}
                        alt=""
                      />

                      <div className="absolute top-1 z-10 text-start bg-full p-3 ">
                        {/* {groupType && (
                            <span className="text-white p-2 rounded-full text-sm bg-green-400 rounded-5 me-2">
                              Owned
                            </span>
                          )} */}
                        <span className="text-white p-2 rounded-full text-sm bg-blue-600 rounded-5 me-2">
                          {group?.visibility?.charAt(0).toUpperCase() +
                            group?.visibility?.slice(1).toLowerCase()}
                        </span>
                        <span className="text-white p-2 rounded-full text-sm bg-pink-500 rounded-5">
                          <ion-icon name="people-outline"></ion-icon>{" "}
                          {group?.memberCount}
                        </span>
                      </div>
                      <div
                        className="w-full h-full absolute top-0 "
                        style={{ background: "#0000004f" }}
                      />
                      <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-8 p-3 flex justify-between text-white ">
                        <div className="flex  items-center gap-2">
                          <div className="text-sm"> {group?.name} </div>
                        </div>
                        {group.members.find(
                          (s) => s.userId === Number(user?.id)
                        )?.isApproved === "APPROVED" ? (
                          <div>
                            <Link href={`/groupsFeeds/${group?.id}`}>
                              <button
                                type="button"
                                className="button bg-green-500 text-white px-8 "
                                // uk-close
                              >
                                Joined
                              </button>
                            </Link>
                          </div>
                        ) : (
                          <div>
                            <Link
                              href={`#`}
                              type="button"
                              className="button bg-blue-500 text-white px-8"
                            >
                              Join
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Allgroups;
