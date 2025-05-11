import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDatabase, set } from "firebase/database";
import Navbar from "../pages/Navbar";
import { FaUserEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
// typeScript
import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { IoSaveOutline } from "react-icons/io5";
// firebase storage
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

const Profile = () => {
  // data frome redux
  const currentUserData = useSelector((state) => state.prity.peraDitase);

  // edit profile
  const [edit, upedit] = useState(false);
  const forEdit = () => {
    upedit(!edit);
  };

  // typeScript
  const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  // cropper funtion in typescript
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  // lets see the magic
  console.log(cropData);

  // typeScript

  // firebase storage start
  const storage = getStorage();
  const auth = getAuth();

  // after uplodeing the img save button
  const handleSave = () => {
    const storageRef = ref(storage, "userPhoto" + currentUserData.uid + ".png");
    uploadString(storageRef, cropData, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        onAuthStateChanged(auth, (user) => {
          updateProfile(auth.currentUser, {
            photoURL: url,
          }).then(() => {
            location.reload();
          });
        });
      });
      console.log("Uploaded a data_url string!");
    });
  };
  // firebase storage end

  return (
    <>
      <Navbar />
      <div className="md:w-full   relative mt-10 customMaxWSm customMxAuto">
        {/* First Background Layer */}
        <div className="absolute inset-0 transform -rotate-6 bg-gradient-to-r from-indigo-500 to-purple-700 shadow-2xl z-0 customFirstLayer"></div>

        {/* Second Background Layer */}
        <div className="absolute inset-0 transform rotate-6 bg-gradient-to-r from-indigo-400 to-purple-600 shadow-xl z-0 customSecondLayer"></div>

        {/* Main Content Layer */}
        <div className="relative bg-white shadow-2xl overflow-hidden p-8 z-10 customMainContentLayer">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-end">
              <button onClick={forEdit}>
                {" "}
                <FaUserEdit className=" md:text-2xl md:mr-5 md:mt-5 hover:scale-125 active:scale-90 transition-all " />{" "}
              </button>
            </div>
            <img
              className=" md:h-40 h-[80px] w-[80px]  md:w-40 object-cover mt-4 rounded-full border-4 border-white shadow-lg customProfileImage"
              src={currentUserData?.photoURL}
              alt="Profile"
            />
            <div className="text-start mt-6 customTextStart">
              <div className="text-center customTextCenter">
                <div className="uppercase tracking-wide text-[15px] md:text-xl text-indigo-500 font-semibold customTitle">
                  Developer
                </div>
                <h1 className="mt-2 text-[18px] md:text-2xl leading-tight font-bold text-gray-900 customDisplayName">
                  {currentUserData?.displayName}
                </h1>
              </div>
              <p className="mt-3 text-gray-700 customEmail">
                Email:{" "}
                <Link
                  to="#"
                  className="text-indigo-600 hover:text-indigo-700 customEmailLink"
                >
                  {currentUserData?.email}
                </Link>
              </p>
              <p className="mt-2 text-gray-700 customPhone">
                Phone:{" "}
                <Link
                  to="#"
                  className="text-indigo-600 hover:text-indigo-700 customPhoneLink"
                >
                  +88 123456789
                </Link>
              </p>
              <p className="mt-2 text-gray-700 customAddress">
                Address: 1234 Example Street, City, State, 12345
              </p>
              <p className="mt-2 text-gray-700 customLocation">
                Location: New York, USA
              </p>
            </div>
            <div className="w-full text-center mt-2 customBackLink">
              {/* <Link to='/login'>⬅️ Back to Login page </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* edit part traynari */}

      {edit && (
        <div className=" absolute z-10 top-0 left-0 w-full h-[100vh] bg-[#00000096] flex justify-center items-center ">
          <div className=" md:w-[500px] w-[255px] h-[400px] md:h-[700px] bg-[#ffffffa5] rounded-3xl ">
            {/* edit button */}
            <div className="w-full flex md:pt-0 pt-4 md:px-0 px-3 mb-2 md:mb-0 justify-between">
              <button onClick={forEdit}>
                {" "}
                <IoMdArrowRoundBack className="md:text-2xl md:mr-5 md:mt-5 hover:scale-125 active:scale-90 transition-all " />{" "}
              </button>
              <button onClick={handleSave}>
                {" "}
                <IoSaveOutline className=" md:text-2xl md:mr-5 md:mt-5 hover:scale-125 active:scale-90 transition-all " />{" "}
              </button>
            </div>

            {/* cropper TSX  */}
            <div>
              <div style={{ width: "100%" }}>
                <div className="flex w-full md:mt-2">
                  <input
                    className="text-[9px] md:text-[16px]"
                    type="file"
                    onChange={onChange}
                  />
                </div>
                <br />
                <br />
                <Cropper
                  ref={cropperRef}
                  className="w-full h-[200px] md:h-[300px]" // Responsive heights for different devices
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
              </div>
              <div>
                <div
                  className="box pt-5 px-5"
                  style={{ width: "100%", float: "right" }}
                >
                  <h1>
                    <button style={{ float: "right" }} onClick={getCropData}>
                      Crop Image
                    </button>
                  </h1>
                  <img
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    src={cropData}
                    alt="img"
                  />
                </div>
              </div>
              <br style={{ clear: "both" }} />
            </div>

            {/* cropper TSX  */}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
