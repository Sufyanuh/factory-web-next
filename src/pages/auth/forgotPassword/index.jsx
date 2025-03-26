import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FORGOT_PASSWORD } from "../../../Graphql/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ForgotPass = () => {
    //   const navigate = useNavigate("");
    const router = useRouter();
    // UseMutation For Post in graphql
    const [ForgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            ForgotPassword({ variables: values })
                .then((result) => {
                    const responseData = result?.data?.forgotPassword;
                    if (responseData) {
                        // Access the response data here
                        toast.success("Email has been Sent!!");
                        router.push(`/auth/changePasswordWithOtp/${formik.values.email}`);
                        formik.handleReset();
                    } else {
                        toast.error("Invaild Email Address");
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
                                height={100}
                                width={100}
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
                            <button
                                type="submit"
                                className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
                            >
                                <span>Forget Password</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPass;
