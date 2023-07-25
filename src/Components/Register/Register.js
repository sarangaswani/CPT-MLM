import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  referralCode: Yup.string().required("Refferal Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});

export default function Register({ url }) {
  const navigate = useNavigate();
  // Extract referral code from the query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("ref") || ""; // Default to empty string if not provided

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: referralCode, // Prefill referral code
    phoneNumber: "",
  };

  const handleSubmit = async (values, { setFieldError }) => {
    console.log(values);
    try {
      // values.referralCode = String(values.referralCode);
      const response = await fetch(`http://localhost:5000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setFieldError("referralCode", data.error);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Catch is called ", error);
      // Handle the error as needed
    }
  };
  return (
    <div className="py-9 pt-24 bg-gradient-to-br from-customPurple via-MiddlePurple to-customPurple dark:bg-gradient-to-br ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create an account
          </h2>
        </div>
        <div className="w-full bg-transparent rounded-lg  md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-transparent dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setFieldError }) =>
                handleSubmit(values, { setFieldError })
              }
              validationSchema={validationSchema}
            >
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-white border-0 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Full Name"
                    required
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border-0 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ring-1 ring-inset ring-gray-300"
                    placeholder="name@company.com"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border-0 ring-1 ring-inset ring-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Confirm password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-white border-0 ring-1 ring-inset ring-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="referralCode"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Refferal Code
                  </label>
                  <Field
                    type="number"
                    name="referralCode"
                    id="referralCode"
                    className="bg-white border-0 ring-1 ring-inset ring-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    disabled={!!referralCode}
                  />
                  <ErrorMessage
                    name="referralCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone-number"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phone-number"
                    className="bg-white border-0 ring-1 ring-inset ring-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="w-4 h-4 border-0 ring-1 ring-inset ring-gray-300 rounded bg-black focus:ring-3 focus:ring-primary-300  dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-white"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900  rounded-md group-hover:bg-opacity-0">
                    Create an account
                  </span>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-white">
                  Already have an account?{" "}
                  <Link
                    to="/GetStarted"
                    className="font-medium text-primary-600 hover:underline dark:text-gray-500"
                  >
                    Login here
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
