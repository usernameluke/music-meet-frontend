import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">About MusicMeet</h1>

      <div className="max-w-3xl text-center space-y-6">
        <p className="text-lg">
          <strong>MusicMeet</strong> is a community tool for musicians, made by
          musicians. We're here to help you stay organised — not to take the
          spotlight. Whether you're looking to jam, start a band, promote a
          local gig, or plan a tour — we’ve built a space just for you. Plan it
          here, so you can promote it elsewhere.
        </p>

        <p className="text-lg">
          Our mission is to empower you to collaborate, share your passion, and
          perform together. From casual hobbyists to experienced professionals,
          MusicMeet helps bridge the gap between talent, venues, and
          opportunity.
        </p>

        <p className="text-lg">
          We believe in the power of live music and community. That’s why our
          platform makes it easy to find events, comment on performances, save
          your favourite shows you don’t want to miss, and connect with venues
          that bring the music to life.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <ul className="space-y-2 text-left mx-auto max-w-md">
            <li>
              <a
                href="https://github.com/usernameluke"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium  hover:text-purple-300"
              >
                🎸 Luke Gurel
              </a>{" "}
              – FullStack Developer & Shitty Guitarist
            </li>
            <li>
              <a
                href="https://miguel.nz/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium  hover:text-purple-300"
              >
                🎧 Miguel Garrido
              </a>{" "}
              – FullStack Developer & DJ
            </li>
            <li>
              <a
                href="https://www.aykutkav.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium  hover:text-purple-300"
              >
                🎤 Aykut Kav
              </a>{" "}
              – FullStack Developer & Vocalist
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <p className="text-lg">
            Have ideas or feedback? We’d love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 px-6 py-2 bg-white text-purple-800 font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
