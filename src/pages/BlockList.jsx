import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const BlockList = () => {




  
  const currentUser = useSelector((state) => state.prity.peraDitase);
  const [friendData, setFriendData] = useState([]);




  const db = getDatabase();






  useEffect(() => {


    const blockListRef = ref(db, "BLOCKlist/");
    onValue(blockListRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.BlockUserID === currentUser.uid) {
          data.push({
            key: childSnapshot.key,
            userID: userData.currentUserID,
            userNAME: userData.currentUserName,
            userPHOTO: userData.currentUserPhoto,
          });
        } else if (userData.currentUserID === currentUser.uid) {
          data.push({
            key: childSnapshot.key,
            userID: userData.BlockUserID,
            userNAME: userData.BlockUserName,
            userPHOTO: userData.BlockUserPhoto,
          });
        }
      });
      setFriendData(data);
    });
  }, [currentUser.uid, db]);





  const unBlockUser = (user) => {


    const { key, userID, userNAME, userPHOTO } = user;

    set(ref(db, `FrindList/${key}`), {
      currentUserID: currentUser.uid,
      currentUserName: currentUser.displayName,
      currentUserPhoto: currentUser.photoURL,
      ReseverId: userID,
      ReseverName: userNAME,
      ReseverPhoto: userPHOTO,
    })
    
    
    .then(() => {
      return remove(ref(db, `BLOCKlist/${key}`));
    }).then(() => {
      toast.success("You both are friends now!", {
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
    })
    
    
    
    
    .catch((error) => {
      console.error("Error unblocking user: ", error);
      toast.error("Error unblocking user. Please try again.", {
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
    });




  };

  return (
    <>
      <Navbar />
      <div className="md:min-h-screen h-full w-[300px] md:w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          Block List
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {friendData.map((user) => (
            <div key={user.key} className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg">
              <div className="flex items-center">
                <img
                  src={user.userPHOTO}
                  alt="Profile"
                  className="md:w-14 w-[30px] h-[30px] md:h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="ml-5 text-gray-800 font-semibold text-[12px] md:text-lg">
                  {user.userNAME}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => unBlockUser(user)}
                  className="bg-gradient-to-r from-[#5cffce] to-[#00ff88] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#00ddff] hover:to-[#6aff00] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockList;
