import axios from "axios";

class FavouritesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });

    // Automatically attach JWT token to each request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${storedToken}`,
        };
      }

      return config;
    });
  }

  // GET /api/favourites
  getFavourites = () => {
    return this.api.get("/api/favourites");
  };

  // POST /api/favourites/:eventId
  addToFavourites = (eventId) => {
    return this.api.post(`/api/favourites/${eventId}`);
  };

  // DELETE /api/favourites/:eventId
  removeFromFavourites = (eventId) => {
    return this.api.delete(`/api/favourites/${eventId}`);
  };
}

// Export a single instance
const favouritesService = new FavouritesService();

export default favouritesService;
