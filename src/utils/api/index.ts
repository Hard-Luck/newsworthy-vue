import axios from "axios";
import { ArticleFromApi, isArticleFromApiArray } from "../../types/api";

const api = axios.create({ baseURL: "http://localhost:9090/api" });

export async function logIn(username: string, password: string) {
  const { data } = await api.post("/login", { username, password });
  return data;
}

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
      }
    }
    throw Promise.reject(error);
  }
);

export async function getArticles(topic?: string) {
  try {
    const { data } = await api.get("/articles", { params: { topic } });
    if (isArticleFromApiArray(data.articles)) {
      return data.articles as ArticleFromApi[];
    } else {
      throw new Error("Api data mismatch");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
      }
    }
    throw error;
  }
}
export async function getArticleById(id: string) {
  try {
    const { data } = await api.get(`/articles/${id}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        localStorage.removeItem("token");
      }
    }
    throw error;
  }
}

export async function getArticleComments(id: string) {
  const { data } = await api.get(`/articles/${id}/comments`);

  return data;
}

export async function voteOnArticle(id: string) {
  const { data } = await api.patch(`/articles/${id}`, { inc_votes: 1 });
  return data;
}

export async function postComment(id: string, body: string) {
  const { data } = await api.post(`/articles/${id}/comments`, { body });
  return data;
}
