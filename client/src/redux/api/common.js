import { create } from "apisauce";
import configs from "../configs";

const API = create({
  baseURL: configs.endpoint,
  timeout: configs.timeOut,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
localStorage.getItem("");
export { API };
