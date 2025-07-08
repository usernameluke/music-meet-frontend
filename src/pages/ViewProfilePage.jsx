import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import userService from "../services/users.service";

function ViewProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    userService
      .getPublicProfile(userId)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("User profile not found.");
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (error || !user) {
    return (
      <div className="p-6 text-center">
        <p>{error || "User profile not found."}</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    role,
    name,
    bio,
    location: userLocation,
    instagram,
    youtube,
    website,
    instruments,
    genres,
    experienceLevel,
    inBand,
    lookingFor,
    availability,
    members,
    bandGenres,
    bandLookingFor,
    address,
    pay,
    lodging,
    capacity,
  } = user;

  const renderLinks = () => (
    <div className="space-y-1">
      {instagram && (
        <div>
          <strong>Instagram:</strong>{" "}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {instagram}
          </a>
        </div>
      )}
      {youtube && (
        <div>
          <strong>YouTube:</strong>{" "}
          <a
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {youtube}
          </a>
        </div>
      )}
      {website && (
        <div>
          <strong>Website:</strong>{" "}
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {website}
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          {name}'s Public Profile
        </h2>
        <p className="text-gray-600 mb-6 capitalize">{role}</p>

        <div className="grid grid-cols-1 gap-4 text-gray-700 text-base">
          <div>
            <strong>Location:</strong> {userLocation || "—"}
          </div>
          {bio && (
            <div>
              <strong>Bio:</strong> {bio}
            </div>
          )}
          {renderLinks()}

          {role === "musician" && (
            <>
              <div>
                <strong>Instruments:</strong> {instruments || "—"}
              </div>
              <div>
                <strong>Genres:</strong> {genres || "—"}
              </div>
              <div>
                <strong>Experience Level:</strong> {experienceLevel || "—"}
              </div>
              <div>
                <strong>Currently in a Band:</strong> {inBand ? "Yes" : "No"}
              </div>
              <div>
                <strong>Looking For:</strong> {lookingFor || "—"}
              </div>
              <div>
                <strong>Availability:</strong> {availability || "—"}
              </div>
            </>
          )}

          {role === "band" && (
            <>
              <div>
                <strong>Band Genres:</strong> {bandGenres || "—"}
              </div>
              <div>
                <strong>Looking For:</strong> {bandLookingFor || "—"}
              </div>
              <div>
                <strong>Members:</strong>{" "}
                {members?.length ? members.length : "—"}
              </div>
            </>
          )}

          {role === "venue" && (
            <>
              <div>
                <strong>Address:</strong>{" "}
                {address ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {address}
                  </a>
                ) : (
                  "Not yet given"
                )}
              </div>

              <div>
                <strong>Pay:</strong> {pay || "Yet to be clarified"}
              </div>
              <div>
                <strong>Offers Lodging:</strong> {lodging ? "Yes" : "No"}
              </div>
              <div>
                <strong>Max Capacity:</strong> {capacity || "Not yet clarified"}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-4 pt-6 border-t border-gray-200">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
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

export default ViewProfilePage;
