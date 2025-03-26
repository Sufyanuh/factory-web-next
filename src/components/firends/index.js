import React from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Firends from "./firends";
import Suggestions from "./suggestions";
import { useQuery } from "@apollo/client";
import { GET_MY_FIRENDS } from "../../Graphql/Queries";

const Firendindex = (props) => {
  const { user } = props;
  const { data, loading } = useQuery(GET_MY_FIRENDS, {
    variables: { userId: Number(user?.id) },
  });
  return (
    <>
      {loading && <div className="loader" />}
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="max-w-3xl p-6 mx-auto">
          {/* heading title */}
          <div className="page__heading">
            <Link href="/">
              <ion-icon name="chevron-back-outline" /> Back
            </Link>
            <h1>Peoples</h1>
          </div>
          {/* tabs */}
          <nav
            className="border-b dark:border-slate-700"
            uk-sticky="cls-active: bg-slate-100/60 z-30 backdrop-blur-lg px-4 ;  animation: uk-animation-slide-top"
          >
            <ul
              uk-tab=""
              className="flex gap-5 text-sm text-center text-gray-600 capitalize font-semibold -mb-px dark:text-white/80"
              uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
            >
              <li>
                <Link
                  href="#"
                  className="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                >
                  Firends {data?.getMyFriends?.length}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block py-5 border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                >
                  Suggestions
                </Link>
              </li>
            </ul>
          </nav>
          <div className="uk-switcher mt-10" id="ttabs">
            {/* list Two */}
            {user !== undefined && (
              <Firends data={data?.getMyFriends} user={user} />
            )}
            {/* list Three */}
            <Suggestions user={user} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Firendindex;
