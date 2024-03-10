/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface AuthType {
  token: string;
  email: string;
  expired: string;
  memberNo: string;
  name: string;
}
interface State {
  auth: AuthType;
}

const HomePage = () => {
  const [_, __, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const auth = useSelector((state: State) => state.auth);
  const [data, setData] = useState({
    email: "",
    name: "",
  });

  const fetchUserService = async () => {
    const query = `query {
      userService(
        email: "${auth.email}",
        tokenId: "${auth.token}"
      ) {
       name,
       email,
       memberNo
      }
    }`;

    try {
      const res = await axios.post(
        "https://cyber-edu-inkor-backend.vercel.app/graphql",
        {
          query,
        }
      );
      setData(res.data.data.userService);
      localStorage.setItem(
        "memberNo",
        JSON.stringify(res.data.data.userService.memberNo)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("memberNo");
    removeCookie("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserService();
  }, []);

  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full md:w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center justify-center">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
                loading="lazy"
              />
              Hi, Welcome {data?.name}
            </a>

            <label
              htmlFor="email"
              className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center font-bold"
              value={data?.email}
              disabled
            />

            <button
              type="submit"
              className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800 font-semibold"
              onClick={() => navigate("/payment")}
            >
              Payment
            </button>
            <button
              type="submit"
              className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 font-semibold"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
