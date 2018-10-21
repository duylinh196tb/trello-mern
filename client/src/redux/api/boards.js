import { API } from "./common";

const headerAuth = token => {
  return { headers: { Authorization: `${token}` } };
};

export default {
  createBoard: (token, data) => API.post("/boards", data, headerAuth(token)),
  getAllBoards: token => API.get("/boards", {}, headerAuth(token)),
  getBoard: (token, id) => API.get(`/boards/${id}`, {}, headerAuth(token)),
  updateBoard: (token, data, id) =>
    API.patch(`/boards/${id}`, data, headerAuth(token)),
  deleteBoard: (token, id) =>
    API.delete(`/boards/${id}`, {}, headerAuth(token)),

  //Columns
  createColumn: (token, data) => API.post("/columns", data, headerAuth(token)),
  updateColumn: (token, data, id) =>
    API.patch(`/columns/${id}`, data, headerAuth(token)),
  deleteColumn: (token, id) =>
    API.delete(`/columns/${id}`, {}, headerAuth(token)),
  // Tasks
  createTask: (token, data) => API.post("/tasks", data, headerAuth(token)),
  updateTask: (token, data, id) =>
    API.patch(`/tasks/${id}`, data, headerAuth(token)),
  deleteTask: (token, id) => API.delete(`/tasks/${id}`, {}, headerAuth(token))
};
