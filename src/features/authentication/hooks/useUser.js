import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../lib/api/apiAuth";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
};
