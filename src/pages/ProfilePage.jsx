import userService from "../services/users.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const [allMusicians, setAllMusicians] = useState([]);
  const navigate = useNavigate();
  const { user, setUser, deleteUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");

  const [instruments, setInstruments] = useState("");
  const [genres, setGenres] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [inBand, setInBand] = useState(null);
  const [lookingFor, setLookingFor] = useState("");
  const [availability, setAvailability] = useState("");

  const [members, setMembers] = useState([]);
  const [bandGenres, setBandGenres] = useState("");
  const [bandLookingFor, setBandLookingFor] = useState("");

  const [address, setAddress] = useState("");
  const [pay, setPay] = useState("");
  const [lodging, setLodging] = useState(null);
  const [capacity, setCapacity] = useState("");

  const getProfile = (musiciansList = allMusicians) => {
    userService
      .getProfile()
      .then((response) => {
        const oneProfile = response.data;

        // Turn member IDs into full objects
        const completeMembers =
          oneProfile.members?.map((IdOrObject) => {
            if (typeof IdOrObject === "object") return IdOrObject;
            return musiciansList.find((m) => m._id === IdOrObject);
          }) || [];

        setProfileInfo({
          ...oneProfile,
          members: completeMembers,
        });

        // Set state values
        setBio(oneProfile.bio || "");
        setInstagram(oneProfile.instagram || "");
        setYoutube(oneProfile.youtube || "");
        setWebsite(oneProfile.website || "");
        setInstruments(oneProfile.instruments || "");
        setGenres(oneProfile.genres || "");
        setExperienceLevel(oneProfile.experienceLevel || "");
        setInBand(oneProfile.inBand ?? null);
        setLookingFor(oneProfile.lookingFor || "");
        setAvailability(oneProfile.availability || "");
        setMembers(completeMembers.map((m) => m?._id));
        setBandGenres(oneProfile.bandGenres || "");
        setBandLookingFor(oneProfile.bandLookingFor || "");
        setAddress(oneProfile.address || "");
        setPay(oneProfile.pay || "");
        setLodging(oneProfile.lodging ?? null);
        setCapacity(oneProfile.capacity || "");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    userService.getAllMusicians().then((res) => {
      setAllMusicians(res.data);
      getProfile(res.data);
    });
  }, []);

  const handleSave = () => {
    const commonData = { bio, instagram, youtube, website };
    let roleData = {};

    if (user.role === "musician") {
      if (!genres.trim()) {
        alert("Please enter at least one genre.");
        return;
      }

      roleData = {
        instruments,
        genres,
        experienceLevel,
        inBand: inBand === null ? false : inBand,
        lookingFor,
        availability,
      };
    } else if (user.role === "band") {
      if (!bandGenres.trim()) {
        alert("Please enter at least one genre.");
        return;
      }

      const cleanedMembers = Array.isArray(members)
        ? members.filter((m) => m && m !== "null")
        : [];

      roleData = {
        members: cleanedMembers,
        bandGenres,
        bandLookingFor,
      };
    } else if (user.role === "venue") {
      if (!address.trim()) {
        alert("Please enter the venue's address.");
        return;
      }
      if (!pay.trim()) {
        alert("Please enter the payment information.");
        return;
      }
      if (lodging === null) {
        alert("Please specify if lodging is available.");
        return;
      }

      roleData = {
        address,
        pay,
        lodging: lodging === null ? false : lodging,
        capacity,
      };
    }

    const payload = { ...commonData, ...roleData };

    userService
      .updateProfile(payload)
      .then((response) => {
        setUser(response.data);
        getProfile();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Could not save profile data, please try again.");
      });
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Your Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1 border rounded-md px-3 py-2 text-sm bg-gray-100">
            {user.name}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 border rounded-md px-3 py-2 text-sm bg-gray-100">
            {user.email}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1 border rounded-md px-3 py-2 text-sm bg-gray-100 capitalize">
            {user.role}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="mt-1 border rounded-md px-3 py-2 text-sm bg-gray-100 capitalize">
            {user.location}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">
        Add more about yourself to make the most of MusicMeet!
      </p>

      <div className="space-y-6 border-t pt-6">
        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biography
          </label>
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          ) : (
            <div className="mt-1 text-sm text-gray-800">
              {profileInfo?.bio ? (
                profileInfo.bio
              ) : (
                <label className="text-gray-400 italic">
                  Not yet selected — why not add this?{" "}
                </label>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}

        <label className="block text-sm font-medium text-gray-700 mb-0">
          Instagram
        </label>

        {isEditing ? (
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        ) : (
          <div className="mt-1 text-sm text-gray-800">
            {profileInfo?.instagram ? (
              profileInfo.instagram
            ) : (
              <label className="text-gray-400 italic">
                Not yet selected — why not add this?{" "}
              </label>
            )}
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-0">
          YouTube
        </label>
        {isEditing ? (
          <input
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        ) : (
          <div className="mt-1 text-sm text-gray-800">
            {profileInfo?.youtube ? (
              profileInfo.youtube
            ) : (
              <label className="text-gray-400 italic">
                Not yet selected — why not add this?{" "}
              </label>
            )}
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-0">
          Website
        </label>
        {isEditing ? (
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        ) : (
          <div className="mt-1 text-sm text-gray-800">
            {profileInfo?.website ? (
              profileInfo.website
            ) : (
              <label className="text-gray-400 italic">
                Not yet selected — why not add this?{" "}
              </label>
            )}
          </div>
        )}

        {/* Role-specific fields */}
        {user.role === "musician" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instruments
              </label>
              {isEditing ? (
                <input
                  value={instruments}
                  onChange={(e) => setInstruments(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.instruments ? (
                    profileInfo.instruments
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genres
              </label>
              {isEditing ? (
                <input
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.genres ? (
                    profileInfo.genres
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              {isEditing ? (
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.experienceLevel ? (
                    profileInfo.experienceLevel
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Are you in a band?
              </label>
              {isEditing ? (
                <select
                  value={typeof inBand === "boolean" ? String(inBand) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setInBand(null);
                    else setInBand(val === "true");
                  }}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {inBand === null ? (
                    <span className="text-gray-400 italic">
                      Not yet selected — why not add this?
                    </span>
                  ) : inBand ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Looking For
              </label>
              {isEditing ? (
                <input
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.lookingFor ? (
                    profileInfo.lookingFor
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Availability
              </label>
              {isEditing ? (
                <input
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.availability ? (
                    profileInfo.availability
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {user.role === "band" && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Band Members
              </label>
              {isEditing ? (
                <div className="mt-2 space-y-1">
                  {allMusicians.map((musician) => (
                    <label
                      key={musician._id}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        value={musician._id}
                        checked={members.includes(musician._id)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMembers((prev) =>
                            e.target.checked
                              ? [...prev, value]
                              : prev.filter((id) => id !== value)
                          );
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span>{musician.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo.members && profileInfo.members.length > 0 ? (
                    profileInfo.members
                      .filter((m) => m && m.name)
                      .map((m) => (
                        <div key={m._id}>
                          <Link
                            to={`/users/${m._id}`}
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {m.name}
                          </Link>
                        </div>
                      ))
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?
                    </label>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Genres
              </label>
              {isEditing ? (
                <input
                  value={bandGenres}
                  onChange={(e) => setBandGenres(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.bandGenres ? (
                    profileInfo.bandGenres
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Looking For
              </label>
              {isEditing ? (
                <input
                  value={bandLookingFor}
                  onChange={(e) => setBandLookingFor(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.bandLookingFor ? (
                    profileInfo.bandLookingFor
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {user.role === "venue" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              {isEditing ? (
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                  required
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.address ? (
                    profileInfo.address
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                How much do you pay and what for?
              </label>
              {isEditing ? (
                <input
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                  required
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.pay ? (
                    profileInfo.pay
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Do you give lodging?
              </label>
              {isEditing ? (
                <select
                  value={typeof lodging === "boolean" ? String(lodging) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setLodging(null);
                    else setLodging(val === "true");
                  }}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {lodging === null ? (
                    <span className="text-gray-400 italic">
                      Not yet selected — why not add this?
                    </span>
                  ) : lodging ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                What's your max capacity?
              </label>
              {isEditing ? (
                <input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  type="number"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.capacity ? (
                    profileInfo.capacity
                  ) : (
                    <label className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </label>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <div className="pt-6 flex justify-evenly space-x-4">
          <button
            onClick={deleteUser}
            className="w-40 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
          >
            Delete Profile
          </button>
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="w-40 text-black font-medium px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-40 px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-40 px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Made with ❤️ by MusicMeet Team</p>
        <Link to="/about" className="underline">
          Learn more about us
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
