import React from "react";
import { Link } from "react-router-dom";

const Card = ({ show }) => {
  return (
    <div className="m-4">
      <div className="flex border-2 w-[500px] h-[300px] rounded-xl">
        {/* <img className='w-80 h-96' src={shows?.} alt="picture" /> */}
        {show.image && (
          <img
            className="rounded-s-xl"
            src={show?.image?.medium || "src/assets/default.jpg"}
            alt={show.name}
          />
        )}
        <div className="w-full rounded-r-lg

">
          <div className="flex justify-center items-center">
            <div>
                <h3 className="text-center font-semibold text-2xl text-black py-2 w-full ">
                    Show Info
                </h3>
                <h3 className="text-xl font-medium">Movie Name: <span className="text-orange-500">{show.name}</span></h3>
                <p className="text-lg text-black font-medium">Language: <span className="text-gray-500 font-normal">{show.language}</span></p>

                <p className="text-lg text-black font-medium">Rating: <span className="text-gray-500 font-normal">{show?.rating.average || "Null"}</span></p>

                <p className="text-lg text-black font-medium">Genres: <span className="text-gray-500 font-normal">{show?.genres}</span></p>

                <p className="text-lg text-black font-medium">Runtime: <span className="text-gray-500 font-normal">{show?.runtime}</span></p>

                <div className="text-center my-6">
                    <Link to={`/summary/${show.id}`} className="bg-orange-500 py-3 px-5 rounded-lg text-white">View Summary</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
