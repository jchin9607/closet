import React from "react";
import AddImage from "./AddImage";

const Clothes = ({ influence, setInfluence, randomized, setRandomized }) => {
  return (
    <main className="flex flex-col items-center gap-4">
      <h1>Clothes</h1>
      {/* hat */}
      <AddImage
        type="hat"
        influence={influence}
        setInfluence={setInfluence}
        setRandomized={setRandomized}
        randomized={randomized}
      />

      {/* top */}
      <AddImage
        type="top"
        influence={influence}
        setInfluence={setInfluence}
        setRandomized={setRandomized}
        randomized={randomized}
      />

      {/* pants */}
      <AddImage
        type="pants"
        influence={influence}
        setInfluence={setInfluence}
        setRandomized={setRandomized}
        randomized={randomized}
      />

      {/* shoes */}
      <AddImage
        type="shoes"
        influence={influence}
        setInfluence={setInfluence}
        setRandomized={setRandomized}
        randomized={randomized}
      />
    </main>
  );
};

export default Clothes;
