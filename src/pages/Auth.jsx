import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const Auth = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        variant="outlined"
        color="inherit"
        className="flex justify-center items-center gap-4 "
        onClick={() => signInWithGoogle()}
      >
        <GoogleIcon />
        {loading ? "Loading..." : "Continue With Google"}
        {error && <p>{error.message}</p>}
      </Button>
    </div>
  );
};

export default Auth;
