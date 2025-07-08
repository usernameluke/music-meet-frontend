import { useState } from "react";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    console.log("Contact form submitted:", form);
    setSubmitted(true);

    // Optionally, reset the form
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      <div className="max-w-xl text-center space-y-4 mb-8">
        <p className="text-lg">
          Have a question, suggestion, or just want to say hi? We'd love to hear from you.
        </p>
        <p className="text-sm text-purple-200">
          We're musicians building for musicians — your feedback helps shape MusicMeet.
        </p>
      </div>

      {submitted ? (
        <p className="text-white text-lg font-medium mt-6">Thanks for reaching out! We'll be in touch soon. 🎵</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-purple-800 bg-opacity-30 p-6 rounded-xl shadow space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-purple-900 text-white placeholder-purple-300 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-purple-900 text-white placeholder-purple-300 focus:outline-none"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded-lg bg-purple-900 text-white placeholder-purple-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-purple-800 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;
