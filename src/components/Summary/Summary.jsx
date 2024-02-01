import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const removeHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

const Summary = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();

        data.summary = removeHtmlTags(data.summary);

        setShow(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShow();
  }, [showId]);

  return (
    <div className="container mx-auto sm:w-[70%] w-full h-4/5 my-20">
      <div className="flex justify-center items-center h-4/5 px-10">
        <div>
          {show ? (
            <div>
              <div className="flex justify-center">
                {show.image && (
                  <img
                    className="w-56"
                    src={show?.image?.medium || "src/assets/default.jpg"}
                    alt={show.name}
                  />
                )}
              </div>

              <div className="flex justify-center items-center p-10">
                <div>
                  <h2 className="text-center text-3xl sm:text-4xl font-semibold text-orange-500">
                    {show.name}
                  </h2>
                  <p className="text-xl sm:text-2xl italic">
                    <span className="font-semibold text-2xl sm:text-3xl underline decoration-orange-500 not-italic">
                      Summary:{" "}
                    </span>
                    {show.summary}
                  </p>
                  <div className="text-center my-6">
                    <Link to={`/form/${showId}`} className="bg-orange-500 px-4 py-2 rounded-md text-white text-xl">Book a Ticket</Link>

                  </div>
                </div>
              </div>

              {/* Display other show details here */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
