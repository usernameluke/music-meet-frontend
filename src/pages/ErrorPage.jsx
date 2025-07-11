import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-purple-900 px-4 text-white">
      <img
        src="/404.png"
        alt="404 Not Found"
        className="w-80 max-w-full mb-8 drop-shadow-lg"
      />
      <h1 className="text-3xl font-bold mb-4">Oops! Page not found</h1>
      <p className="mb-6 text-lg text-gray-200 text-center max-w-md">
        Looks like this has turned into an unplugged session! Sorry!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-purple-800 font-semibold rounded-xl hover:bg-gray-100 transition duration-200"
      >
        Go back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
