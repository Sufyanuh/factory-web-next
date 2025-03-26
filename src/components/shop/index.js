import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
// import  Link  from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import { CATEGORIZED_PRODUCTS } from "../../Graphql/Queries";
import Shoptabs from "./shopcategories";
import Image from "next/image";
// import { useParams } from "next/navigation";

const Shopindex = () => {
  // const { category } = useParams();
  const [isMoreData, setIsMoreData] = useState(true);
  const { data, loading, fetchMore, networkStatus } = useQuery(
    CATEGORIZED_PRODUCTS,
    { notifyOnNetworkStatusChange: true }
  );
  const handleFetchMore = useCallback(() => {
    if (NetworkStatus.ready === networkStatus && isMoreData) {
      fetchMore({
        variables: {
          offset: data?.categorizedProducts?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            !fetchMoreResult ||
            fetchMoreResult.categorizedProducts.length === 0
          ) {
            setIsMoreData(false);
            return prev;
          }
          setIsMoreData(true);
          return {
            ...prev,
            categorizedProducts: [
              ...prev.categorizedProducts,
              ...fetchMoreResult.categorizedProducts,
            ],
          };
        },
      });
    }
  }, [data?.categorizedProducts?.length, fetchMore, isMoreData, networkStatus]);

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
  console.log(data);
  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div className="main__inner">
        <div uk-sticky="cls-active: bg-dark z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top">
          <div className="page__heading">
            <h1> Market </h1>
          </div>
          {/* heading title */}

          <Shoptabs link={"shop"} />
          {/* tab style two .  default this tab is hidden just remove to see style tab 2 */}
          <div className="relative flex items-center justify-between mt-6 border-b hidden">
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="uk-switcher" id="market_tab">
          {/* product list */}
          <div>
            {/* category list */}
            {/* product list  */}

            {/* single item */}
            {data?.categorizedProducts.length > 0 &&
              data?.categorizedProducts?.map((e) => (
                <div key={`categorizedProducts-${e.id}`}>
                  <div className="page__heading">
                    <h1>{e?.name}</h1>
                  </div>
                  <div
                    className="grid xs:grid-cols-3 md:grid-cols-5 gap-3 mt-2"
                    uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100"
                  >
                    {e?.products?.length > 0 &&
                      e?.products?.map((e) => (
                        <div key={`product-${e.id}`}>
                          <Link
                            href={`/product/${e.id}`}
                            className="group"
                          >
                            <div className="relative overflow-hidden rounded-lg">
                              <div className="relative w-full md:h-60 h-56 transition-all group-hover:scale-110 duration-300">
                                <Image
                                  src={e?.productImages[0]?.url}
                                  alt=""
                                  className="object-cover w-full h-full inset-0"
                                  width={100}
                                  height={100}
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
                              by{" "}
                              <Link href={`/profile/${e?.owner?.id}`}>
                                {" "}
                                {e?.owner?.username}{" "}
                              </Link>{" "}
                            </p>
                          </div>
                          {/* <ProductDetails id={productID} /> */}
                        </div>
                      ))}
                    {e?.products?.length > 3 && (
                      <Link
                        href={`/shop/${e.id}/${e?.name.replace(/\//g, " ")}`}
                        className="flex justify-center"
                      >
                        <button type="button" className="font-semibold text-sm">
                          See All...
                        </button>
                      </Link>
                    )}
                  </div>
                  {e?.products?.length === 0 && (
                    <p className="w-full text-center">
                      No products available in this category
                    </p>
                  )}
                </div>
              ))}

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
    </main>
  );
};

export default Shopindex;
