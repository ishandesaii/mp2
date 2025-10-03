import axios from "axios";

const client = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
  timeout: 15000
});

const cache = new Map<string, any>();

export async function getCached<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url);
  const { data } = await client.get<T>(url);
  cache.set(url, data);
  return data;
}

export default client;
