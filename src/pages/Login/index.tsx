/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import momentTz from "moment-timezone";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import LoadingPage from "../Loading";

Modal.setAppElement("#root");

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["user"]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    // console.log(e.target.email.value);
    const query = `query {
      authService(
        email: "${e.target.email.value}"
      ) {
        code
        message
        email
        token
        expired
      }
    }`;

    try {
      const res = await axios.post(
        "https://cyber-edu-inkor-backend.vercel.app/graphql",
        {
          query,
        }
      );
      // console.log(res.data.data.authService);
      if (res.data.data.authService.code === 200) {
        dispatch({
          type: "auth/login",
          payload: {
            email: res.data.data.authService.email,
            token: res.data.data.authService.token,
            expired: res.data.data.authService.expired,
          },
        });

        const expiredCookie = momentTz()
          .tz("Asia/Jakarta")
          .add(res.data.data.authService.expired, "seconds")
          .format("YYYY-MM-DD HH:mm");

        setCookie("user", res.data.data.authService, {
          path: "/",
          secure: true,
          expires: new Date(expiredCookie),
        });
        console.log(cookies.user);
        setLoading(false);

        navigate("/");
      } else {
        setLoading(false);
        setIsOpen(true);
        setMessage(res.data.data.authService.message);
        e.target.reset();
      }
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      setMessage(error);
      e.target.reset();
      console.log(error);
    }
  };

  // const fetchGraphql = async () => {
  //   const query = `query {
  //     authService(
  //       email: "brachio@email.com"
  //     ) {
  //       email
  //       token
  //       expired
  //     }
  //   }`;

  //   await axios
  //     .post("http://localhost:5000/graphql", {
  //       query,
  //     })
  //     .then((r) => console.log("data returned:", r.data.data.authService));
  // };
  useEffect(() => {
    dispatch({
      type: "auth/logout",
    });
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Example Modal"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
          >
            <div className="sm:w-full sm:h-full md:w-96 md:h-40 flex flex-col gap-4 items-center justify-center bg-oppacity-50">
              <p className="text-slate-900 font-semibold font-sans text-xl text-center mb-3">
                {message}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
          <section className="bg-gray-300 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <img
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
                Createdby Fikar
              </a>
              <div className="w-full md:w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={(e) => handleLogin(e)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@email.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Belum Punya Akun ?{" "}
                      <a
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                      >
                        Daftar
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginPage;
