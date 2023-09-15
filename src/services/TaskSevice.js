import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8081/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("api/tasks");
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
};
