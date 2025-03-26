import { useMutation } from "@apollo/client";
import React from "react";
import { REMOVE_FRIENDS } from "../../Graphql/Mutations";
import { GET_MY_FIRENDS } from "../../Graphql/Queries";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import { renderUrl } from "../../app/utils/assetsUrl";

const Firends = (props) => {
  const { data, user } = props;
  const [RemoveFreind, { loading }] = useMutation(REMOVE_FRIENDS, {
    refetchQueries: [
      GET_MY_FIRENDS,
      { variables: { userId: Number(user?.id) } },
    ],
  });
  const UnFriend = async (id) => {
    await RemoveFreind({
      variables: { userId: Number(user.id), friendId: Number(id) },
    });
  };
  return (
    <div>
      {loading && <div className="loader" />}
      <div
        className="space-y-6 text-sm font-normal text-gray-500"
        uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100 "
      >
        {data?.length > 0
          ? data?.map((e) => (
              <div key={`friend-${e.id}`} className="flex items-center justify-between gap-4">
                <Link href={`/profile/${e?.id}`}>
                  <div className="relative w-12 h-12">
                    <Image
                      src={
                        e?.profile?.imageUrl ? renderUrl(e?.profile?.imageUrl) : "/assets/images/placeholder.png"
                      }
                      className="object-cover w-full h-full rounded-full"
                      alt=""
                      width="48"
                      height="48"
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link href={`/profile/${e?.id}`}>
                    <h4 className="text-base font-medium text-black dark:text-white">
                      {e?.username}
                    </h4>
                  </Link>
                  <p className="mt-0.5">{e?.firendCount} Firends</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => UnFriend(e?.id)}
                    type="button"
                    className="button bg-primary-soft text-primary border border-primary/10 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  >
                    <span className="max-md:hidden">UnFriend</span>
                  </button>
                  <button
                    type="button"
                    className="text-white bg-primary button"
                  >
                    <span className="max-md:hidden"> Message </span>
                  </button>
                </div>
              </div>
            ))
          : "no Firends Found"}
      </div>
    </div>
  );
};

export default Firends;
