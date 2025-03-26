import { useMutation } from "@apollo/client";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import secureStorage from "react-secure-storage";
import { CREATE_COMMENT, LIKE_DISLIKE } from "../../Graphql/Mutations";
import { GET_USERS_POST_BY_ID } from "../../Graphql/Queries";
import { useCurrentuser } from "../../app/hook";
import { uploadFileToS3 } from "../../app/utils/S3singleFileUpload";
import AutoLinkText from 'react-autolink-text2';
// import { LinkPreview } from '@dhaiwat10/react-link-preview';

import LinkPreview from '@ashwamegh/react-link-preview'

// If you're using built in layout, you will need to import this css
import '@ashwamegh/react-link-preview/dist/index.css'
import HLSPlayer from "../../components/HLSPlayer";
// import {} from ""

async function getInfo(id) {
    const res = await fetch("https://factolabs.app/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
            query GetPostById($postId: Int!) {
  getPostById(postId: $postId) {
    id
    createdAt
    isLiked
    likeCount
    body
    title
    commentCount
    User {
      username
      profile {
        imageUrl
      }
    }
    attachments {
      id
      type
      url
    }
    comments {
      body
      id
      username
      imageUrl
      user {
        profile {
          imageUrl
        }
      }
    }
    LiveStream {
      scheduled {
        media
        mediaType
      }
    }
  }
}
`,
            variables: {
                postId: Number(id),
            },
        }),
    });
    return res.json();
}

const PostView = (props) => {
    console.log("props", props)
    const { data: currentUser } = useCurrentuser();
    const params = useParams();
    const navigation = useRouter();
    const id = params?.id;

    const [LikeDislike] = useMutation(LIKE_DISLIKE, {
        refetchQueries: [
            GET_USERS_POST_BY_ID,
            {
                variables: { postId: Number(id) },
            },
        ],
    });
    const LikePost = (id) => {
        LikeDislike({
            variables: { postId: id, userId: currentUser?.currentUser?.id },
        });
    };
    const ref = useRef();
    const [variables, setVariables] = useState({
        commentId: undefined,
        body: "",
        imageUrl: undefined,
    });
    const handleChange = (e) => {
        const { name, files } = e.target;

        if (name === "imageUrl" && files.length > 0) {
            const blobUrl = URL.createObjectURL(files[0]);
            // uploadFileToS3(files[0])
            setVariables({ ...variables, [name]: files[0] });
            setCommentImgurl(blobUrl); // Set the Blob URL here
        } else {
            // Handle other input changes if needed
            setVariables({ ...variables, [name]: e.target.value });
        }
    };
    const [commentImgurl, setCommentImgurl] = useState(null);
    const CommentImageUplaod = () => {
        ref.current.click();
    };

    const [CreateComment, { loading: commentLoading }] = useMutation(
        CREATE_COMMENT,
        {
            refetchQueries: [
                GET_USERS_POST_BY_ID,
                {
                    variables: { postId: Number(id) },
                },
            ],
        }
    );
    const CommentPost = async (id) => {
        try {
            const commentVariables = { ...variables };
            if (variables.imageUrl) {
                const { uri } = await uploadFileToS3(variables.imageUrl);
                commentVariables.imageUrl = uri;
            }
            await CreateComment({
                variables: {
                    ...commentVariables,
                    postId: id,
                    userId: currentUser?.currentUser?.id,
                    username: currentUser?.currentUser?.username,
                },
            });
            setVariables({
                commentId: undefined,
                body: "",
                imageUrl: undefined,
            });
            setCommentImgurl(null);
        } catch (error) {
            console.log(error, "error");
        }
    };

    // if (loading) return <div className="loader" />;
    // if (error) return <p>Error: {error.message}</p>;
    const data = props?.post;

    const getPostById = data?.getPostById || {};

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const text = getPostById?.title;
    const urls = text.match(urlRegex);
    console.log(urls);

    // console.log(getPostById, "<<<<<=getPostById")

    return (
        <>
            <Head>
                <title>{getPostById?.title?.substring(0, 60)}</title>
                <meta
                    name="description"
                    content={getPostById?.title?.substring(0, 170)}
                />
                <meta property="og:title" content={getPostById?.title} />
                <meta property="og:description" content={getPostById?.title} />
                {getPostById?.attachments?.length > 0 ?
                    getPostById?.attachments?.[0]?.type === "Video" ?
                        getPostById?.attachments?.[0]?.url.endsWith(".m3u8") ? <>
                            {getPostById?.LiveStream?.scheduled?.mediaType === "Video" ?
                                <>
                                    <meta property="og:video" content={getPostById?.LiveStream?.scheduled?.media} />
                                    <meta property="og:image" content={`${getPostById?.LiveStream?.scheduled?.media}?tx=f_jpg`} />
                                </>
                                :
                                <meta property="og:image" content={getPostById?.LiveStream?.scheduled?.media} />
                            }
                        </>
                            :
                            <>
                                <meta property="og:video" content={getPostById?.attachments?.[0]?.url} />
                                <meta property="og:image" content={`${getPostById?.attachments?.[0]?.url}?tx=f_jpg`} />
                            </>
                        : <meta property="og:image" content={getPostById?.attachments?.[0]?.url} />
                    : null}
                <meta
                    property="og:url"
                    content={`https://factory-web-nextjs.vercel.app/post/${getPostById?.id}`}
                />
                <link
                    rel="canonical"
                    href={`https://factory-web-nextjs.vercel.app/post/${getPostById?.id}`}
                />
                <meta property="og:type" content="website" />
            </Head >

            <article>
                <div className=" tt relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-screen">
                    {" "}
                    {/* image previewer */}
                    <div className="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">
                        <div className="relative z-10 w-full h-full">
                            {getPostById?.attachments?.length > 0 && (
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
                                        {data?.getPostById?.attachments?.map((image) => (
                                            <li
                                                key={`immage-${image.id}`}
                                                className="w-full overflow-hidden sm:rounded-md"
                                                style={{ position: "initial" }}
                                            >
                                                <Link
                                                    href={image.url}
                                                    className="flex justify-center"
                                                    data-caption={data?.getPostById?.title}
                                                >
                                                    {image?.type === "IMAGE" ? (
                                                        <Image
                                                            src={image.url}
                                                            className=" h-screen bg-white"
                                                            alt="no img found"
                                                            height={500}
                                                            width={500}
                                                        />
                                                    ) : (
                                                        // <video
                                                        //     controls
                                                        //     src={image.url}
                                                        //     className=" h-screen bg-white"
                                                        //     alt="no img found"
                                                        // />
                                                        image?.url?.endsWith(".m3u8") ?
                                                            <HLSPlayer src={image?.url} />
                                                            :
                                                            <video
                                                                controls
                                                                src={image?.url}
                                                                className="h-screen bg-white"
                                                                alt=""
                                                            />
                                                    )}
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
                        <button
                            onClick={navigation.back}
                            // href={-1}
                            // type="button"
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
                        </button>
                    </div>
                    {/* right sidebar */}
                    <div className="lg:w-[400px] w-full bg-white h-screen relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">
                        <div className="p-5 pb-0">
                            {/* story heading */}
                            <div className="flex gap-3 text-sm font-medium">
                                <Image
                                    src={
                                        data?.getPostById?.User?.profile?.imageUrl ??
                                        "/assets/images/placeholder.png"
                                    }
                                    alt=""
                                    className="w-9 h-9 rounded-full"
                                    width={36}
                                    height={36}
                                />

                                <div className="flex-1">
                                    <h4 className="text-black font-medium dark:text-white">
                                        {" "}
                                        {data?.getPostById?.User?.username}{" "}
                                    </h4>
                                    <div className="text-gray-500 text-xs dark:text-white/80">
                                        {" "}
                                        {moment(Number(data?.getPostById?.createdAt)).isSame(
                                            new Date(),
                                            "month"
                                        )
                                            ? moment(Number(data?.getPostById?.createdAt)).fromNow()
                                            : moment(Number(data?.getPostById?.createdAt)).format(
                                                "lll"
                                            )}
                                    </div>
                                </div>
                            </div>
                            <p className="font-normal text-sm leading-6 mt-4">
                                {" "}
                                {data?.getPostById?.title}
                            </p>
                            <div className="shadow relative -mx-5 px-5 py-3 mt-3">
                                <div className="flex items-center gap-4 text-xs font-semibold">
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            onClick={() => LikePost(data?.getPostById?.id)}
                                            type="button"
                                            className={`button__ico ${data?.getPostById?.isLiked
                                                ? "text-red-500 bg-red-100 dark:bg-red-600 dark:text-white"
                                                : "text-white-500 bg-slate-200/70 dark:bg-slate-700"
                                                }`}
                                        >
                                            {" "}
                                            <ion-icon className="text-lg" name="heart" />{" "}
                                        </button>
                                        <Link href="#">{data?.getPostById?.likeCount}</Link>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            className="button__ico bg-slate-100 dark:bg-slate-700"
                                        >
                                            {" "}
                                            <ion-icon
                                                className="text-lg"
                                                name="chatbubble-ellipses"
                                            />{" "}
                                        </button>
                                        <span>{data?.getPostById?.commentCount}</span>
                                    </div>
                                    <button type="button" className="button__ico ml-auto">
                                        {" "}
                                        <ion-icon className="text-xl" name="share-outline" />{" "}
                                    </button>
                                    <button type="button" className="button__ico">
                                        {" "}
                                        <ion-icon
                                            className="text-xl"
                                            name="bookmark-outline"
                                        />{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 h-full overflow-y-auto flex-1">
                            {/* comment list */}
                            <div className="relative text-sm font-medium space-y-5">
                                {data?.getPostById?.comments?.length > 0 &&
                                    data?.getPostById?.comments?.map((e) => (
                                        <div
                                            key={`comments-${e.id}`}
                                            className="flex items-start gap-3 relative"
                                        >
                                            <Image
                                                src={
                                                    e?.user?.profile?.imageUrl ??
                                                    "/assets/images/placeholder.png"
                                                }
                                                alt=""
                                                className="w-6 h-6 mt-1 rounded-full"
                                                height={24}
                                                width={24}
                                            />
                                            <div className="flex-1">
                                                <Link
                                                    href="#"
                                                    className="text-black font-medium inline-block dark:text-white"
                                                >
                                                    {" "}
                                                    {e?.username}{" "}
                                                </Link>
                                                <p className="mt-0.5">{e?.body} </p>
                                                {e?.imageUrl && (
                                                    <div
                                                        className="relative uk-visible-toggle sm:px-4"
                                                        tabIndex={-1}
                                                        uk-slideshow="animation: push;finite: true;min-height: 200; max-height: 250"
                                                    >
                                                        <ul className="" uk-lightbox="">
                                                            <li className="w-full overflow-hidden sm:rounded-md">
                                                                <Link href={e?.imageUrl} data-caption={e?.body}>
                                                                    <Image
                                                                        src={e?.imageUrl}
                                                                        className="w-full h-full object-cover inset-0"
                                                                        alt=""
                                                                        height={250}
                                                                        width={250}
                                                                    />
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="bg-white p-3 text-sm font-medium flex items-center gap-2">
                            <Image
                                src={
                                    data?.getPostById?.profile?.imageUrl ??
                                    "/assets/images/placeholder.png"
                                }
                                alt=""
                                className="w-6 h-6 rounded-full"
                                height={24}
                                width={24}
                            />
                            <div className="flex-1 relative overflow-hidden h-10">
                                <textarea
                                    placeholder="Add Comment...."
                                    rows={1}
                                    onChange={handleChange}
                                    value={variables.body}
                                    name="body"
                                    className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                                />
                                <div
                                    className="!top-2 pr-2"
                                    uk-drop="pos: bottom-right; mode: click"
                                >
                                    <div
                                        className="flex items-center gap-2"
                                        uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6 fill-sky-600"
                                            onClick={CommentImageUplaod}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <input
                                            type="file"
                                            name="imageUrl"
                                            className="hidden"
                                            onChange={handleChange}
                                            accept="image/*"
                                            ref={ref}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={() => CommentPost(data?.getPostById?.id)}
                                disabled={commentLoading}
                                className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
                            >
                                {" "}
                                {commentLoading ? "Sending..." : "Send"}
                            </button>
                        </div>
                        {commentImgurl && (
                            <Image
                                src={commentImgurl}
                                className="w-full h-4 object-cover inset-0"
                                alt=""
                                height={250}
                                width={250}
                            />
                        )}
                    </div>
                </div>
            </article>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const token = secureStorage.getItem("token");
    console.log("token", token, post.data );
    const post = await getInfo(params?.id);
    return { props: { post: post.data } };
}

export default PostView;
