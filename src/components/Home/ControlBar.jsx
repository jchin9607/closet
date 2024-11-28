import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import {
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const ControlBar = ({ setInfluence, setRandomized }) => {
  const user = useContext(AuthContext);
  const notyf = new Notyf();

  const queryClient = useQueryClient();
  async function handleSave() {
    try {
      const theDate = Date.now();

      const fitData = JSON.parse(localStorage.getItem("draftFit"));
      const finalData = { user: user.user.uid, date: theDate, ...fitData };

      const docRef = collection(db, "fits");

      const snap = await addDoc(docRef, finalData);

      await updateDoc(doc(db, "users", user.user.uid), {
        fits: arrayUnion(snap.id),
      });

      notyf.success("Fit saved!");
      queryClient.invalidateQueries(["userFits"]);
    } catch (error) {
      notyf.error(error.message);
    }
  }

  return (
    <div className="w-[100px] flex flex-col gap-4">
      <Tooltip title="Save fit" placement="left">
        <BookmarkIcon onClick={handleSave} sx={{ cursor: "pointer" }} />
      </Tooltip>

      {/* <Tooltip title="Randomize" placement="left">
        <ShuffleIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setRandomized(1)}
        />
      </Tooltip> */}

      <Tooltip title="Clear" placement="left">
        <LocalLaundryServiceIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setInfluence((prev) => prev + 1);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default ControlBar;
