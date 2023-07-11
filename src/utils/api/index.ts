import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:9090/api" });

export async function logIn(username: string, password: string) {
  const { data } = await api.post("/login", { username, password });
  return data;
}
