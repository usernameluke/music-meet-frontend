import { useState, useEffect, useContext } from "react";
import eventService from "./../services/events.service";
import commentsService from "../services/comments.service";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import favouritesService from "../services/favourites.service";

function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
  const [isFavourited, setIsFavourited] = useState(false);

  const isOwner = user && event?.author && user._id === event.author._id;

  const getEvent = () => {
    eventService
      .getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  const getComments = () => {
    commentsService
      .getComments(eventId)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Failed to fetch comments", err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    commentsService
      .createComment({
        post: eventId,
        text: newComment,
      })
      .then((res) => {
        setComments((prev) => [res.data, ...prev]);
        setNewComment("");
      })
      .catch((err) => console.error("Failed to post comment", err));
  };

  const handleFavouriteToggle = () => {
    if (isFavourited) {
      favouritesService
        .removeFromFavourites(eventId)
        .then(() => setIsFavourited(false))
        .catch((err) => console.error("Failed to remove from favourites", err));
    } else {
      favouritesService
        .addToFavourites(eventId)
        .then(() => setIsFavourited(true))
        .catch((err) => console.error("Failed to add to favourites", err));
    }
  };

  useEffect(() => {
    getEvent();
    getComments();

    if (user) {
      favouritesService
        .getFavourites()
        .then((res) => {
          const favEventIds = res.data.map((fav) => fav._id);
          setIsFavourited(favEventIds.includes(eventId));
        })
        .catch((err) => console.error("Failed to load favourites", err));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      {event && (
        <>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">
              {event.title}
            </h1>
            {event.author && (
              <p className="text-gray-700">
                <strong>Posted by:</strong>{" "}
                <Link
                  to={`/users/${event.author._id}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {event.author.name}
                </Link>
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base">
              <div className="mb-4">
                <p className="mb-1">
                  <strong>What the place looks like:</strong>
                </p>
                <img
                  src={event.imageUrl}
                  alt="Venue"
                  className="rounded-xl shadow-md max-w-full h-auto object-cover border border-gray-200"
                />
              </div>

              <p>
                <strong>What they're after:</strong> {event.description}
              </p>
              <p>
                <strong>Where it's going down:</strong> {event.location}
              </p>
              <p>
                <strong>What date it's happening:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString("en-GB")}
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
                <strong>Need to bring own kit?</strong>{" "}
                {event.instrumentsNeeded}
              </p>
              <p>
                <strong>What you're playing:</strong> {event.genres}
              </p>
              <p>
                <strong>Place to kip for the night?</strong>{" "}
                {event.accomodation ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={handleFavouriteToggle}
              className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
                isFavourited
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isFavourited
                ? "Remove from Favourites ❤️"
                : "Add to Favourites 🤍"}
            </button>
          )}

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {user && (
              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col gap-2 mb-6"
              >
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="border border-gray-300 rounded-lg p-2 resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="self-end bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Post Comment
                </button>
              </form>
            )}

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <p className="text-gray-800">{comment.text}</p>
                    <Link
                      to={`/users/${comment.author._id}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {comment.author.name}
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Navigation Buttons */}
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

      {/* About Section */}
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
