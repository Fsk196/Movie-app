// Form.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { showId } = useParams();
  const [showName, setShowName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        setShowName(data.name);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    setError("");

    const userDetails = {
      name,
      email,
      showId,
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    setFormSubmitted(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center my-10">
        <div>
          <h2 className="text-2xl font-medium">
            Ticket of:{" "}
            <span className="font-normal text-orange-500">{showName}</span>
          </h2>
          {formSubmitted ? (
            <div className="flex justify-center my-10">
              <p className="text-4xl text-orange-500">
                Ticket booked successfully! Redirecting to the home page...
              </p>
            </div>
          ) : (
            <div className="my-10 border-2 sm:px-6 px-4 py-10 border-orange-500 rounded-xl">
              <form onSubmit={handleSubmit}>
                <label className="text-xl">
                  Name:
                  <input
                    className="border-orange-500 border-2 rounded-md mx-4 my-3 px-3 py-2 focus:outline-none"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <br />
                <label className="text-xl">
                  Email:
                  <input
                    className="border-orange-500 border-2 rounded-md mx-4 my-3 px-3 py-2 focus:outline-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <div className="flex justify-center">
                  <button
                    className="bg-orange-500 px-4 py-2 text-xl text-white rounded-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
