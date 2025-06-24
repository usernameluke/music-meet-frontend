function HomePage() {
  return (
    <div className="min-h-screen bg-[url(/background.png)] bg-cover bg-center h-screen">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">

        <h1 className="text-4xl font-bold text-white mt-10 font-sans">
          MusicMeet
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-100 mb-70">
          Find musicians.<br></br>Join bands. Play live.
        </p>

        {/* Buttons (visible on mobile only if NavBar has them hidden) */}
        <div className="flex flex-col gap-4 w-full max-w-xs md:hidden">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-200">
            Sign Up
          </button>
          <button className="bg-white hover:bg-gray-100 text-purple-700 border border-purple-700 font-semibold py-3 px-6 rounded-xl transition duration-200">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
