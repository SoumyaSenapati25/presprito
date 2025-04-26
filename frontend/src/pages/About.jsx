import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="flex flex-col items-center text-gray-800 py-16 px-6 sm:px-16 bg-gray-50">

      {/* Heading Section */}
      <section aria-label="About Prescripto">
        <div className="text-center text-3xl font-semibold text-gray-700 mb-6">
          <h2 className="relative inline-block">
            ABOUT <span className="text-blue-800">US</span>
            <span className="absolute left-0 bottom-[-3px] w-full h-[3px] bg-blue-500 rounded"></span>
          </h2>
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="flex flex-col md:flex-row gap-12 items-center max-w-6xl w-full">
        {/* About Us Image */}
        <img 
          className="w-full sm:w-1/2 rounded-xl shadow-md md:max-w-[400px]" 
          src={assets.about_image} 
          alt="About Us" 
        />

        {/* Text Content */}
        <div className="flex flex-col justify-center gap-6 md:w-3/5 text-gray-700 text-[16px] leading-relaxed">
          <p>
            At <strong>Prescripto</strong>, we believe that healthcare should be simple, accessible, and hassle-free. 
            Our mission is to revolutionize the way people connect with doctors, ensuring seamless appointment 
            scheduling and efficient health record management.
          </p>

          <p>
            With a commitment to innovation, <strong>Prescripto</strong> harnesses the power of technology to bring 
            patients and healthcare providers closer than ever. Whether you need a routine check-up or specialized 
            medical care, our platform empowers you to take control of your health with ease.
          </p>

          {/* Vision Box */}
          <div className="bg-blue-100 p-4 rounded-md border-l-4 border-blue-500">
            <strong className="text-lg text-blue-900">Our Vision:</strong>
            <p>
              Our vision is to build a world where healthcare is just a click away. We strive to eliminate long 
              waiting times and complex appointment processes, making high-quality medical care accessible to 
              everyone, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-5xl mt-16" aria-label="Why Choose Prescripto">
        <div className="text-2xl text-center font-semibold text-gray-700">
          <h2>Why <span className="text-blue-800">Choose Us?</span></h2>
        </div>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
          {[
            { title: "Efficiency", desc: "Streamlined appointment scheduling that fits into your busy lifestyle." },
            { title: "Convenience", desc: "Access to a network of trusted healthcare professionals in your area." },
            { title: "Personalization", desc: "Tailored recommendations and reminders to help you stay on top of your health." }
          ].map((item, index) => (
            <div 
              key={index} 
              className="border px-8 md:px-12 py-8 sm:py-12 flex flex-col gap-3 text-center text-[15px] 
              hover:bg-blue-800 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg shadow-md"
            >
              <strong className="text-lg">{item.title}:</strong>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
