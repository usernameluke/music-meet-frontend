import axios from "axios";

class EventsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    // Automatically attach JWT token to each request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/events
  createEvent = (formData) => {
    return this.api.post("/api/events", formData);
  };

  // GET /api/events
  getAllEvents = () => {
    return this.api.get("/api/events");
  };

  // GET /api/events/:id
  getEvent = (id) => {
    return this.api.get(`/api/events/${id}`);
  };

  // PUT /api/events/:id
  updateEvent = (id, requestBody) => {
    return this.api.put(`/api/events/${id}`, requestBody);
  };

  // DELETE /api/events/:id
  deleteEvent = (id) => {
    return this.api.delete(`/api/events/${id}`);
  };
}

// Create one instance object
const eventsService = new EventsService();

export default eventsService;
