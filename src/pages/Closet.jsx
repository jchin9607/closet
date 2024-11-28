import React from "react";
import ClosetItem from "../components/Closet.jsx/ClosetItem";
import useGetUserData from "../hooks/useGetUserData";
import { useContext } from "react";
import { AuthContext } from "../App";

const Closet = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetUserData(user.uid);

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
    <div className="w-full flex p-[15%] justify-between items-center gap-6 min-h-screen flex-wrap">
      <div className="flex flex-col gap-4">
        <h1>Hats</h1>
        {data.data().hat.map((item) => (
          <ClosetItem key={item} item={item} type="hat" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h1>Tops</h1>
        {data.data().top.map((item) => (
          <ClosetItem key={item} item={item} type="tops" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h1>Pants</h1>
        {data.data().pants.map((item) => (
          <ClosetItem key={item} item={item} type="pants" />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h1>Shoes</h1>
        {data.data().shoes.map((item) => (
          <ClosetItem key={item} item={item} type="shoes" />
        ))}
      </div>
    </div>
  );
};

export default Closet;
