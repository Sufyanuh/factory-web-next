import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
import { useRouter, } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CHANGE_PASSWORD_WITH_OTP } from "../../../Graphql/auth";
import Image from "next/image";

const ChangePasswordOTP = ({ email }) => {
//   const { email } = useParams();
  const navigate = useRouter("");
  // UseMutation For Post in graphql
  const [ChangePasswordWithOtp, { loading }] = useMutation(
    CHANGE_PASSWORD_WITH_OTP
  );
  const validationSchema = Yup.object({
    otp: Yup.number().required("OTP is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      otp: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      ChangePasswordWithOtp({ variables: { ...values, email: email } })
        .then((result) => {
          const responseData = result.data.changePasswordWithOtp;
          console.log(responseData);
          if (responseData?.errors === null) {
            // Access the response data here
            toast.success("Password Changed Successfully");
            navigate.push("/auth/login");
          } else {
            toast.error(responseData?.errors?.[0]?.message.toLocaleUpperCase());
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
      {loading ? <div className="loader" /> : null}
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
          <div>
            {/* logo */}
            <div className="flex justify-center mb-12">
              <Image
                src="/assets/images/logo.png"
                alt=""
                className="w-auto h-16 shrink-0 w-full h-full px-3 rounded-2xl p-2.5"
                width={100}
                height={100}
              />
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <input
                className="!w-full"
                id="otp"
                name="otp"
                type="number"
                placeholder="OTP "
                onChange={formik.handleChange}
                value={formik.values.otp}
              />
              {formik.touched.otp && formik.errors.otp ? (
                <div className="text-red-600">{formik.errors.otp}</div>
              ) : null}
              <input
                className="!w-full"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
              <input
                className="!w-full"
                id="password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-600">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}

              <button
                type="submit"
                className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
              >
                <span>Change Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordOTP;
