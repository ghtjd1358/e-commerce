import { useQuery } from "@tanstack/react-query";
import { checkNicknameExists } from "../api";

export const useCheckNicknameExists = (nickname: string) => {
  return useQuery({
    queryKey: ["checkNicknameExists", nickname],
    queryFn: () => checkNicknameExists(nickname),
    enabled: !!nickname,
  });
};
