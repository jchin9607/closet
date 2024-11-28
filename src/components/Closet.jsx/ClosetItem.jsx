import React from "react";

const ClosetItem = ({ item, type }) => {
  return (
    <img
      src={item}
      alt={type + " clothing item"}
      className="w-[150px] h-[150px] object-cover rounded-lg bg-gray-500"
    />
  );
};

export default ClosetItem;
