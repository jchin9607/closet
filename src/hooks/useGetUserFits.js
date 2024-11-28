import { useQuery } from "@tanstack/react-query";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetUserFits = (userId) => {
  const docRef = collection(db, "fits");
  const q = query(docRef, where("user", "==", userId));
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userFits", userId],
    queryFn: async () => await getDocs(q),
  });

  return { data, isLoading, isError, error };
};

export default useGetUserFits;
