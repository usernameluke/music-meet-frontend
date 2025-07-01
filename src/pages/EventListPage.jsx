import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import eventService from "./../services/events.service";
import AddEvent from "../components/AddEvent";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

function EventListPage() {
  const [events, setEvents] = useState([]);

  const { user } = useContext(AuthContext);

  const getAllEvents = () => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-12">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Upcoming Events
        </h1>
        <p className="text-sm text-gray-500">
          Hey, {user?.name}! Browse jam sessions, gigs, collabs, and more!
        </p>
      </header>

      <section className="mb-8">
        <AddEvent
          refreshEvents={() => {
            getAllEvents();
            window.location.reload();
          }}
        />
      </section>

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events.length ? (
          events.map((event) => <EventCard key={event._id} {...event} />)
        ) : (
          <p className="text-gray-500">No events available right now.</p>
        )}
      </section>

      <div className="mt-8 text-center text-sm text-black">
        <p>Made with ❤️ by MusicMeet Team</p>
        <Link to="/about" className="underline">
          Learn more about us
        </Link>
      </div>
    </div>
  );
}

export default EventListPage;
