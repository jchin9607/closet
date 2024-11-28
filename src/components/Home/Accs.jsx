import React from "react";
import AddImage from "./AddImage";

const Accs = () => {
  return (
    <div>
      <main className="flex flex-col items-center gap-4">
        <div>
          <h1>Accessories/</h1>
          <h1>Layers</h1>
        </div>
        {/* hat */}
        <AddImage type="accs" />

        {/* top */}
        <AddImage type="accs2" />

        {/* pants */}
        <AddImage type="accs3" />

        {/* shoes */}
        <AddImage type="accs4" />
      </main>
    </div>
  );
};

export default Accs;
