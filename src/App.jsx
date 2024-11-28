import React from "react";
import { BrowserRouter } from "react-router-dom";
import NewFit from "./pages/NewFit";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import { createContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

import { db } from "./firebase/firebase";
const AuthContext = createContext();
export { AuthContext };
import Closet from "./pages/Closet";
import Saved from "./pages/Saved";
import Footer from "./components/Footer";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user != null && user?.uid) {
      const userRef = doc(db, "users", user.uid);

      getDoc(userRef)
        .then((doc) => {
          if (!doc.exists()) {
            setDoc(userRef, {
              user: user.uid,
              hat: [],
              top: [],
              pants: [],
              shoes: [],
              accs: [],
              accs2: [],
              accs3: [],
              accs4: [],
              fits: [],
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setIsLoading(false);
    }
  }),
    [];

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {error.message}
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user }}>
      <BrowserRouter>
        <Navbar />
        <div className="w-full min-h-screen">
          <Routes>
            <Route
              path="/home"
              element={user ? <Landing /> : <Navigate to="/" />}
            />
            <Route
              path="/new"
              element={user ? <NewFit /> : <Navigate to="/" />}
            />
            <Route
              path="/closet"
              element={user ? <Closet /> : <Navigate to="/" />}
            />
            <Route
              path="/saved"
              element={user ? <Saved /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={!user ? <Auth /> : <Navigate to="/new" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
