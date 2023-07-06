import React from "react";
import { FaBell } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RequestWithdrawal = () => {
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    eBankBalance: Yup.number()
      .required("eBank Balance is required")
      .positive("eBank Balance must be a positive number"),
    address: Yup.string().required("Address is required"),
    withdrawalAmount: Yup.number()
      .required("Withdrawal Amount is required")
      .positive("Withdrawal Amount must be a positive number"),
  });

  // Define initial form values
  const initialValues = {
    eBankBalance: "",
    address: "",
    withdrawalAmount: "",
  };

  // Handle form submission
  const handleSubmit = (values, { resetForm }) => {
    // Perform form submission logic here
    console.log(values);
    resetForm();
  };

  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-6">
          <h1 className="font-bold flex items-center p-3 sm:mb-0 mb-4">
            <FaBell
              className="w-6 h-6 text-pink-500"
              style={{ marginRight: "8px" }}
            />
            Earning Withdrawal
          </h1>
          <button
            type="button"
            className="focus:outline-none text-white bg-pink-500 hover:bg-pink-600  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-pink-500 dark:hover:bg-pink-600 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            eBank
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl flex items-center">
        <div className=" m-6 w-full mx-12 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="bg-gray-200 p-4 mb-6 border rounded-md flex items-center">
                <div className="mr-4">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-gray-500 w-5 h-5"
                  />
                </div>
                <div className="text-gray-900">
                  {/* <p className="font-semibold">Warning:</p> */}
                  <p>
                    Minimum withdrawal value is 50. 5% service charge
                    applicable!
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="eBankBalance"
                  className="block font-medium text-gray-700"
                >
                  eBank Balance
                </label>
                <Field
                  type="number"
                  id="eBankBalance"
                  name="eBankBalance"
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="eBankBalance"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block font-medium text-gray-700"
                >
                  Select Address
                </label>
                <Field
                  as="select"
                  id="address"
                  name="address"
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Address</option>
                  <option value="address1">Address 1</option>
                  <option value="address2">Address 2</option>
                  <option value="address3">Address 3</option>
                </Field>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="withdrawalAmount"
                  className="block font-medium text-gray-700"
                >
                  Enter value to Withdraw
                </label>
                <Field
                  type="number"
                  id="withdrawalAmount"
                  name="withdrawalAmount"
                  className="mt-1 block p-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="withdrawalAmount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RequestWithdrawal;
