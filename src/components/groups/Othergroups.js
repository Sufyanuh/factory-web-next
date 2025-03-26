import React from "react";
import Link from "next/link";
import Image from "next/image";

const OtherGroups = (props) => {
  const { data, groupType } = props;
  return (
    <>
      {data?.groupCategories.length > 0 &&
        data?.groupCategories.map((groups) => {
          return (
            <>
              {groups?.groups.length >= 1 && (
                <div className="page__heading">
                  <h1>{groups?.name}</h1>
                </div>
              )}
              {groups?.groups.length >= 1 && (
                <div
                  className="grid xs:grid-cols-3 md:grid-cols-3 gap-3 mt-2"
                  uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100;repeat:true"
                >
                  {groups?.groups.map((group) => (
                    <>
                      <Link href={`/groupsFeeds/${group?.id}`}>
                        {" "}
                        <div className="relative w-full lg:h-[270px] aspect-[2.5/4] overflow-hidden rounded-lg shrink-0 uk-transition-toggle">
                          <Image
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                            src={group.thumbnail || '/assets/images/placeholder.png'}
                            alt=""
                          />

                          <div className="absolute top-1 z-10 text-start bg-full p-3 uk-transition-slide-top">
                            {groupType && (
                              <span className="text-white p-2 rounded-full text-sm bg-green-400 rounded-5 me-2">
                                Owned
                              </span>
                            )}
                            <span className="text-white p-2 rounded-full text-sm bg-blue-600 rounded-5 me-2">
                              {group?.visibility.charAt(0).toUpperCase() +
                                group?.visibility.slice(1).toLowerCase()}
                            </span>
                            <span className="text-white p-2 rounded-full text-sm bg-pink-500 rounded-5">
                              <ion-icon name="people-outline"></ion-icon>{" "}
                              {group?.memberCount}
                            </span>
                          </div>
                          <div
                            className="w-full h-full absolute top-0 uk-transition-slide-left"
                            style={{ background: "#0000004f" }}
                          />
                          <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-8 p-3 flex justify-between text-white uk-transition-slide-bottom">
                            <div className="flex  items-center gap-2">
                              <div className="text-sm"> {group?.name} </div>
                            </div>
                            <div>
                              <Link
                                href={`/groupsFeeds/${group?.id}`}
                                type="button"
                                className="button bg-blue-500 text-white px-8"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              )}
            </>
          );
        })}
    </>
  );
};

export default OtherGroups;
