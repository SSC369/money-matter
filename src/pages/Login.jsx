import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { IoMdMail } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  API_GET_USER_ID,
  DASHBOARD_ROUTE,
  LOCALSTORAGE_KEY,
  LOGIN_HEADERS,
} from "../contants";

const Login = ({ admin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
      navigate(DASHBOARD_ROUTE);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, email } = formData;
    const trimEmail = email.trim();
    const trimPassword = password.trim();
    if (trimEmail === "") {
      //Add toast utils and use the showSuccessToast and showFailureToast
      toast.error("Please enter email !", { duration: 1000 });
      return false;
    } else if (trimPassword === "") {
      toast.error("Please enter password!", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      if (handleValidation()) {
        const url = API_GET_USER_ID;

        const response = await axios.post(
          url,
          {
            password,
            email,
          },
          {
            headers: LOGIN_HEADERS,
          }
        );

        const { data } = response;

        //Move the success handling to a function
        if (response.status === 200) {
          setFormData({
            password: "",
            email: "",
          });
          localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify({
              admin: admin,
              userId: data.get_user_id[0].id,
            })
          );

          toast.success("Login successful", { duration: 1000 });

          setTimeout(() => {
            navigate(DASHBOARD_ROUTE);
          }, 1000);
        } else {
          toast.error("Responded with status code" + response.status);
        }
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordIcon = () => {
    if (showPassword) {
      return (
        <AiOutlineEyeInvisible
          onClick={() => setShowPassword(!showPassword)}
          className="mr-2 cursor-pointer"
          size={20}
        />
      );
    } else {
      //can return the component directly without the else statement
      return (
        <AiOutlineEye
          onClick={() => setShowPassword(!showPassword)}
          className="mr-2 cursor-pointer"
          size={20}
        />
      );
    }
  };

  //Devide them into the render functions
  return (
    <div className="flex flex-col items-center justify-center bg-white min-w-[300px] min-h-dvh">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl flex flex-col gap-3 bg-white p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm"
      >
        <h1
          style={{ color: "rgba(248, 154, 35, 1)" }}
          className="font-bold text-xl text-center"
        >
          Money{" "}
          <span className="" style={{ color: "rgba(2, 150, 156, 1)" }}>
            Matters
          </span>
        </h1>
        <h1
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className=" font-medium text-xl mb-3 text-center"
        >
          {admin && "Admin "}Login
        </h1>
        <label
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className=" font-medium"
        >
          Email
        </label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <IoMdMail className="mr-2" size={20} />
          <input
            required
            onChange={handleChange}
            name="email"
            value={formData.email}
            type="email"
            className="ml-2 border-none h-full focus:outline-none w-[80%]"
            placeholder="Enter your Email"
          />
        </div>

        <label
          style={{ color: "rgba(80, 88, 135, 1)" }}
          className=" font-medium"
        >
          Password
        </label>

        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input
            required
            onChange={handleChange}
            name="password"
            value={formData.password}
            type={showPassword ? "text" : "password"}
            className="ml-2 border-none w-full h-full focus:outline-none"
            placeholder="Enter your Password"
          />
          {renderPasswordIcon()}
        </div>
{/* //Button can be moved into the common component */}
        <button
          type="submit"
          className="flex justify-center items-center mt-5 mb-2 bg-blue-500 text-white font-medium text-sm rounded-lg h-12 w-full "
        >
          {loading ? (
            <TailSpin
              visible={true}
              height="30"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
