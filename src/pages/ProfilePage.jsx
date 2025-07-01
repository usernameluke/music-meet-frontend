import userService from "../services/users.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  const getProfile = () => {
    // Send the token through the request "Authorization" Headers
    userService
      .getProfile()
      .then((response) => {
        console.log(response.data);
        const oneProfile = response.data;
        const { instagram, youtube, website } = oneProfile;
        setProfileInfo(oneProfile);
        setBio(oneProfile.bio);
        setSocialLinks( (prev) => ({ ...prev, instagram, youtube, website }));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);

  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    youtube: "",
    website: "",
  });
  const changeSocial = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [instruments, setInstruments] = useState(
    profileInfo?.instruments || ""
  );
  const [genres, setGenres] = useState(profileInfo?.genres || "");
  const [experienceLevel, setExperienceLevel] = useState(
    profileInfo?.experienceLevel || ""
  );

  const [inBand, setInBand] = useState(
    profileInfo?.inBand === undefined ? null : profileInfo.inBand
  );
  const [lookingFor, setLookingFor] = useState(profileInfo?.lookingFor || "");
  const [availability, setAvailability] = useState(
    profileInfo?.availability || ""
  );

  const [bandName, setBandName] = useState(profileInfo?.bandName || "");
  const [members, setMembers] = useState(profileInfo?.members || "");
  const [bandGenres, setBandGenres] = useState(profileInfo?.bandGenres || "");
  const [bandLookingFor, setBandLookingFor] = useState(
    profileInfo?.bandLookingFor || ""
  );

  const [venueName, setVenueName] = useState(profileInfo?.venueName || "");
  const [address, setAddress] = useState(profileInfo?.address || "");
  const [capacity, setCapacity] = useState(profileInfo?.capacity || "");
  const [website, setWebsite] = useState(profileInfo?.website || "");

  const handleSave = () => {
    const commonData = { bio, socialLinks };
    let roleData = {};

    if (user.role === "musician") {
      roleData = {
        instruments,
        genres,
        experienceLevel,
        // convert null to false if needed before sending
        inBand: inBand === null ? false : inBand,
        lookingFor,
        availability,
      };
    } else if (user.role === "band") {
      roleData = { bandName, members, bandGenres, bandLookingFor };
    } else if (user.role === "venue") {
      roleData = { venueName, address, capacity, website };
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

  //console.log("user:", user);

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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Media / Website
          </label>
          {isEditing ? (
            <div className="mt-1 w-full border rounded-md px-3 py-2 text-sm">
              <label>Instagram</label>
              <input value={socialLinks.instagram} onChange={changeSocial} />

              <label>YouTube</label>
              <input value={socialLinks.youtube} onChange={changeSocial} />

              <label>Website</label>
              <input value={socialLinks.website} onChange={changeSocial} />
            </div>
          ) : (
            <div className="mt-1 text-sm text-gray-800">
              <>
                <span className="font-bold">
                  Instagram:{" "}
                  {profileInfo?.socialLinks.instagram ? (
                    profileInfo.socialLinks.instagram
                  ) : (
                    <span className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </span>
                  )}
                </span>
                <br />
              </>

              <>
                <span className="font-bold">
                  YouTube:{" "}
                  {profileInfo?.socialLinks.youtube ? (
                    profileInfo.socialLinks.youtube
                  ) : (
                    <span className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </span>
                  )}
                </span>
                <br />
              </>
              <>
                <span className="font-bold">
                  WebSite:{" "}
                  {profileInfo?.socialLinks.website ? (
                    profileInfo.socialLinks.website
                  ) : (
                    <span className="text-gray-400 italic">
                      Not yet selected — why not add this?{" "}
                    </span>
                  )}
                </span>
                <br />
              </>
            </div>
          )}
        </div>
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
                  value={inBand === null ? "" : inBand.toString()}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Band Name
              </label>
              {isEditing ? (
                <input
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.bandName ? (
                    profileInfo.bandName
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
                Members
              </label>
              {isEditing ? (
                <input
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.members ? (
                    profileInfo.members
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
                Venue Name
              </label>
              {isEditing ? (
                <input
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                />
              ) : (
                <div className="mt-1 text-sm text-gray-800">
                  {profileInfo?.venueName ? (
                    profileInfo.venueName
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
                Address
              </label>
              {isEditing ? (
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
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
                Capacity
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
            </div>
          </>
        )}
        <div className="pt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800"
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
