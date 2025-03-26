import React from "react";
// import { Link } from "react-router-dom";
import Image from "next/image";
import { renderUrl } from "../../app/utils/assetsUrl";

const Receiver = (props) => {
  const { data } = props;

  return (
    <div key={`receiver-${data?.id}`}>
      {" "}
      <div className="flex gap-3">
        <Image
          src={
            data?.sender?.user?.profile?.imageUrl ? renderUrl(data?.sender?.user?.profile?.imageUrl) :
              "/assets/images/placeholder.png"
          }
          alt=""
          className="w-9 h-9 rounded-full shadow"
          height={50}
          width={50}
        />
        {data?.isAttachment ? (
          <>
            <div className="block rounded-[18px] border overflow-hidden">
              <div className="max-w-md">
                <div className="max-w-full relative w-72">
                  <div
                    className="relative"
                    style={{ paddingBottom: "57.4286%" }}
                  >
                    <div className="w-full h-full absolute inset-0">
                      {data?.attachmentType === "IMAGE" ? (
                        <Image
                          src={renderUrl(data?.attachmentUrl)}
                          alt=""
                          className="block max-w-full max-h-52 w-full h-full object-cover"
                          height={50}
                          width={50}
                        />
                      ) : data?.attachmentType === "Video" ? (
                        <video
                          src={renderUrl(data?.attachmentUrl)}
                          autoPlay={false}
                          controls={true}
                          alt=""
                          className="block max-w-full max-h-52 w-full h-full object-cover"
                        />
                      ) : data?.attachmentType === "DOCUMENT" ? (
                        <p className="text-white">Document</p>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="px-4 py-2 max-w-sm bg-secondery"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {" "}
                    {data?.message}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="px-4 py-2 rounded-[20px] max-w-sm bg-secondery"
              style={{ overflowWrap: "anywhere" }}
            >
              {" "}
              {data?.message}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Receiver;
