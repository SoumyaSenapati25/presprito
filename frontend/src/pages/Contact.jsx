import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-gray-800 py-16 px-6 sm:px-16 bg-gray-50">
      
      {/* Heading Section */}
      <div className="text-center text-3xl font-semibold text-gray-700 mb-6 relative">
        <h2 className="inline-block">
          CONTACT <span className="text-blue-800">US</span>
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-4/5 h-[3px] bg-blue-500 rounded"></span>
        </h2>
      </div>

      {/* Content Section (Image + Contact Details) */}
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl w-full">
        
        {/* Contact Image */}
        <img 
          className="w-full sm:w-1/2 rounded-xl shadow-md md:max-w-[400px]" 
          src={assets.contact_image} 
          alt="Illustration representing customer support" 
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-6 md:w-3/5 text-gray-700 text-[16px] leading-relaxed">
          
          {/* Office Location */}
          <div className="bg-gray-100 p-4 rounded-md border-l-4 border-gray-400">
            <b className="text-lg text-gray-900">Our Office</b>
            <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-100 p-4 rounded-md border-l-4 border-gray-400">
            <b className="text-lg text-gray-900">Get in Touch</b>
            <p>
              📞 Phone: <a href="tel:+917751892649" className="text-blue-700 hover:underline">+91-7751892649</a>
            </p>
            <p>
              ✉️ Email: <a href="mailto:soumyasenapati25@gmail.com" className="text-blue-700 hover:underline">soumyasenapati25@gmail.com</a>
            </p>
          </div>

          {/* Careers */}
          <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-500">
            <b className="text-lg text-blue-900">Careers at PRESCRIPTO</b>
            <p>Learn more about our teams and job openings.</p>

            {/* Navigate to Careers Page */}
            <button
              onClick={() => navigate('/careers')}
              className="mt-3 bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-all"
            >
              Explore Jobs
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Contact;
