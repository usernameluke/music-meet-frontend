import { useState, useEffect } from "react";
import eventService from "./../services/events.service";
import { useNavigate, Link, useParams } from "react-router-dom";

function EditEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [compensation, setCompensation] = useState("");
  const [type, setType] = useState("");
  const [instrumentsNeeded, setInstrumentsNeeded] = useState("");
  const [genres, setGenres] = useState("");

  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    // Send the token through the request "Authorization" Headers
    eventService
      .getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDescription(oneEvent.description);
        setLocation(oneEvent.location);
        setImageUrl(oneEvent.imageUrl);
        setEventDate(oneEvent.eventDate);
        setEventTime(oneEvent.eventTime);
        setCompensation(oneEvent.compensation);
        setType(oneEvent.type);
        setInstrumentsNeeded(oneEvent.instrumentsNeeded);
        setGenres(oneEvent.genres);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      description,
      location,
      imageUrl,
      eventDate,
      eventTime,
      compensation,
      type,
      instrumentsNeeded,
      genres,
    };

    // Send the token through the request "Authorization" Headers
    eventService.updateEvent(eventId, requestBody).then(() => {
      navigate(`/events/${eventId}`);
    });
  };

  const deleteEvent = () => {
    // Send the token through the request "Authorization" Headers
    eventService
      .deleteEvent(eventId)
      .then(() => navigate("/events"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Edit the Event</h3>

        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Open Mic Night"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              rows="3"
              placeholder="A chance for local talent to enjoy themselves, with 100 tickets already sold. 8.30pm-12am. All musicians/bands welcome!"
            />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Name of venue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                // value={imageUrl}
                accept="image/*"
                onChange={(e) => setImageUrl(e.target.files[0])}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Upload a picture of the venue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Time
              </label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="6pm-12am"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Compensation
              </label>
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="€10 worth of free drinks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="">Select type of event</option>
                <option value="Jam Session">Jam Session</option>
                <option value="Band Try Outs">Band Try Out</option>
                <option value="Collab">Collab</option>
                <option value="Gig">Gig</option>
                <option value="Fest">Fest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instrument Needed?
              </label>
              <input
                value={instrumentsNeeded}
                onChange={(e) => setInstrumentsNeeded(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Yes - Electric guitar"
                required
              ></input>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genres
              </label>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Blues, jazz, rock..."
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
            <Link to="/events">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition">
                Back to Events
              </button>
            </Link>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Update Event
            </button>

            <button
              onClick={deleteEvent}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
            >
              Delete Event
            </button>
          </div>
        </form>
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

export default EditEventPage;
