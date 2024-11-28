import React from "react";
import ClosetItem from "./ClosetItem";

const SavedItem = ({ data }) => {
  const hats =
    data.data().hat ||
    "https://imagohats.com/cdn/shop/t/2/assets/placeholder_600x.png?v=113555733946226816651701209027";
  const tops =
    data.data().top ||
    "https://imagohats.com/cdn/shop/t/2/assets/placeholder_600x.png?v=113555733946226816651701209027";
  const pants =
    data.data().pants ||
    "https://imagohats.com/cdn/shop/t/2/assets/placeholder_600x.png?v=113555733946226816651701209027";
  const shoes =
    data.data().shoes ||
    "https://imagohats.com/cdn/shop/t/2/assets/placeholder_600x.png?v=113555733946226816651701209027";
  const accs = [
    data.data().accs,
    data.data().accs2,
    data.data().accs3,
    data.data().accs4,
  ];

  return (
    <div className="flex flex-col">
      <ClosetItem item={hats} type="hat" />
      <ClosetItem item={tops} type="top" />
      <ClosetItem item={pants} type="pants" />
      <ClosetItem item={shoes} type="shoes" />
    </div>
  );
};

export default SavedItem;
