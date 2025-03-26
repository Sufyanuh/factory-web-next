import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import Link from 'next/link'
import { toast } from "react-toastify";
import * as Yup from "yup";
// import { REGISTER_USER } from "../Graphql/Mutations";
import Image from  "next/image"

const Signup = () => {
    //   const navigate = useNavigate("");
    // UseMutation For Post in graphql
    //   const [Register, { loading }] = useMutation(REGISTER_USER);
    const validationSchema = Yup.object({
        username: Yup.string().required("First Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirmation is required"),
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            inviteCode: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //   Register({ variables: values })
            //     .then((result) => {
            //       const responseData = result.data.register;
            //       console.log(responseData);
            //       if (responseData?.errors === null) {
            //         // Access the response data here
            //         toast.success("Signup Successfully");
            //         navigate("/auth/login");
            //         localStorage.setItem("success", true);
            //       } else {
            //         toast.error(responseData?.errors?.[0]?.message.toLocaleUpperCase());
            //       }
            //     })
            //     .catch((errors) => {
            //       toast.error(errors + "");
            //       console.error(errors);
            //     });
        },
    });
    return (
        <>
            {/* {loading ? <div className="loader" /> : null} */}
            <div className="flex flex-col h-screen justify-center items-center">
                <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
                    <div>
                        {/* logo */}
                        <div className="flex justify-center mb-12">
                            <Image
                                src="/assets/images/logo.png"
                                alt=""
                                className="w-auto h-16 shrink-0 w-full h-full px-3 rounded-2xl p-2.5"
                            />
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-3">
                            <input
                                className="!w-full"
                                id="username"
                                name="username"
                                type="text"
                                autofocus=""
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                placeholder="Username"
                                required=""
                            />

                            <input
                                className="!w-full"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
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
                                name="password_confirmation"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password_confirmation}
                            />
                            {formik.touched.password_confirmation &&
                                formik.errors.password_confirmation ? (
                                <div className="text-red-600">
                                    {formik.errors.password_confirmation}
                                </div>
                            ) : null}
                            <input
                                className="!w-full"
                                id="inviteCode"
                                name="inviteCode"
                                type="text"
                                placeholder="Invitation Code (Optional)"
                                onChange={formik.handleChange}
                                value={formik.values.inviteCode}
                            />

                            <button
                                type="submit"
                                className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
                            >
                                <span>Get Started</span>
                            </button>
                            <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70">
                                <span> i have account? </span>
                                <span>—</span>
                                <Link
                                    href={"/auth/login"}
                                    //   href="form-login.html"
                                    className="text-gray-600 hover:text-gray-500"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
