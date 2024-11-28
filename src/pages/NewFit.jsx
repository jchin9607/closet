import React from "react";
import Clothes from "../components/Home/Clothes";
import Accs from "../components/Home/Accs";
import ControlBar from "../components/Home/ControlBar";
import { useState } from "react";

const Home = () => {
  const [influence, setInfluence] = useState(0);
  const [randomized, setRandomized] = useState(0);
  const draftFit = {
    top: null,
    pants: null,
    shoes: null,
    hat: null,
    accs: null,
    accs2: null,
    accs3: null,
    accs4: null,
  };

  localStorage.setItem("draftFit", JSON.stringify(draftFit));

  return (
    <div className="w-full flex px-[15%] justify-between items-center">
      <div className="flex justify-center items-center min-h-screen gap-6">
        <ControlBar setInfluence={setInfluence} setRandomized={setRandomized} />
        <Clothes
          influence={influence}
          setInfluence={setInfluence}
          randomized={randomized}
          setRandomized={setRandomized}
        />
        {/* <Accs /> */}
      </div>
    </div>
  );
};

export default Home;
