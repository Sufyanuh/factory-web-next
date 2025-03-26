import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Shoptabs from "./shopcategories";
import { GET_PRODUCT_FILTER } from "../../Graphql/Queries";

const ShopProductFilter = () => {
  const router = useRouter();
  const { category, categoryName } = router.query;
  const [isMoreData, setIsMoreData] = useState(true);
  const [fields, setFields] = useState({
    categoryId: Number(category),
    search: undefined,
  });
  const onChange = (e) => {
    setFields({
      ...fields,
      search: e.target.value === "" ? undefined : e.target.value,
    });
  };
  const {
    data,
    loading,
    fetchMore,
    networkStatus,
    refetch: queryFetch,
  } = useQuery(
    GET_PRODUCT_FILTER,
    { variables: fields },
    { notifyOnNetworkStatusChange: true }
  );
  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.getProducts?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.getProducts.length === 0) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            getProducts: [...prev.getProducts, ...fetchMoreResult.getProducts],
          };
        },
      });
    }
  }, [data?.getProducts?.length, fetchMore, isMoreData, networkStatus]);

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
  useEffect(() => {
    setFields({
      ...fields,
      categoryId: Number(category),
    });
    queryFetch();
  }, [category]);
  console.log(data);
  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div className="main__inner">
        <div uk-sticky="cls-active: bg-dark z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top">
          {/* heading title */}
          <div className="page__heading">
            <h1> Market </h1>
          </div>

          {/* tab style two .  default this tab is hidden just remove to see style tab 2 */}
          <div className="relative flex items-center justify-between mt-6 border-b block">
            <div
              uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              className="w-full  ring-4 ring-slate-100 rounded-lg z-30 mb-5"
            >
              <div className="bg-slate-200 py-2 px-3.5 rounded-md w-full flex items-center gap-3">
                <button type="submit" className="flex">
                  <ion-icon className="text-2xl" name="search" />
                </button>
                <input
                  type="text"
                  className="!bg-transparent !outline-none !w-full"
                  placeholder="Search"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="uk-switcher" id="market_tab">
          {/* product list */}
          <div>
            {/* category list */}
            <Shoptabs link={"shop"} />
            {/* product list  */}

            {/* single item */}
            {data?.getProducts.length > 0 && (
              <div>
                <div className="page__heading">{<h1>{categoryName}</h1>}</div>
                <div
                  className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2"
                  uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100"
                >
                  {data?.getProducts?.map((e) => (
                    <div>
                      <Link href={`/product/${e.id}`}>
                        <div className="relative overflow-hidden rounded-lg">
                          <div className="relative w-full md:h-60 h-56 transition-all group-hover:scale-110 duration-300">
                            <Image
                              width={100}
                              height={100}
                              src={e?.productImages[0]?.url}
                              alt=""
                              className="object-cover w-full h-full inset-0"
                            />
                          </div>
                          <div className="absolute right-0 top-0 m-2 bg-slate-100 rounded-full py-0.5 px-2 text-sm font-bold dark:bg-slate-800/60">
                            {" "}
                            ${e?.price}{" "}
                          </div>
                        </div>
                      </Link>
                      <div className="py-2">
                        <h4 className="text-black lg:font-medium mb-0.5 dark:text-white">
                          {" "}
                          {e?.title}{" "}
                        </h4>
                        <p className="md:text-sm text-xs lg:font-medium text-gray-500 dark:text-white">
                          {" "}
                          by <a href="profile.html">
                            {" "}
                            {e?.owner?.username}{" "}
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data?.getProducts?.length === 0 && (
              <p className="w-full text-center">
                No products available in this category
              </p>
            )}
            {/* placeholders */}
            {(loading || NetworkStatus.fetchMore === networkStatus) && (
              <>
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
                <div className="w-full lg:h-60 h-full aspect-[3/3] bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
              </>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
};

export default ShopProductFilter;
