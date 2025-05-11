import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const FriendRequast = () => {
  // Get current user data from Redux
  const sliseCurrentuser = useSelector((state) => state.prity.peraDitase);

  // Store request data
  const [requstdata, uprequstdata] = useState([]);

  // Firebase database reference
  const db = getDatabase();

  // Fetch incoming friend requests
  useEffect(() => {
    const starCountRef = ref(db, "friendRequastList/");
    onValue(starCountRef, (snapshot) => {
      let kamerBAG = [];
      snapshot.forEach((namThikama) => {
        if (namThikama.val().ReseverId === sliseCurrentuser.uid) {
          kamerBAG.push({ ...namThikama.val(), key: namThikama.key });
        }
      });
      uprequstdata(kamerBAG);
    });
  }, [db, sliseCurrentuser.uid]);

  // Function to delete a request
  const deletebutton = (deletedata) => {
    // Remove the request from the friend request list
    remove(ref(db, "friendRequastList/" + deletedata.key));

    // Remove the request from the sent requests
    remove(ref(db, `friendRequestsSent/${deletedata.senderId}/${sliseCurrentuser.uid}`));

    toast.error("Friend Request Deleted", {
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
  };

  // Function to confirm a request
  const handelConfirmButton = (confirmData) => {
    // Add confirmed friendship to the "FrindList"
    set(ref(db, "FrindList/" + confirmData.key), {
      currentUserID: sliseCurrentuser.uid,
      currentUserName: sliseCurrentuser.displayName,
      currentUserPhoto: sliseCurrentuser.photoURL,
      ReseverId: confirmData.senderId,
      ReseverName: confirmData.senderName,
      ReseverPhoto: confirmData.senderPhoto,
    });

    // Remove request from "friendRequastList" and "friendRequestsSent"
    remove(ref(db, "friendRequastList/" + confirmData.key));
    remove(ref(db, `friendRequestsSent/${confirmData.senderId}/${sliseCurrentuser.uid}`));

    toast.success("You are now friends", {
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
  };

  return (
    <>
      <Navbar />
      <div className="md:min-h-screen h-full w-[300px] md:w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          Friend Requests
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {requstdata.map((SOBdata) => (
            <div
              key={SOBdata.key}
              className="UserPage flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={SOBdata?.senderPhoto}
                  alt="profile"
                  className="md:w-14 w-[30px] h-[30px] md:h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="ml-5 text-gray-800 font-semibold text-[12px] md:text-lg">
                  {SOBdata?.senderName}
                </span>
              </div>
              <div className="flex buttoUser gap-1 md:gap-3">
                <button
                  onClick={() => handelConfirmButton(SOBdata)}
                  className="bg-gradient-to-r from-[#49e751] to-[#0f8] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#0f8] hover:to-[#49e751] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Confirm
                </button>
                <button
                  onClick={() => deletebutton(SOBdata)}
                  className="bg-gradient-to-r from-[#f00] to-[#ff00aa] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#ff00aa] hover:to-[#f00] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendRequast;
