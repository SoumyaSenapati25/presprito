import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  // const doctors = doctors;

  // Memoized filterDoc to optimize performance
  const filterDoc = useMemo(() => {
    return speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : doctors;
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the Doctors Specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Sidebar with Specialties */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden lg:flex"}`}>
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() => navigate(speciality === spec ? "/doctors" : `/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
              key={item._id}
            >
              <img
                className="bg-blue-100 w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-red-400"}`}
                >
                  <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-red-500"} rounded-full`}></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
