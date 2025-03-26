import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCurrentuser } from "../../app/hook";

const EditProfile = (props) => {
  const { data } = useCurrentuser();
  const user = data?.currentUser;
  return (
    <div className="hidden lg:p-12 " id="EditProfile" uk-modal="">
      <div className="uk-modal-dialog w-5/6  tt relative mx-auto bg-white shadow-xl rounded-lg max-lg:w-full dark:bg-dark2">
        {/* card header */}

        <div className="lg:w-screen p-3 w-full">
          <div className="w-full h-fill  relative ">
            <nav
              className="border-b dark:border-slate-700"
              uk-sticky="cls-active: dark:bg-transparent bg-slate-100/60 z-30 backdrop-blur-lg px-4 ;  animation: uk-animation-slide-top"
            >
              <div className="page__heading flex justify-between">
                <h1> {user?.username}</h1>
                <button class="uk-modal-close-default" type="button" uk-close>
                  X
                </button>
              </div>
            </nav>

            <div className="py-6 relative">
              <div className="flex  gap-4 max-md:flex-col">
                <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                  <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                    <Image
                      width={"100"}
                      height={"100"}
                      src={
                        user?.profile?.imageUrl ??
                        "/assets/images/placeholder.png"
                      }
                      alt=""
                      className="w-full h-full absolute object-cover"
                    />
                  </div>
                  {/* <button
                    type="button"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex block dark:!text-white/90"
                  >
                    {" "}
                    <ion-icon name="camera" className="text-2xl dark:!text-white/90" />
                  </button> */}
                </div>
                <div className="max-w-2x flex-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h3 htmlFor="">Name</h3>
                      <input
                        type="text"
                        defaultValue={user?.username}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <h3 htmlFor="">Email</h3>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <h3 htmlFor="">Address</h3>
                      <input type="text" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">City</h3>
                      <input type="text" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">Country</h3>
                      <input type="text" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">Date of Birth</h3>
                      <input type="date" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">Phone Number</h3>
                      <input type="number" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">State</h3>
                      <input type="text" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">Street</h3>
                      <input type="text" className="w-full" />
                    </div>
                    <div>
                      <h3 htmlFor="">Zip Code</h3>
                      <input type="text" className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
