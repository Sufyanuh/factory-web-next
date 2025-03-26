import { useMutation } from "@apollo/client";
import React from "react";
import { LOGOUT_DEVICE } from "../Graphql/Mutations";
import Link from "next/link";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

const Logout = () => {
  const navigate = useRouter();
  const [logout, { loading }] = useMutation(LOGOUT_DEVICE);
  let user = secureLocalStorage.getItem("userDetails");
  let device = secureLocalStorage.getItem("userDevices");
  console.log(device, user, "secure Token");
  const Logout = () => {
    logout({
      variables: { userId: user.id, deviceId: device.id },
    })
      .then((result) => {
        const responseData = result.data.logout;
        if (responseData.success) {
          localStorage.clear();
          navigate("/");
        } else {
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {loading && <div className="loader" />}
      <li>
        {" "}
        <Link
          href="#"
          onClick={Logout}
          className="flex gap-3 rounded-md p-2 hover:bg-secondery"
        >
          {" "}
          <ion-icon name="log-out-outline" className="text-lg" /> Log Out
        </Link>
      </li>
    </>
  );
};

export default Logout;
