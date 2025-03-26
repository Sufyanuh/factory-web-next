import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { CREATE_POST } from "../../Graphql/Mutations";
import { NEWS_FEED_POSTS } from "../../Graphql/Queries";
import { multiUploadToS3 } from "../../app/utils/S3singleFileUpload";
import Image from "next/image";

const AddPost = (props) => {
  const [variables, setVariables] = useState({
    title: "",
    tagged: undefined,
    TagEveryone: false,
    attachments: [],
    groupId: undefined,
  });
  const { user } = props;
  const [fileUrls, setFileUrls] = useState([]);
  const [allFiles, setAllfiles] = useState([]);
  const ref = useRef();
  const UploadImageFeed = () => {
    ref.current.click();
  };
  const handleFileChange = (e) => {
    const { files, value, name } = e.target;
    if (name === "title") setVariables({ ...variables, [name]: value });
    else {
      const urls = [];
      setAllfiles([...files]);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const blobUrl = event.target.result;
          urls.push(blobUrl);

          if (urls.length === files.length) {
            setFileUrls(urls);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [NEWS_FEED_POSTS],
  });
  const CreatePost = async (id) => {
    try {
      const createVariables = { ...variables };
      if (allFiles.length > 0) {
        const { uri } = await multiUploadToS3(allFiles);
        createVariables.attachments = uri;
      }
      await createPost({
        variables: {
          ...createVariables,
          body:
            createVariables.attachments.length > 0
              ? createVariables.attachments[0].url
              : null,
          authorId: user?.id,
        },
      });
      setVariables({
        title: "",
        tagged: undefined,
        TagEveryone: false,
        attachments: [],
        groupId: undefined,
      });
      setFileUrls([]);
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 text-sm font-medium border1 dark:bg-dark2">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3">
          <div className=" text-center dark:text-white">
            {" "}
            <input
              type="text"
              className="w-full"
              name="title"
              value={variables.title}
              onChange={handleFileChange}
              placeholder=" What do you have in mind"
            />{" "}
          </div>
        </div>
        <div
          className="p-2 bg-sky-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer"
          onClick={UploadImageFeed}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 fill-sky-600"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-5 mt-7">
        {fileUrls?.length > 0 && (
          <div
            className="relative uk-visible-toggle sm:px-4"
            tabIndex={-1}
            uk-slideshow="animation: push;finite: true;min-height: 200; max-height: 250"
          >
            <ul className="uk-slideshow-items" uk-lightbox="">
              {fileUrls?.map((url, index) => (
                <li key={index} className="w-full overflow-hidden sm:rounded-md">
                  <Link href={url} data-caption={"sda"}>
                    <Image
                      width={'100'}
                      height={'100'}
                      key={index}
                      src={url}
                      alt={`File ${index}`}
                      accept="image/png, image/jpeg"
                      className="w-full h-full  object-cover"
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

        <input
          type="file"
          className="hidden"
          ref={ref}
          multiple
          onChange={handleFileChange}
        />

        <button
          onClick={CreatePost}
          type="button"
          disabled={loading}
          className="button bg-blue-500 text-white px-8"
        >
          {loading ? "Uploading" : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default AddPost;
