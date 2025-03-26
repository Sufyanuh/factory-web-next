import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ADD_STREAM_COMMENTS } from "../../Graphql/Mutations";
import { GET_STREAM_COMMENT } from "../../Graphql/Queries";
import { useCountdown, useCurrentuser } from "../../app/hook";
import secureStorage from "react-secure-storage";
import Head from "next/head";
import SideBar from "../../app/sideBar";

async function getStreamed(id) {
  const token = secureStorage.getItem("token");
  console.log("data fetching... scheduleevents")
  const res = await fetch("https://factolabs.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
      query GetScheduleStreamById($streamId: Int!) {
        getScheduleStreamById(streamId: $streamId) {
          isStarted
          id
          title
          media
          mediaType
          date
          time
          user {
            username
            profile {
              imageUrl
            }
          }
        }
      }`,
      variables: {
        streamId: Number(id),
      },
    }),
  });
  console.log("data fetched scheduleevents")

  return res.json();
}

const DetailedEvents = (props) => {
  const { data: user } = useCurrentuser();
  const { stream: data } = props;
  console.log(data, "<====Data");
  const router = useRouter();
  const [product, setProduct] = useState(false);
  const [comment, setComment] = useState(null);
  const { id: streamId } = router.query;

  const { data: showCommentsData } = useQuery(GET_STREAM_COMMENT, {
    variables: { streamId: Number(streamId) },
  });

  const date = moment(Number(data?.getScheduleStreamById?.date)).format(
    "DD-MM-YYYY"
  );
  const time = moment(Number(data?.getScheduleStreamById?.time)).format(
    "HH:mm"
  );
  const target = moment(`${date} ${time}`, "DD-MM-YYYY HH:mm").toDate();
  const [days, hours, minutes, seconds] = useCountdown(target);

  const [addStreamComment, { loading: commentLoading }] =
    useMutation(ADD_STREAM_COMMENTS);

  const addComment = () => {
    addStreamComment({
      variables: {
        streamId: Number(id),
        comment: comment,
        userId: Number(user?.currentUser?.user?.id),
      },
    });
    setComment("");
  };

  return (
    <>
      <Head>
        <title>{data?.getScheduleStreamById?.title?.substring(0, 60)}</title>
        <meta
          name="description"
          content={data?.getScheduleStreamById?.title?.substring(0, 170)}
        />
        <meta
          property="og:title"
          content={data?.getScheduleStreamById?.title}
        />
        <meta
          property="og:description"
          content={data?.getScheduleStreamById?.title}
        />
        {data?.getScheduleStreamById?.media !== null ? (
          data?.getScheduleStreamById?.mediaType === "IMAGE" ? (
            <meta
              property="og:image"
              content={data?.getScheduleStreamById?.media}
            />
          ) : (
            data?.getScheduleStreamById?.mediaType ===
            "Video" && (
              <meta
                property="og:video"
                content={data?.getScheduleStreamById?.media}
              />
            )
          )
        ) : null}
        <meta
          property="og:url"
          content={`https://factory-web-nextjs.vercel.app/scheduleevents/${data?.getScheduleStreamById?.id}`}
        />
        <link
          rel="canonical"
          href={`https://factory-web-nextjs.vercel.app/scheduleevents/${data?.getScheduleStreamById?.id}`}
        />
        <meta property="og:type" content="website" />
      </Head>{" "}
      <article>
        <SideBar user={user?.currentUser} />
        <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
          <div className="main__inner pt-6">
            <div className="bg-secondary border rounded p-4">
              <div className="lg:rounded-xl shadow-xl bg-secondary relative">
                {data?.getScheduleStreamById?.mediaType === "IMAGE" ? (
                  <Image
                    className="max-w-full max-w-full "
                    src={
                      data?.getScheduleStreamById?.media === null
                        ? "/assets/images/placeholder.png"
                        : data?.getScheduleStreamById?.media
                    }
                    alt=""
                    width={500}
                    height={500}
                  />
                ) : (
                  <video
                    className=""
                    src={
                      data?.getScheduleStreamById?.media === null
                        ? "/assets/images/placeholder.png"
                        : data?.getScheduleStreamById?.media
                    }
                    alt=""
                    autoPlay
                    muted
                    controls
                  />
                )}
                {data?.getScheduleStreamById?.isStarted ? (
                  <div className="absolute top-1 z-10 text-start bg-full p-3">
                    <p className="text-white p-2 rounded-full text-sm bg-red-600 rounded-5">
                      Live
                    </p>
                  </div>
                ) : (
                  <div className="absolute top-5 z-10  w-full text-center bg-full ">
                    <p
                      className="text-white p-3"
                      style={{ background: "#0000004f" }}
                    >
                      {" "}
                      Show starts in {days > 0 && days + "d"}{" "}
                      {hours > 0 && hours + "h"} {minutes > 0 && minutes + "m"}{" "}
                      {seconds > 0 && seconds + "s"}
                    </p>
                  </div>
                )}
                <h1 onClick={() => setProduct(!product)}>View Products</h1>
                {!product ? (
                  <>
                    {/* Live Comment */}
                    {showCommentsData?.getStreamComments.length > 0 &&
                      showCommentsData?.getStreamComments.map((e) => (
                        <div
                          key={`getStreamComments-${e.id}`}
                          className="flex items-start gap-3 p-4 relative"
                        >
                          <Link href="#">
                            {" "}
                            <Image
                              src={e?.user?.profile?.imageUrl || "/assets/images/placeholder.png"}
                              alt=""
                              className="w-6 h-6 mt-1 rounded-full"
                              width={100}
                              height={100}
                            />{" "}
                          </Link>
                          <div className="flex-1">
                            <Link
                              href="#"
                              className="text-black font-medium inline-block dark:text-white"
                            >
                              {e?.user?.username}{" "}
                            </Link>
                            <p className="mt-0.5"> {e?.comment} </p>
                          </div>
                        </div>
                      ))}
                    <div className="relative bottom-0 w-full">
                      <div className="rounded-xl p-4 space-y-4 text-sm font-medium  dark:bg-dark2">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3">
                            <div className=" text-center dark:text-white">
                              {" "}
                              <input
                                type="text"
                                className="w-full"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder=" Comment"
                              />{" "}
                            </div>
                          </div>
                          <button
                            className={`p-2 bg-secondary hover:bg-opacity-80 transition-all rounded-lg pt-5 `}
                            onClick={addComment}
                            disabled={commentLoading}
                          >
                            <ion-icon
                              name="send-outline"
                              className=" md hydrated "
                            ></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Live Comment End */}
                  </>
                ) : (
                  <>
                    {/* Product */}.
                    <div className="max-w-2xl mx-auto gap-3 p-4 relative">
                      <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                          <Image
                            className="rounded-t-lg p-8 h-50"
                            src="/assets/images/placeholder.png"
                            alt="product "
                            width={100}
                            height={100}
                          />
                        </a>
                        <div className="px-5 pb-5">
                          <a href="#">
                            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                              Apple Watch Series 7 GPS, Aluminium Case,
                              Starlight Sport
                            </h3>
                          </a>
                          <div className="flex items-center mt-2.5 mb-5">
                            <svg
                              className="w-5 h-5 text-yellow-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg
                              className="w-5 h-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg
                              className="w-5 h-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg
                              className="w-5 h-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg
                              className="w-5 h-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                              5.0
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                              $599
                            </span>
                            <a
                              href="#"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Product End */}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </article>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const token = secureStorage.getItem("token");
  const stream = await getStreamed(params?.id);
  return { props: { stream: stream.data } };
}

export default DetailedEvents;
