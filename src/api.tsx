// Define the API interface
interface ApiService {
  get: <T>(url: string) => Promise<T | null>;
}

const api:ApiService = {
  async get<T> (url: string): Promise<T | null>  {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching:", error);
      return null;
    }
  }
}

export default api;