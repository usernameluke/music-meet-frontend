import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import { AuthContext } from "./context/auth.context";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage"
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { useContext } from "react";

function App() {
  const { isLoading } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />

      {isLoading ? (
        <div>LOADING .......!!!!!!!</div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route path="/contact" element={<ContactPage />} />

            <Route
              path="/signup"
              element={
                <IsAnon>
                  {" "}
                  <SignupPage />{" "}
                </IsAnon>
              }
            />

            <Route
              path="/login"
              element={
                <IsAnon>
                  {" "}
                  <LoginPage />{" "}
                </IsAnon>
              }
            />

            <Route
              path="/users/:userId"
              element={
                <IsPrivate>
                  <ViewProfilePage />
                </IsPrivate>
              }
            />

            <Route
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />

            <Route
              path="/events"
              element={
                <IsPrivate>
                  {" "}
                  <EventListPage />{" "}
                </IsPrivate>
              }
            />

            <Route
              path="/events/:eventId"
              element={
                <IsPrivate>
                  {" "}
                  <EventDetailsPage />{" "}
                </IsPrivate>
              }
            />

            <Route
              path="/events/edit/:eventId"
              element={
                <IsPrivate>
                  {" "}
                  <EditEventPage />{" "}
                </IsPrivate>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
