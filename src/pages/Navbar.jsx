import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbLogout2 } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import "./Navbar.css"; // Assuming custom CSS for some extra styles

const Navbar = () => {
  const currentUserData = useSelector((state) => state.prity.peraDitase);

  // State for notification and navbar toggle
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(true);

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };


  // for log out 
  const logout = ()=>{

    localStorage.removeItem('UserInformation')
    localStorage.removeItem('userLoginData')
    location.reload()
    
  }

  return (
    <>
      {/* Navbar Toggle Button for Mobile */}
      <div
        onClick={toggleNavbar}
        className="w-full z-50 absolute top-2 left-3 cursor-pointer"
      >
        <FaBarsStaggered className="text-white block md:hidden text-2xl" />
      </div>

      {/* Sidebar Navigation */}
      <div className={navbarOpen ? "mainnav" : "mainnav2"}>
        <div>
          <nav className="absolute z-40 overflow-hidden top-0 left-0 w-[340px] md:w-[180px] shadow-2xl flex flex-col items-start pl-2 justify-between h-full md:h-[100vh] Navbar">
            <ul className="flex flex-col gap-8 mt-10 md:gap-10 md:mt-10">
              {/* NavLink Items */}
              {[
                { to: "/addfriends", label: "Add Friends" },
                { to: "/friendslist", label: "Friend List" },
                { to: "/friendrequast", label: "Friend Request" },
                { to: "/requastSend", label: "Request Sent" },
                { to: "/blocklist", label: "Block List" },
                { to: "/chating", label: "Chats" },
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-blue-500 rounded-[2px] text-[#fff] hover:border-[1px] p-[1px] md:p-[8px] hover:bg-transparent transition-all active:scale-95 hover:scale-110"
                        : "p-[7px] md:p-[9px] rounded-[4px] hover:border-[1px] hover:bg-transparent transition-all active:scale-95 hover:scale-110"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Profile Section */}
            <div className="w-full overflow-hidden flex flex-col justify-end items-center h-full Profile">
              <div className="flex flex-col mb-5">
                <div className="w-full flex justify-center items-center">
                <Link
                  to="/"
                  className="w-[50px] h-[50px] md:w-[50px]  md:h-[50px]"
                >
                  <img className="w-[50px] h-[50px] rounded-full " src={currentUserData?.photoURL} alt="profile" />
                </Link>
                </div>
                <Link className="md:text-white text-wrap text-white" to="/">
                  {currentUserData?.displayName}
                </Link>
              </div>
              <button 
              onClick={logout} 
               className="text-[15px] md:text-[17px] text-center overflow-hidden hover:text-white mb-2 hover:bg-transparent hover:border-[1px] hover:scale-110 active:scale-95 transition-all p-2 md:p-3 bg-white rounded-md flex items-center gap-2">
                <TbLogout2 /> LogOut
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Notification Section */}
      <div className="notifition absolute top-4 z-50 right-4 md:top-10 md:right-10">
        <h4
          onClick={toggleNotification}
          className="text-2xl md:text-3xl notifitionIcon flex justify-end text-white"
        >
          <FaBell className="" />
        </h4>
        {notificationOpen && (
          <div className="w-[200px] md:w-[250px] pt-4 md:pt-5 h-[500px] md:h-[600px] notifitionPage">
            <div className="one w-full py-1 flex items-center mt-2 border-[1px] md:border-white border-black rounded-md">
              <div>
                <Link
                  className="flex flex-wrap pl-2 items-end text-black md:text-white"
                  to="/friendrequast"
                >
                  <h4>name</h4>
                  <p className="text-[12px] md:text-[13px] pl-1 flex text-wrap">
                    sent you friend request
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
