import { API } from "./common";

export default {
  createBoard: data => API.post("/boards", data),
  getAllBoards: () => API.get("/boards"),
  getBoard: id => API.get(`/boards/${id}`),

  // Tasks
  createTask: data => API.post("/tasks", data),
  createColumn: data => API.post("/columns", data)
};
