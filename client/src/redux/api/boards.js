import { API } from "./common";

export default {
  createBoard: data => API.post("/boards", data),
  getAllBoards: () => API.get("/boards"),
  getBoard: id => API.get(`/boards/${id}`)
  // createBoard: data => API.post("/boards", data)
  // createBoard: data => API.post("/boards", data)
};
