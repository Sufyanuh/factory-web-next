import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { CREATE_COMMENT } from "../../Graphql/Mutations";
import { GET_GROUP_BY_ID } from "../../Graphql/Queries";
import { uploadFileToS3 } from "../../app/utils/S3singleFileUpload";
import { useRouter } from "next/router";
import { renderUrl } from "../../app/utils/assetsUrl";
import Image from "next/image";

const GroupComment = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { user, post } = props;
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
        GET_GROUP_BY_ID,
        {
          variables: { groupId: Number(id) },
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
          userId: user?.id,
          username: user?.username,
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
  return (
    <>
      <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
        <Image
          src={user?.profile?.imageUrl ? renderUrl(user?.profile?.imageUrl) : "/assets/images/placeholder.png"}
          alt=""
          className="w-6 h-6 rounded-full"
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
          <div className="!top-2 pr-2" uk-drop="pos: bottom-right; mode: click">
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
          onClick={() => CommentPost(post.id)}
          disabled={commentLoading}
          className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
        >
          {" "}
          {commentLoading ? "Sending..." : "Send"}
        </button>
      </div>
      {commentImgurl && (
        <Image
          src={renderUrl(commentImgurl)}
          className="w-full h-full object-cover inset-0"
          alt=""
        />
      )}
    </>
  );
};

export default GroupComment;
