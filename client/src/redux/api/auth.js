import { API } from "./common";

export default {
  verifyToken: token =>
    API.get(
      "auths/token/verify",
      {},
      { headers: { Authorization: `access_token ${token}` } }
    ),
  login: (params = {}) => API.post("/auth/login", params),
  register: (params = {}) => API.post("/auth/register", params)
};
