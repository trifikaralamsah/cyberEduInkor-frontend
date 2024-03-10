import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AuthType {
  token: string;
  email: string;
  memberNo: string;
  name: string;
  expired: string;
}
interface State {
  auth: AuthType;
}

const ProfilePage = () => {
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
       email
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserService();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full md:w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex gap-4 justify-around p-6 space-y-4 md:space-y-6 sm:p-8 border border-white">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white text-center"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Profile
            </a>
            <div className="space-y-4 md:space-y-6">
              <div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center font-bold"
                  placeholder="name@company.com"
                  value={data?.email}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center font-bold"
                  placeholder="name@company.com"
                  value={data?.name}
                  disabled
                />
              </div>

              <button
                className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 font-semibold"
                onClick={() => navigate("/payment")}
              >
                Payment
              </button>
              <button
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
  );
};

export default ProfilePage;
