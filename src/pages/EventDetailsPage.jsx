import { useState, useEffect, useContext } from "react";
import eventService from "./../services/events.service";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);

  const isOwner = user && event?.author && user._id === event.author._id;

  const getEvent = () => {
    // Send the token through the request "Authorization" Headers
    eventService
      .getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      {event && (
        <>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">
              {event.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base">
              <p>
                <strong>What they're after:</strong> {event.description}
              </p>
              <p>
                <strong>Where it's going down:</strong> {event.location}
              </p>
              <p>
                <strong>What the place looks like:</strong>{" "}
                <img src={event.imageUrl} alt="Venue" />
              </p>
              <p>
                <strong>What date it's happening (YYYY/MM/DD):</strong>{" "}
                {event.eventDate?.slice(0, 10)}
              </p>
              <p>
                <strong>What time it's happening:</strong> {event.eventTime}
              </p>
              <p>
                <strong>What you get out of it:</strong> {event.compensation}
              </p>
              <p>
                <strong>What it is:</strong> {event.type}
              </p>
              <p>
                <strong>What you need to bring:</strong>{" "}
                {event.instrumentsNeeded}
              </p>
              <p>
                <strong>What you're playing:</strong> {event.genres}
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
        <Link to="/events">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition">
            Back to Events
          </button>
        </Link>

        {isOwner && (
          <Link to={`/events/edit/${eventId}`}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition">
              Edit Event
            </button>
          </Link>
        )}
      </div>
      <div className="mt-8 text-center text-sm text-black">
        <p>Made with ❤️ by MusicMeet Team</p>
        <Link to="/about" className="underline">
          Learn more about us
        </Link>
      </div>
    </div>
  );
}

export default EventDetailsPage;
