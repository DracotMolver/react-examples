import { USER_DATA } from "./constants";

export const getUserData = () => JSON.parse(sessionStorage.getItem(USER_DATA));
