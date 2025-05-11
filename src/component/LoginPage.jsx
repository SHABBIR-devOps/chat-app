import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimetion from "../../public/animetion/LoginAnimation.json";
import "./Home.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import app from "../firebase.config";
import { CurrentUserLoginData } from "../Slices/Redux";
import { getDatabase, ref, set } from "firebase/database";
import { BeatLoader } from "react-spinners";

const LoginPage = () => {
  // useState for email input
  const [email, upemail] = useState("");
  const [emailEror, upemailEror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // data form redux
  // data form redux

  // auth form firebase
  const auth = getAuth();
  const db = getDatabase();

  const [password, uppassword] = useState("");
  const [passwordEror, uppasswordEror] = useState("");

  // for icons
  const [one, two] = useState(false);

  const nextIcon = () => {
    two(!one);
  };

  // Function for form

  const funForEmail = (e) => {
    upemail(e.target.value);
    upemailEror("");
  };

  const funForpassword = (e) => {
    uppassword(e.target.value);
    uppasswordEror("");
  };

  const SubForForm = (e) => {
    e.preventDefault();

    if (!email) {
      upemailEror("please enter your email");
    } else if (!password) {
      uppasswordEror("please enter your password");
    } else {
      upemailEror("");
      uppasswordEror("");

      // Button icons
      setLoader(true);

      // User sign in firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...

          if (user.emailVerified == false) {
            toast.error("Your email is not verified", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            toast.success("Login successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });

            // navigate to the prodile page
            navigate("/");
            // navigate to the prodile page

            // set data in rudex
            dispatch(CurrentUserLoginData(user));
            // set data in rudex

            // set data in localstorege
            localStorage.setItem("userLoginData", JSON.stringify(user));
            // set data in localstorege

            // set data in real-time-database
            set(ref(db, "users/" + user.uid), {
              username: user.displayName,
              email: user.email,
              profile_picture: user.photoURL,
              uid: user.uid,
            });
            // set data in real-time-database
          }
        })

        .catch((error) => {
          // Icons in the button
          setLoader(false);

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode == "auth/invalid-credential") {
            toast.error("Password is incorrect", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        });
    }
  };

  return (
    <>
      <div className="flex main">
        <div className="w-[500px] LoginAnimetion hidden lg:block gap-40 h-full">
          <Lottie animationData={LoginAnimetion} />
        </div>
        <div className="warper lg:mr-[390px] font-poppins rounded-[12px]">
          <form onSubmit={SubForForm}>
            <h1 className=" text-[30px] md:text-[35px] text-center font-poppins font-semibold">
              Login
            </h1>
            <div className="inputBox">
              <input
                type="email"
                onChange={funForEmail}
                placeholder="Your email please"
              />
              <FaUser className="icons" />
            </div>
            <div className="mb-8">
              <p className="pl-5 text-[#8bcfff] text-[12px]"> {emailEror} </p>
            </div>

            <div className="inputBox">
              <input
                type={one ? "text" : "password"}
                onChange={funForpassword}
                placeholder="Your password please"
              />
              {one ? (
                <FaUnlock className="icons" onClick={nextIcon} />
              ) : (
                <FaLock className="icons" onClick={nextIcon} />
              )}
            </div>
            <div className="mb-8">
              <p className="pl-5 text-[#8bcfff] text-[12px]">
                {" "}
                {passwordEror}{" "}
              </p>
            </div>
            <div className="rememberForgot">
              <label className="text-[12px] md:text-[15px] ">
                {" "}
                <input  type="checkbox" />
                Remember me{" "}
              </label>
              <Link className="text-[12px] md:text-[15px] " to="/forgetPassword"> forgot password ? </Link>
            </div>

            {/* Submit Button */}
            {loader ? (
              <div className="flex smalldevice justify-center items-center w-[70%] md:w-full h-[35px] md:h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[14px] md:text-[17px] text-[#333] font-semibold rounded-[40px] bg-white">
                <BeatLoader />
              </div>
            ) : (
              <button
                type="submit"
                className=" smalldevice w-[70%] md:w-full h-[35px] md:h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[14px] md:text-[17px] text-[#333] font-semibold rounded-[40px] bg-white"
              >
                Login
              </button>
            )}

            <div className="w-full flex mt-10 items-center gap-3 justify-center">
              <div className="w-40 h-[2px] bg-white"></div>
              <div className="">
                <p>Or</p>
              </div>
              <div className="w-40 h-[2px] bg-white"></div>
            </div>
            <div className="w-full gap-10 justify-center mt-5 mb-12 flex">
              <div className="w-7 h-7">
                <Link to="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fhl%3Den%26utm_source%3DOGB%26utm_medium%3Dact&ec=GAlAwAE&hl=en&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1108304790%3A1721147554738150&ddm=0">
                  <img src="photos/search.png" alt="link" />
                </Link>
              </div>
              <div className="w-7 h-7">
                <Link to="https://web.facebook.com">
                  <img src="photos/facebook.png" alt="link" />
                </Link>
              </div>
              <div className="w-7 h-7">
                <Link to="https://x.com">
                  <img src="photos/twitter.png" alt="link" />
                </Link>
              </div>
              <div className="w-7 h-7">
                <Link to="https://www.icloud.com/">
                  <img src="photos/apple-logo.png" alt="link" />
                </Link>
              </div>
            </div>
            <div className="registerLink text-[15px] text-center mt-5">
              <p>
                Don't have an account ?{" "}
                <Link className="" to="/registion">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
