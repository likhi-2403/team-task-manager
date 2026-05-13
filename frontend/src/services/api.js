import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-9e9c.up.railway.app/api",
});

export default API;