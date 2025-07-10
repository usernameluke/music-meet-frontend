import axios from "axios";

class CommentsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    // Automatically attach JWT token to each request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
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

  // GET /api/comments/:postId
  getComments = (postId) => {
    return this.api.get(`/api/comments/${postId}`);
  };

  // POST /api/comments
  createComment = (commentData) => {
    return this.api.post("/api/comments", commentData);
  };

  // DELETE /api/comments/:commentId
  deleteComment = (commentId) => {
    return this.api.delete(`/api/comments/${commentId}`);
  };

  // GET /api/comments/user
  getUserComments = () => {
  return this.api.get("/api/comments/user");
};

}

// Export a single instance
const commentsService = new CommentsService();

export default commentsService;
