import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState("new");

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
    console.log(location.pathname);
  }, [location.pathname]);

  if (!user) {
    return null;
  }
  return (
    <div className="fixed w-full h-[60px] top-0 left-0 flex justify-between items-center gap-6 text-3xl px-[15%]">
      <>
        <Link to="/new">
          <h1 className={currentPage === "/new" ? "underline" : ""}>New Fit</h1>
        </Link>
        <Link to="/saved">
          <h1 className={currentPage === "/saved" ? "underline" : ""}>
            Saved Fits
          </h1>
        </Link>
        <Link to="/closet">
          <h1 className={currentPage === "/closet" ? "underline" : ""}>
            Closet
          </h1>
        </Link>
        <p className="cursor-pointer" onClick={() => signOut()}>
          {loading ? "Loading..." : "Log out"}
          {error && <p>{error.message}</p>}
        </p>
      </>
    </div>
  );
};

export default Navbar;
