import { toast } from "react-toastify";

import { expireAuth } from "../util/AuthenticationUtil";

export function checkResponse(response) {
  if (response.ok) {
    return response;
  } else if (response.status === 401) {
    toast.warning(
      "401 | Your session is expired... Please login to the system again..."
    );
    expireAuth();
    return Promise.reject(new Error("401"));
  } else if (response.status === 403) {
    return Promise.reject(new Error("403"));
  } else {
    return Promise.reject(new Error("An error occured"));
  }
}
