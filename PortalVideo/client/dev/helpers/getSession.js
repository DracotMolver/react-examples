import { USER_DATA } from "Constants/Storage";

/**
 * Returns the data when the user is logged. This data is saved using
 * the sessionStorage API.
 * 
 * @return {object} userData - It will return the userData object
 */
export const getUserData = () => JSON.parse(sessionStorage.getItem(USER_DATA));
 