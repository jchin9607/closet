import React from "react";
import { ImageList } from "@mui/material";
import useGetUserData from "../../hooks/useGetUserData";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Button } from "@mui/material";

const ImageSelect = ({ type, setImage, handleClose }) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetUserData(user.uid);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col justify-between h-full p-[5%]">
      <h1 className="text-2xl font-bold">All {type}</h1>
      <div className=" flex  justify-center items-start overflow-y-auto">
        <ImageList variant="masonry" cols={3} rowHeight={164}>
          {[type].map((type) =>
            data.data()[type].map((item) => (
              <img
                src={item}
                alt={type}
                key={item + type}
                className="w-[150px] h-[150px] object-cover rounded-lg bg-gray-500 hover:opacity-50 cursor-pointer"
                onClick={() => {
                  const lcldt = JSON.parse(localStorage.getItem("draftFit"));
                  lcldt[type] = item;
                  localStorage.setItem("draftFit", JSON.stringify(lcldt));
                  setImage(item);
                  handleClose();
                }}
              />
            ))
          )}
        </ImageList>
      </div>
      <label
        htmlFor={"add-" + type}
        className="bg-[#f0f0f0]  px-4 py-2 rounded-lg cursor-pointer w-[125px] flex justify-center items-center"
      >
        Add Image
      </label>
    </div>
  );
};

export default ImageSelect;
