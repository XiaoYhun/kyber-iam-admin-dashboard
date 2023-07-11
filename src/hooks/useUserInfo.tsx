import { useState } from "react";

export type UserInfo = {
  email: string;
  picture: string;
};

export default function useUserInfo(): UserInfo {
  const [userInfo] = useState<UserInfo>(() => {
    const lcStorageUser = window.localStorage.getItem("user");
    return lcStorageUser ? JSON.parse(lcStorageUser) : undefined;
  });
  return userInfo as UserInfo;
}
