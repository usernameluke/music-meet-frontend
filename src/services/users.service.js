// services/user.service.js
import axios from "axios";

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // PUT /users/profile
  updateProfile = (payload) => {
    return this.api.put("/users/profile", payload);
  };

  // GET /users/profile
  getProfile = () => {
    return this.api.get("/users/profile");
  };

    // DELETE /users/profile
  deleteProfile = () => {
    return this.api.delete("/users/profile");
  };
}

// Create one instance object
const userService = new UsersService();

export default userService;
