import { API } from "./common";

const headerAuth = token => {
  return { headers: { Authorization: `${token}` } };
};

export default {
  createBoard: (token, data) => API.post("/boards", data, headerAuth(token)),
  getAllBoards: token => API.get("/boards", {}, headerAuth(token)),
  getBoard: (token, id) => API.get(`/boards/${id}`, {}, headerAuth(token)),

  // Tasks
  createTask: (token, data) => API.post("/tasks", data, headerAuth(token)),
  createColumn: (token, data) => API.post("/columns", data, headerAuth(token))
};
