import { useQuery } from "@apollo/client";
import React from "react";
// import  Link  from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import { CATEGORIES, GET_ALL_TOPICS } from "../../Graphql/Queries";
import { useParams } from "next/navigation";

const GroupTopics = ({ category, groupId, ...props }) => {
    const { query } = useRouter();
    console.log(query, "<===category");
    const { data } = useQuery(GET_ALL_TOPICS, {
        variables: {
            groupId: Number(groupId)
        }
    });

    return (
        <div className="relative" tabIndex={-1} uk-slider="finite: true">
            <div className="py-6 overflow-hidden uk-slider-container">
                <ul className="uk-slider-items w-[calc(100%+0.10px)] capitalize text-sm font-semibold">
                    {data?.getAllTopics?.length > 0 &&
                        data?.getAllTopics.map((e) => {
                            // console.log(query?.topic?.toLowerCase() === e?.name?.toLowerCase(), query?.topic?.toLowerCase(), e?.name?.toLowerCase())
                            return (
                                <li className="w-auto pr-2.5" key={e.id}>
                                    {" "}
                                    <Link
                                        href={`/groupsFeeds/${groupId}${e?.id ? "?topic=" + e?.id : ""}`}
                                        className={`px-4 py-2 rounded-lg ${query?.topic == e?.id
                                            ? "bg-slate-600 text-white"
                                            : "bg-slate-200 dark:bg-dark2 text-white"
                                            }  inline-block hover:shadow`}
                                    >
                                        {" "}
                                        {e?.name} ({e?.postCount})
                                    </Link>{" "}
                                </li>
                            )
                        })}
                </ul>
            </div>
            <Link
                className="absolute left-0 -translate-y-1/2 top-1/2 flex items-center w-16 h-12 p-2.5 justify-start bg-gradient-to-r from-bgbody via-bgbody"
                href="#"
                uk-slider-item="previous"
            >
                {" "}
                <ion-icon name="chevron-back" className="text-2xl" />{" "}
            </Link>
            <Link
                className="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-16 h-12 p-2.5 justify-end bg-gradient-to-l from-bgbody via-bgbody"
                href="#"
                uk-slider-item="next"
            >
                {" "}
                <ion-icon name="chevron-forward" className="text-2xl" />{" "}
            </Link>
        </div>
    );
};

export default GroupTopics;
