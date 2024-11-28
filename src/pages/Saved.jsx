import React from "react";
import SavedItem from "../components/Closet.jsx/SavedItem";
import useGetUserFits from "../hooks/useGetUserFits";
import { useContext } from "react";
import { AuthContext } from "../App";

const Saved = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetUserFits(user.uid);

  if (isLoading) {
    return (
      <div className="w-full flex px-[15%] justify-between items-center">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full flex px-[15%] justify-between items-center">
        Error
      </div>
    );
  }
  return (
    <div className="w-full flex p-[15%] justify-start items-center gap-6 min-h-screen flex-wrap">
      {data.docs.map((item) => (
        <SavedItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Saved;
