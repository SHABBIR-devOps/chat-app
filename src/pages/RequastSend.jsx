import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Bounce, toast } from 'react-toastify';

const RequastSend = () => {
  // Get data of current user from redux
  const sliseCurrentuser = useSelector((state) => state.prity.peraDitase);

  // Store data state
  const [requstdata, uprequstdata] = useState([]);

  // Firebase database
  const db = getDatabase();

  // Real-time data from firebase
  useEffect(() => {
    const starCountRef = ref(db, 'friendRequastList/');
    onValue(starCountRef, (snapshot) => {
      let kamerBAG = [];
      snapshot.forEach((namThikama) => {
        if (namThikama.val().ReseverId !== sliseCurrentuser.uid) {
          kamerBAG.push({ ...namThikama.val(), key: namThikama.key });
        }
      });

      uprequstdata(kamerBAG);
    });
  }, [db, sliseCurrentuser.uid]);

  // Remove button functionality
  const handelRemove = (onlyThatUserData) => {
    // Remove the request from the friend request list
    remove(ref(db, 'friendRequastList/' + onlyThatUserData.key));

    // Remove the request from the sent requests
    remove(ref(db, `friendRequestsSent/${sliseCurrentuser.uid}/${onlyThatUserData.ReseverId}`));

    toast.error('Your Friend Request Canceled', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="md:min-h-screen h-full w-[300px] md:w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          Requast That You Send
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {requstdata.map((sobData) => (
            <div
              key={sobData.key}
              className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={sobData?.ReseverPhoto}
                  alt="profile"
                  className="md:w-14 w-[30px] h-[30px] md:h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="ml-5 text-gray-800 font-semibold text-[12px] md:text-lg">
                  {sobData?.ReseverName}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handelRemove(sobData)}
                  className="bg-gradient-to-r from-[#f00] to-[#ff00aa] active:scale-95 text-white md:px-5 px-2 md:py-2 py-0 md:text-[18px] text-[12px] rounded-full shadow-lg hover:from-[#ff00aa] hover:to-[#f00] transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequastSend;
