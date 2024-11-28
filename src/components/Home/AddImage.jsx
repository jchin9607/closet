import React from "react";
import { useState, useEffect } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Modal } from "@mui/material";
import ImageSelect from "./ImageSelect";
import useGetUserData from "../../hooks/useGetUserData";
import { useQueryClient } from "@tanstack/react-query";

const AddImage = ({
  type,
  influence,
  setInfluence,
  setRandomized,
  randomized,
}) => {
  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetUserData(user.uid);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (influence === 1) {
      setImage(null);
      setImageLink(null);
      localStorage.setItem("draftFit", {
        top: null,
        pants: null,
        shoes: null,
        hat: null,
        accs: null,
        accs2: null,
        accs3: null,
        accs4: null,
      });
      setInfluence(0);
    }

    if (randomized === 1) {
      const cat = data.data()[type];
      const randomIndex = Math.floor(Math.random() * cat.length);
      setImageLink(cat[randomIndex] ? cat[randomIndex] : null);

      setRandomized(0);
    }
  }, [influence, randomized]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notyf = new Notyf();

  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const storageRef = ref(storage, user.uid + "/" + type + "/" + Date.now());

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((url) => {
              const lcldt = JSON.parse(localStorage.getItem("draftFit"));
              lcldt[type] = url;
              // later: make a document with all clothing pieces
              localStorage.setItem("draftFit", JSON.stringify(lcldt));

              updateDoc(doc(db, "users", user.uid), {
                [type]: arrayUnion(url),
              });

              notyf.success("Image added to closet!");
              handleClose();
              queryClient.invalidateQueries(["users"]);
            })
            .catch((error) => {
              notyf.error(error.message);
            });
        })
        .catch((error) => {
          notyf.error(error.message);
        });
    }
  }
  return (
    <>
      <input
        type="file"
        className="absolute opacity-0 w-0 h-0"
        id={"add-" + type}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {!image && !imageLink && (
        <div
          className="w-[150px] h-[150px] border border-black bg-gray-300/50 flex justify-center items-center hover:bg-slate-600 cursor-pointer"
          // htmlFor={"add-" + type}
          onClick={handleOpen}
        >
          <h1 className="text-5xl">+</h1>
        </div>
      )}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="w-[150px] h-[150px] object-cover"
        />
      )}

      {imageLink && (
        <img src={imageLink} className="w-[150px] h-[150px] object-cover" />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" min-w-[300px] h-[80vh] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg border border-[#fff]">
          {open && (
            <ImageSelect
              type={type}
              setImage={setImageLink}
              handleClose={handleClose}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddImage;
