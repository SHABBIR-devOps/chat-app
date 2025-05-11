import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigat = useNavigate()

  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please provide your email");
    } else {
      // Proceed with form submission (e.g., send email to the server)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          



          toast.success('Email already been sent to reset password', {
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
            navigat('/')

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode)

        });
      
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Clear the error message when the user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
    // if user give us the email
    else {
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Reset Your Password</h1>
            <form className="mt-[100px] space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {errorMessage && (
                  <div className="w-full mt-2 text-red-500">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </div>

              <div className="w-full h-10"></div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get verification email
                </button>
              </div>
              <div className="w-full h-full flex justify-center">
                <Link to="/login">⬅️ Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
