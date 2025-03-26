import { useMutation } from "@apollo/client";
import moment from "moment";
import React from "react";
import { LIKE_DISLIKE } from "../../Graphql/Mutations";
import { GET_GROUP_BY_ID, NEWS_FEED_POSTS } from "../../Graphql/Queries";
import GroupComment from "./comment";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import AutoLinkText from 'react-autolink-text2';
// import { LinkPreview } from '@dhaiwat10/react-link-preview';

import LinkPreview from '@ashwamegh/react-link-preview'

// If you're using built in layout, you will need to import this css
import '@ashwamegh/react-link-preview/dist/index.css'
import { renderUrl } from "../../app/utils/assetsUrl";

const GroupPosts = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { post, user } = props;
  const [LikeDislike] = useMutation(LIKE_DISLIKE, {
    refetchQueries: [
      GET_GROUP_BY_ID,
      {
        variables: { groupId: Number(id) },
      },
    ],
  });
  const LikePost = (id) => {
    LikeDislike({ variables: { postId: id, userId: user.id } });
  };

  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const text = post?.title;
  const urls = text.match(urlRegex);
  console.log(urls);
  
  return (
    <div
      className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2"
      key={post.id}
    >
      {/* post heading */}
      <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
        <Link href={`/profile/${post?.User?.id}`}>
          {" "}
          <Image
            width={100}
            height={100}
            src={post?.User?.profile?.imageUrl ? renderUrl(post?.User?.profile?.imageUrl) : "/assets/images/placeholder.png"}
            alt=""
            className="w-9 h-9 rounded-full"
          />{" "}
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${post?.User?.id}`}>
            {" "}
            <h4 className="text-black dark:text-white">
              {" "}
              {post?.User?.username}{" "}
            </h4>{" "}
          </Link>
          <div className="text-xs text-gray-500 dark:text-white/80">
            {" "}
            {moment(Number(post?.createdAt)).isSame(new Date(), "month")
              ? moment(Number(post?.createdAt)).fromNow()
              : moment(Number(post?.createdAt)).format("lll")}
          </div>
        </div>
        <div className="-mr-1">
          <button type="button" className="button__ico w-8 h-8">
            {" "}
            <ion-icon className="text-xl" name="ellipsis-horizontal" />{" "}
          </button>
          <div
            className="w-[245px]"
            uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click"
          >
            <nav>
              <Link href="#">
                {" "}
                <ion-icon
                  className="text-xl shrink-0"
                  name="bookmark-outline"
                />{" "}
                Add to favorites{" "}
              </Link>
              <Link href="#">
                {" "}
                <ion-icon
                  className="text-xl shrink-0"
                  name="notifications-off-outline"
                />{" "}
                Mute Notification{" "}
              </Link>
              <Link href="#">
                {" "}
                <ion-icon
                  className="text-xl shrink-0"
                  name="flag-outline"
                />{" "}
                Report this post{" "}
              </Link>
              <Link href="#">
                {" "}
                <ion-icon
                  className="text-xl shrink-0"
                  name="share-outline"
                />{" "}
                Share your profile{" "}
              </Link>
              <hr />
              <Link
                href="#"
                className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
              >
                {" "}
                <ion-icon
                  className="text-xl shrink-0"
                  name="stop-circle-outline"
                />{" "}
                Unfollow{" "}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* slide images */}
      {/* <div className="sm:px-4 p-2.5 pt-0">
        <p className="font-normal"> {post?.title} </p>
      </div> */}

      <div className="sm:px-4 p-2.5 pt-0 break-words whitespace-pre-wrap">
        {/* <Linkify options={{ className: "font-normal",  }}> */}
        {/* {post?.title} */}
        <AutoLinkText
          text={post?.title}
          linkProps={{ target: "_blank", rel: "nofollow noopener noreferrer", className: "text-blue-500" }}

        />
        {/* </Linkify> */}
      </div>

      {urls && urls.length > 0 && post?.attachments.length == 0 && (
        <div className="sm:px-4 p-2.5 pt-0 break-words whitespace-pre-wrap">
          <LinkPreview url={urls[0]} />
        </div>

      )}

      {post?.attachments.length > 0 && (
        <div
          className="relative uk-visible-toggle sm:px-4"
          tabIndex={-1}
          uk-slideshow="animation: push;finite: true;min-height: 200; max-height: 250"
        >
          <ul className="uk-slideshow-items" uk-lightbox="">
            {post?.attachments?.map((attachment) => (
              <li className="w-full overflow-hidden sm:rounded-md">
                <Link href={renderUrl(attachment?.url)} data-caption={post?.title}>
                  {attachment?.type === "IMAGE" ? (
                    <Image
                      width={100}
                      height={100}
                      src={renderUrl(attachment?.url)}
                      className="w-full h-full object-cover inset-0"
                      alt=""
                    />
                  ) : (
                    <video
                      controls
                      src={renderUrl(attachment?.url)}
                      className="w-full h-full object-cover inset-0"
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
            <ion-icon name="chevron-back" className="text-xl text-white" />
          </button>
          <button
            type="button"
            className="absolute right-2 -translate-y-1/2 bg-black/40 backdrop-blur-3xl rounded-full top-1/2 grid w-7 h-7 place-items-center shadow"
            uk-slideshow-item="next"
          >
            {" "}
            <ion-icon name="chevron-forward" className="text-xl text-white" />
          </button>
        </div>
      )}

      {/* post icons */}
      <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => LikePost(post.id)}
            type="button"
            className={`button__ico ${post.isLiked
                ? "text-red-500 bg-red-100 dark:bg-red-600 dark:text-white"
                : "text-white-500 bg-slate-200/70 dark:bg-slate-700"
              }`}
          >
            {" "}
            <ion-icon className="text-lg" name="heart" />{" "}
          </button>
          <Link href="#">{post?.likeCount}</Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="button__ico bg-slate-200/70 dark:bg-slate-700"
          >
            {" "}
            <ion-icon className="text-lg" name="chatbubble-ellipses" />{" "}
          </button>
          <span>{post?.commentCount}</span>
        </div>
        <button type="button" className="button__ico ml-auto">
          {" "}
          <ion-icon className="text-xl" name="paper-plane-outline" />{" "}
        </button>
        <button type="button" className="button__ico">
          {" "}
          <ion-icon className="text-xl" name="share-outline" />{" "}
        </button>
      </div>
      {/* comments */}
      <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40 break-words  whitespace-pre-wrap  break-word">
        {post?.comments?.map((comment) => (
          <div className="flex items-start gap-3 relative">
            <Link href="#">
              {" "}
              <Image
                width={100}
                height={100}
                src={comment?.user?.profile?.imageUrl ? renderUrl(comment?.user?.profile?.imageUrl) : "/assets/images/placeholder.png"}
                alt=""
                className="w-6 h-6 mt-1 rounded-full"
              />{" "}
            </Link>
            <div className="flex-1">
              <Link
                href="#"
                className="text-black font-medium inline-block dark:text-white"
              >
                {" "}
                {comment?.username}{" "}
              </Link>
              <p className="mt-0.5"> {comment?.body} </p>
              {comment?.imageUrl && (
                <div
                  className="relative uk-visible-toggle sm:px-4"
                  tabIndex={-1}
                  uk-slideshow="animation: push;finite: true;min-height: 200; max-height: 250"
                >
                  <ul className="" uk-lightbox="">
                    <li className="w-full overflow-hidden sm:rounded-md">
                      <Link href={renderUrl(comment?.imageUrl)} data-caption={comment?.body}>
                        <Image
                          width={100}
                          height={100}
                          src={renderUrl(comment?.imageUrl)}
                          className="w-full h-full object-cover inset-0"
                          alt=""
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
      {/* add comment */}
      <GroupComment user={user} post={post} />
    </div>
  );
};

export default GroupPosts;
