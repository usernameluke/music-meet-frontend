import { useEffect, useState, useContext } from "react";
import favouritesService from "../services/favourites.service";
import commentsService from "../services/comments.service";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const [favouriteEvents, setFavouriteEvents] = useState([]);
  const [userComments, setUserComments] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch favourites
      favouritesService
        .getFavourites()
        .then((res) => setFavouriteEvents(res.data))
        .catch((err) => console.error("Failed to fetch favorites:", err));

      // Fetch user comments
      commentsService
        .getUserComments()
        .then((res) => {
          console.log("User comments response:", res.data);
          setUserComments(res.data);
        })
        .catch((err) => console.error("Failed to fetch user comments:", err));
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col bg-[url(/background.png)] bg-cover bg-center">
      <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-white mt-10 font-sans">
          MusicMeet
        </h1>
        <p className="text-lg text-gray-100 mb-10">
          Find musicians.
          <br />
          Join bands. Play live.
        </p>

        {isLoggedIn && (
          <>
            {/* Favourited Events */}
            <div className="bg-purple-700 rounded-xl p-4 mt-6 w-full max-w-md">
              <h2 className="text-white text-xl font-semibold mb-2">
                Your Favourited Events
              </h2>
              {favouriteEvents.length > 0 ? (
                favouriteEvents.map((event) => (
                  <div key={event._id} className="border-b py-2">
                    <Link
                      to={`/events/${event._id}`}
                      className="text-white font-medium hover:underline"
                    >
                      {event.title}
                    </Link>
                    <p className="text-sm text-white">{event.location}</p>
                    <p className="text-sm text-white">
                      {new Date(event.eventDate).toLocaleDateString("en-GB")} -{" "}
                      {event.eventTime}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-white text-sm">No favourites yet.</p>
              )}
            </div>

            {/* User Comments */}
            <div className="bg-purple-700 bg-opacity-10 rounded-xl p-4 mt-6 w-full max-w-md">
              <h2 className="text-white text-xl font-semibold mb-2">
                Your Comments
              </h2>
              {userComments.length > 0 ? (
                userComments.map((comment) => (
                  <div key={comment._id} className="border-b py-2 text-left">
                    <p className="text-sm italic text-white">
                      On: {comment.post?.title || "Unknown post"}
                    </p>
                    <p className="text-white">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-sm">No comments posted yet.</p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-white">
        <p>Made with ❤️ by MusicMeet Team</p>
        <Link to="/about" className="underline">
          Learn more about us
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
