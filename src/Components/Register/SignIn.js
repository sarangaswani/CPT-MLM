import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Session from "react-session-api"; // Import Session
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

export default function Example() {
  const token = Cookies.get("authToken");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setFieldError("email", data.error);
        }
      } else {
        const token = data.token; // Assuming the token is sent as "token" in the response
        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        Cookies.set("user", JSON.stringify(data.user), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        Session.set("user", data.user);
        Session.set("loggedIn", true);
        console.log("user data", data.user);

        const valuese = {
          email: "wasee62313@gmail.com",
        };

        // fetch("http://localhost:5000/direct-referrals", {  // call this in direct referrals page
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(valuese),
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((error) => console.error(error));

        // Redirect to Dashboard
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log("Catch is called ", error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/Dashboard");
    }
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-customPurple via-MiddlePurple to-customPurple dark:bg-gradient-to-br">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setFieldError }) =>
          handleSubmit(values, { setFieldError })
        }
        validationSchema={validationSchema}
      >
        <Form className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full mt-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span class="w-full px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900  rounded-md group-hover:bg-opacity-0">
                    SignIn
                  </span>
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to={`/GetStarted/Register`}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up now!
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
