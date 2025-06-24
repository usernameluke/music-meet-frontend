import { Link } from "react-router-dom";

function EventCard({ title, description, _id }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all">
      <Link to={`/events/${_id}`}>
        <h3 className="text-lg font-semibold text-purple-700 hover:underline mb-1">
          {title}
        </h3>
      </Link>
      <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
    </div>
  );
}

export default EventCard;
