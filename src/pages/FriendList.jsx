import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const FriendList = () => {
  const currentUserSlice = useSelector((state) => state.prity.peraDitase);

  // Custom hook for storing friends data
  const [frindData, upfrindData] = useState([]);

  // Firebase database reference
  const db = getDatabase();

  // Fetch friend data from Firebase
  useEffect(() => {
    const starCountRef = ref(db, "FrindList/");
    onValue(starCountRef, (snapshot) => {
      let bag = [];
      snapshot.forEach((sokolerData) => {
        if (sokolerData.val().currentUserID === currentUserSlice.uid) {
          bag.push({
            key: sokolerData.key,
            userId: sokolerData.val().ReseverId,
            userName: sokolerData.val().ReseverName,
            userPhoto: sokolerData.val().ReseverPhoto,
          });
        } else if (sokolerData.val().ReseverId === currentUserSlice.uid) {
          bag.push({
            key: sokolerData.key,
            userId: sokolerData.val().currentUserID,
            userName: sokolerData.val().currentUserName,
            userPhoto: sokolerData.val().currentUserPhoto,
          });
        }
      });
      upfrindData(bag);
    });
  }, [currentUserSlice.uid, db]);

  // Unfriend button function
  const unfriendButton = (unfriendData) => {
    remove(ref(db, "FrindList/" + unfriendData.key));

    toast.error("You are no longer friends", {
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

  // Block button function
  const blockButton = (event) => {
    set(ref(db, "BLOCKlist/" + event.key), {
      currentUserID: currentUserSlice.uid,
      currentUserName: currentUserSlice.displayName,
      currentUserPhoto: currentUserSlice.photoURL,
      BlockUserID: event.userId,
      BlockUserName: event.userName,
      BlockUserPhoto: event.userPhoto,
    });
    remove(ref(db, "FrindList/" + event.key));

    toast.error("The user has been blocked", {
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
      <div className=" h-full md:min-h-screen w-[300px] md:w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          Friend List
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {frindData.map((SobData) => (
            <div
              key={SobData.key}
              className="UserPage flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={SobData?.userPhoto}
                  alt="profile"
                  className="md:w-14 w-[30px] h-[30px] md:h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="md:ml-5 ml-2 text-wrap text-gray-800 font-semiboldtext-[12px] md:text-lg">
                  {SobData?.userName}
                </span>
              </div>
              <div className="flex gap-1 md:gap-3 buttoUser">
                <button
                  onClick={() => blockButton(SobData)}
                  className="bg-gradient-to-r from-[#f00] to-[#ff00aa] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#ff00aa] hover:to-[#f00] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  BLOCK
                </button>
                <button
                  onClick={() => unfriendButton(SobData)}
                  className="bg-gradient-to-r from-[#5cffce] to-[#00ff88] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#00ddff] hover:to-[#6aff00] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Unfriend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;
