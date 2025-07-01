import { useState } from "react";
import eventService from "../services/events.service";

function AddEvent({ refreshEvents }) {
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [compensation, setCompensation] = useState("");
  const [type, setType] = useState("");
  const [instrumentsNeeded, setInstrumentsNeeded] = useState("");
  const [genres, setGenres] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("eventDate", eventDate);
    formData.append("eventTime", eventTime);
    formData.append("compensation", compensation);
    formData.append("type", type);
    formData.append("instrumentsNeeded", instrumentsNeeded);
    formData.append("genres", genres);

    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    eventService
      .createEvent(formData)
      .then(() => {
        setTitle("");
        setDescription("");
        setLocation("");
        setImageUrl(null);
        setEventDate("");
        setEventTime("");
        setCompensation("");
        setType("");
        setInstrumentsNeeded("");
        setGenres("");

        setShowForm(false);
        refreshEvents();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mb-6">
      {/* Trigger Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          + Add Event
        </button>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Create Event
            </h3>
            <form
              onSubmit={handleSubmit}
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
                  placeholder="Open Mic Night @ The Underworld"
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
                    placeholder="Camden, London"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Image
                  </label>
                  <input
                    type="file"
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

              {/* Submit + Cancel */}
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEvent;
