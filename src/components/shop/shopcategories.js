import { useQuery } from "@apollo/client";
import React from "react";
// import  Link  from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import { CATEGORIES } from "../../Graphql/Queries";

const Shoptabs = ({ category, ...props }) => {
  // const { category } = useParams();
  console.log(typeof category, "<===category");
  const { data } = useQuery(CATEGORIES);
  console.log(data);
  return (
    <div className="relative" tabIndex={-1} uk-slider="finite: true">
      <div className="py-6 overflow-hidden uk-slider-container">
        <ul className="uk-slider-items w-[calc(100%+0.10px)] capitalize text-sm font-semibold">
          <li className="w-auto pr-2.5">
            {" "}
            <Link
              href={`/shop`}
              className={`px-4 py-2 rounded-lg ${category === undefined
                ? "bg-slate-600 text-white"
                : "bg-slate-200 dark:bg-dark2 text-white"
                }  inline-block hover:shadow  `}
            >
              {" "}
              {"All"}
            </Link>{" "}
          </li>
          {data?.groupCategories?.length > 0 &&
            data?.groupCategories.map((e) => {
              return (
                <li className="w-auto pr-2.5" key={e.id}>
                  {" "}
                  <Link
                    href={`/${props.link}/${e?.id}/${e?.name.replace(/\//g, " ")}`}
                    className={`px-4 py-2 rounded-lg ${category === JSON.stringify(e?.id)
                      ? "bg-slate-600 text-white"
                      : "bg-slate-200 dark:bg-dark2 text-white"
                      }  inline-block hover:shadow`}
                  >
                    {" "}
                    {e?.name}
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

export default Shoptabs;
