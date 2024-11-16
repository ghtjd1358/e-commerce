import { useQuery } from "@tanstack/react-query";
import { getAccountApi } from "../api";
import { ACCOUNT_KEY } from "../key";
import { IUser, GoogleUser } from "../type";

export const useFetchAccount = (uid: string) => {
  const queryKey = [ACCOUNT_KEY, uid] as const;

  return useQuery<IUser | GoogleUser, Error>({
    queryKey,
    queryFn: () => getAccountApi(uid),
    enabled: !!uid,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
    throwOnError: true,
  });
};
