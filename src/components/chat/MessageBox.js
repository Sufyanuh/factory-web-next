import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
// import { useParams } from "react-router-dom";
import { SEND_MESSAGE } from "../../Graphql/Mutations";
import { uploadFileToS3 } from "../../app/utils/S3singleFileUpload";
import { useParams } from "next/navigation";

const MessageBox = (props) => {
  const Imageref = useRef();
  const ImageShow = () => Imageref.current.click();
  const [blobUrl, setBlobUrl] = useState(null);
  const { user } = props;
  console.log(user, "<<user");
  const params = useParams();
  const chatDetails = params?.chatDetails;
  const isActive = chatDetails?.split("&");
  const [variables, setVariables] = useState({
    senderId: 0,
    receiverId: 0,
    message: "",
    attachmentUrl: undefined,
    attachmentType: undefined,
    chatId: 0,
  });
  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "attachmentUrl" && files.length > 0) {
      const blobUrl = URL.createObjectURL(files[0]);

      setVariables({ ...variables, [name]: files[0] });
      setBlobUrl(blobUrl);
    } else setVariables({ ...variables, [name]: value });
  };

  const [CreateMessage, { loading }] = useMutation(SEND_MESSAGE);
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const messageVariables = { ...variables };
      if (variables.attachmentUrl) {
        const { uri, type } = await uploadFileToS3(variables.attachmentUrl);
        messageVariables.attachmentUrl = uri;
        messageVariables.attachmentType = type;
      }
      await CreateMessage({
        variables: {
          ...messageVariables,
          senderId: user?.id,
          receiverId: Number(isActive?.[0]),
          chatId: isActive?.[1] === "null" ? undefined : Number(isActive?.[1]),
        },
      });
      setVariables({
        senderId: 0,
        receiverId: 0,
        message: "",
        attachmentUrl: undefined,
        attachmentType: undefined,
        chatId: 0,
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(variables);
  return (
    <>
      <div className="flex items-center md:gap-4 gap-2 md:p-3 p-2 overflow-hidden">
        <input
          type="file"
          accept="image/*"
          ref={Imageref}
          onChange={handleChange}
          className="hidden"
          name="attachmentUrl"
        />
        <div className="flex-1 relative overflow-hidden h-10 border rounded">
          <input
            placeholder="Write Your Message"
            onChange={handleChange}
            value={variables.message}
            name="message"
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
                onClick={ImageShow}
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="file"
                name="attachmentUrl"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
                ref={Imageref}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={sendMessage}
          disabled={loading}
          className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
        >
          {" "}
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </>
  );
};

export default MessageBox;
