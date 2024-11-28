import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const useGetUserData = (userId) => {
  const query = doc(db, "users", userId);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],

    queryFn: async () => await getDoc(query),
  });

  return { data, isLoading, isError, error };
};

export default useGetUserData;
