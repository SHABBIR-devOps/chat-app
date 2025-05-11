import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const AddFriends = () => {
  // data from redux
  const mainuser = useSelector((state) => state.prity.peraDitase);

  //firebase variables
  const db = getDatabase();

  // custom state
  const [jonogon, upjonogon] = useState([]);

  // Arrays to store sent requests and confirmed friends
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [confirmedFriends, setConfirmedFriends] = useState([]);

  // Fetch all users and sent friend requests from Firebase
  useEffect(() => {
    // Fetch all users
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let bag = [];
      snapshot.forEach((notItem) => {
        if (notItem.val().uid !== mainuser.uid) {
          bag.push({ ...notItem.val(), key: notItem.key });
        }
      });
      upjonogon(bag);
    });

    // Fetch sent friend requests to update button states
    const requestRef = ref(db, `friendRequestsSent/${mainuser?.uid}`);
    onValue(requestRef, (snapshot) => {
      const requests = snapshot.val() || {};
      setFriendRequestsSent(Object.keys(requests));
    });

    // Fetch confirmed friends
    const friendsRef = ref(db, `FrindList/`);
    onValue(friendsRef, (snapshot) => {
      let friends = [];
      snapshot.forEach((friendItem) => {
        const friendData = friendItem.val();
        if (
          (friendData.currentUserID === mainuser?.uid || friendData.ReseverId === mainuser?.uid)
        ) {
          friends.push(
            friendData.currentUserID === mainuser?.uid
              ? friendData.ReseverId
              : friendData.currentUserID
          );
        }
      });
      setConfirmedFriends(friends);
    });
  }, [db, mainuser?.uid]);

  // Function to add friend
  const addFrind = (thatFriend) => {
    set(push(ref(db, "friendRequastList/")), {
      senderId: mainuser?.uid,
      senderName: mainuser?.displayName,
      senderPhoto: mainuser?.photoURL,
      ReseverId: thatFriend.uid,
      ReseverName: thatFriend.username,
      ReseverPhoto: thatFriend.profile_picture,
    });

    // Update friendRequestsSent array and Firebase
    set(ref(db, `friendRequestsSent/${mainuser?.uid}/${thatFriend?.uid}`), true);

    // Add the user to the array locally
    setFriendRequestsSent((prev) => [...prev, thatFriend?.uid]);

    toast.success("Friend Request Sent", {
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

  // Function to cancel a friend request
  const Cancelbutton = (uid) => {
    // Remove the friend ID from the array locally
    setFriendRequestsSent((prev) => prev.filter((id) => id !== uid));

    // Remove from Firebase (sent requests and request list)
    remove(ref(db, `friendRequestsSent/${mainuser?.uid}/${uid}`)); // Remove the request from sent requests
    remove(ref(db, `friendRequastList/${mainuser?.uid}_${uid}`)); // Remove from friend request list using unique key
  };

  return (
    <>
      <Navbar />
      <div className="md:min-h-screen w-[300px] md:w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          All User
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {jonogon.map((sobpolapain) => (
            <div
              key={sobpolapain?.key}
              className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={sobpolapain?.profile_picture}
                  alt={sobpolapain?.username}
                  className="md:w-14 w-[30px] h-[30px] md:h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="ml-5 text-gray-800 font-semibold text-[12px] md:text-lg">
                  {sobpolapain?.username}
                </span>
              </div>

              {/* Check if the users are already friends */}
              {confirmedFriends.includes(sobpolapain.uid) ? (
                <button className="bg-gray-400 cursor-not-allowed text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg">
                  Friends
                </button>
              ) : friendRequestsSent.includes(sobpolapain.uid) ? (
                <button
                  onClick={() => Cancelbutton(sobpolapain.uid)}
                  className="bg-gradient-to-r from-green-400 active:scale-95 to-blue-500 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => addFrind(sobpolapain)}
                  className="bg-gradient-to-r from-green-400 md:text-[18px] text-[12px] active:scale-95 to-blue-500 text-white md:px-5 px-2 md:py-2 py-[4px] rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddFriends;
