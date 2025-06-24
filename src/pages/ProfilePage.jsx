import { useContext } from "react";

import { AuthContext } from "../context/auth.context";


function ProfilePage () {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="ProfileDetails">
      {user && (
        <>
          <h1>Username: {user.name}</h1>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}

export default ProfilePage;