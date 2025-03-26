import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_CATEGORIES_GROUPS } from "../../Graphql/Queries";
import Shoptabs from "../shop/shopcategories";
import OwnedGroups from "./Ownedgroups";
import OtherGroups from "./Othergroups";
import Allgroups from "./allGroups";
import Link from "next/link";

const GroupIndex = (props) => {
  const { user } = props;
  const [groupType, setGroupType] = useState(true);
  const [search, setSearch] = useState("");
  const { data, loading } = useQuery(GET_CATEGORIES_GROUPS, {
    variables: { onlyMyGroups: groupType, search: search },
  });
  // console.log(data, loading);


  return (
    <>
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small] ">
        <div className="max-w-3xl p-6 mx-auto ">
          <nav
            className="border-b dark:border-slate-700"
            uk-sticky="cls-active: dark:bg-transparent bg-slate-100/60 z-30 backdrop-blur-lg px-4 ;  animation: uk-animation-slide-top"
          >
            <div className="page__heading">
              <h1> Groups </h1>
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <ul
              uk-tab=""
              className="flex justify-around gap-5 text-sm text-center text-gray-600 capitalize font-semibold -mb-px dark:text-white/80"
              uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
            >
              <li>
                <Link
                  href="/Groups"
                  onClick={() => setGroupType(true)}
                  className="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                >
                  Owned
                </Link>
              </li>
              <li>
                <Link
                  href="/Groups"
                  onClick={() => setGroupType(false)}
                  className="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                >
                  Other
                </Link>
              </li>
            </ul>
          </nav>
          {groupType ? (
            <Shoptabs link={"Groups/owned"} />
          ) : (
            <Shoptabs link={"Groups/other"} />
          )}
          <div className="mt-8 ">
            {groupType ? (
              <OwnedGroups data={data} groupType={groupType} />
            ) : (
              <OtherGroups data={data} groupType={groupType} />
            )}
            {loading && (
              <>
                <div className="w-full lg:h-60 h-full aspect-[1/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
                <div className="w-full lg:h-60 h-full aspect-[2/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />{" "}
              </>
            )}
            {/* post heading */}
          </div>
        </div>
        <div className="fixed top-1/3 right-0 ">
          <Link href={'/group/allgroups'} className="px-4 py-2 rounded-lg bg-slate-200  inline-block hover:shadow dark:bg-dark2 ">
            {" "}
            All Groups
          </Link>
        </div>
      </main>
    </>
  );
};

export default GroupIndex;
