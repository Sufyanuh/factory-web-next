import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import Link from 'next/link'
import { toast } from "react-toastify";
import * as Yup from "yup";
import secureStorage from "react-secure-storage"
import { useRouter } from "next/navigation";
import { LOGIN_USER } from "../../../Graphql/auth";
import Image from "next/image";

const Login = () => {
  //   const navigate = useNavigate("");
  const router = useRouter();
  // UseMutation For Post in graphql
  const [login, { loading }] = useMutation(LOGIN_USER);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login({ variables: { ...values, os: "web", token: "abcd" } })
        .then((result) => {
          const responseData = result.data.login;
          console.log(responseData, "<=====responseData");
          if (responseData.errors === null) {
            // Access the response data here
            // When the user logs in, store user data in localStorage
            secureStorage.setItem(
              "userDetails",
              responseData.user
            );
            secureStorage.setItem(
              "userDevices",
              responseData.device
            );
            secureStorage.setItem("token", responseData.token);
            toast.success("Login Successfully");
            router.push("/");
          } else {
            toast.error("Invaild Login");
          }
        })
        .catch((errors) => {
          toast.error(errors + "");
          console.error(errors);
        });
    },
  });
  return (
    <>
      {loading && <div className="loader" />}
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
          <div>
            {/* logo */}
            <div className="flex justify-center mb-12">
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="w-auto h-16 shrink-0 w-full h-full px-3 rounded-2xl p-2.5"
                height={64}
                width={64}
              />
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <input
                className="!w-full"
                id="email"
                name="email"
                type="email"
                autofocus
                placeholder="Email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
              <input
                className="!w-full"
                id="password"
                name="password"
                type="password"
                autofocus
                placeholder="Password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
              <Link href="/auth/forgotPassword" className="">
                <div className="text-sm text-right text-gray-400 py-4">
                  Forget password
                </div>
              </Link>
              <button
                type="submit"
                className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
              >
                <span>Sign in</span>
              </button>

              <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70">
                <span> No account? </span>
                <span>—</span>
                <Link
                  href="/auth/signup"
                  className="text-gray-600 hover:text-gray-500"
                >
                  Join now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
