import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/Images/img2.jpeg";

const Home = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image with Blue Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-blue-800 opacity-70"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full md:w-7/12 mx-8 mt-10 md:mx-32 flex flex-col items-start justify-center h-full">
        {/* Text Content */}
        <div className="text-white font-inter">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
             Track. Trade. Triumph!
          </h1>
          <p className="text-md md:text-lg opacity-80 mb-8">
          Master your investments effortlessly. Track and tweak a sleek stock portfolio tailored for smart decisions.Take charge of your financial future with Nivesto—India’s go-to portfolio tracker.
          </p>
          <div className="space-x-4">
            <Link to="/login">
              <button className="bg-blu text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blu text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
