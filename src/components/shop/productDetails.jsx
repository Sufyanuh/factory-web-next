import { useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { GET_PRODUCT_BY_ID } from "../../Graphql/Queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const ProductDetails = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: Number(id) },
  });
  // console.log(data, "<===Product Details");
  return (
    <>
      {loading && <div className="loader" />}
      <div className=" tt relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-screen">
        {/* image previewer */}
        <div className="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">
          <div className="relative z-10 w-full h-full">
            {data?.getProductById?.productImages.length > 0 && (
              <div
                className="relative uk-visible-toggle"
                tabIndex={-1}
                uk-slideshow="animation: push;finite: true;height: auto"
              >
                <ul
                  className="uk-slideshow-items"
                  style={{ minHeight: "auto" }}
                  uk-lightbox="min-height:auto"
                >
                  {data?.getProductById?.productImages?.map((image) => (
                    <li
                      className="w-full overflow-hidden sm:rounded-md"
                      style={{ position: "initial" }}
                      key={`image-${image.id}`}
                    >
                      <Link href={image.url} data-caption={image.__typename}>
                        <Image
                          src={image.url}
                          className="w-full h-screen"
                          alt=""
                          height={100}
                          width={100}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="absolute left-2 -translate-y-1/2 bg-black/40 backdrop-blur-3xl rounded-full top-1/2 grid w-7 h-7 place-items-center shadow"
                  uk-slideshow-item="previous"
                >
                  {" "}
                  <ion-icon
                    name="chevron-back"
                    className="text-xl text-white"
                  />
                </button>
                <button
                  type="button"
                  className="absolute right-2 -translate-y-1/2 bg-black/40 backdrop-blur-3xl rounded-full top-1/2 grid w-7 h-7 place-items-center shadow"
                  uk-slideshow-item="next"
                >
                  {" "}
                  <ion-icon
                    name="chevron-forward"
                    className="text-xl text-white"
                  />
                </button>
              </div>
            )}
          </div>
          {/* close button */}
          <Link
            href={"#"}
            onClick={() => router.back()}
            type="button"
            className="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        {/* right sidebar */}
        <div className="lg:w-[400px] w-full bg-white h-screen relative overflow-y-auto shadow-xl dark:bg-dark2">
          <div className="p-6">
            <div>
              <div className="text-lg font-semibold text-black dark:text-white">
                {" "}
                {data?.getProductById?.title}
              </div>
              <p className="font-normal text-sm leading-6 mt-3">
                {" "}
                {data?.getProductById?.description}{" "}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-5 gap-3 text-xs font-medium mt-5">
              <div className="col-span-2 p-3 bg-slate-100 rounded-md space-y-1.5 border">
                <div> Price</div>
                <div className="text-3xl font-semibold text-black">
                  {" "}
                  $ {data?.getProductById?.price}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm mt-7">
              <div className="flex items-center gap-3">
                {" "}
                <ion-icon className="text-xl" name="pricetag-outline" />{" "}
                <div className="flex-1">
                  {data?.getProductById?.category?.name}
                </div>{" "}
              </div>
              <div className="flex items-center gap-3">
                {" "}
                <ion-icon
                  className="text-xl"
                  name="navigate-circle-outline"
                />{" "}
                <div className="flex-1">
                  {" "}
                  {moment(Number(data?.getProductById?.createdAt)).isSame(
                    new Date(),
                    "month"
                  )
                    ? moment(Number(data?.getProductById?.createdAt)).fromNow()
                    : moment(Number(data?.getProductById?.createdAt)).format(
                        "lll"
                      )}
                </div>{" "}
              </div>

              <div className="flex items-center gap-3">
                {" "}
                <ion-icon className="text-xl" name="bicycle-outline" />{" "}
                <div className="flex-1">
                  {data?.getProductById?.deliveryOption}{" "}
                </div>{" "}
              </div>
              <div className="flex items-center gap-3">
                {" "}
                <ion-icon
                  className="text-xl"
                  name="shield-checkmark-outline"
                />{" "}
                <div className="flex-1">
                  {" "}
                  {data?.getProductById?.condition}{" "}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="w-full p-4 absolute bottom-0">
            <div className="font-medium mb-6 space-y-3">
              <div className="text-sm"> Seller </div>
              <Link href="#" className="flex items-center gap-3 mb-4 mt-1">
                <div className="relative w-8 h-8 shrink-0">
                  {" "}
                  <Image
                    src={data?.getProductById?.owner?.profile?.imageUrl}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-black dark:text-white">
                    {data?.getProductById?.owner?.username}
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                >
                  {" "}
                  Chat{" "}
                </button>
              </Link>
            </div>
            <div className="flex gap-2 items-center text-sm ">
              {data?.getProductById?.isSold ? (
                <Link
                  href="#"
                  className="bg-green-100 rounded-md py-2 text-center flex-1 flex items-center justify-center gap-2 text-teal-500 font-semibold"
                >
                  {" "}
                  <ion-icon
                    className="text-2xl"
                    name="checkmark-circle-outline"
                  />{" "}
                  Sold
                </Link>
              ) : (
                <Link
                  onClick={() => alert(true)}
                  href="#"
                  className="bg-teal-100 rounded-md py-2 text-center flex-1 flex items-center justify-center gap-2 text-teal-500 font-semibold"
                >
                  {" "}
                  <ion-icon className="text-2xl" name="cart-outline" /> Buy
                </Link>
              )}
              <Link
                href="#"
                className="bg-red-100 rounded-md py-2 text-center px-3 flex"
              >
                {" "}
                <ion-icon className="text-2xl text-red-500" name="heart" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
