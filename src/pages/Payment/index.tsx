import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    memberNo: "",
    amount: 0,
  });
  const fetchPaymentService = async () => {
    setLoading(true);
    const query = `query {
        paymentService(
          memberNo: ${localStorage.getItem("memberNo")}
        ) {
         memberNo,
         amount
        }
    }`;

    try {
      const res = await axios.post(
        "https://cyber-edu-inkor-backend.vercel.app/graphql",
        {
          query,
        }
      );
      console.log("payment", res.data.data.paymentService);
      if (res.data.data.paymentService) {
        setLoading(false);
        setData(res.data.data.paymentService);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaymentService();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <section className="bg-gray-300 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full md:w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                    <img
                      className="w-8 h-8 mr-2"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                      alt="logo"
                    />
                    Payment
                  </a>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="memberNo"
                      className="text-center block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Member No
                    </label>
                    <input
                      type="text"
                      name="memberNo"
                      id="memberNo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center font-bold"
                      value={data?.memberNo}
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-center block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center font-bold"
                      placeholder="name@company.com"
                      value={`IDR ${data?.amount},00`}
                      disabled
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default PaymentPage;
