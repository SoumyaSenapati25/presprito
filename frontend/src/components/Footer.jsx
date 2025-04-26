import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ----- Left section ----- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Prescripto Logo" />
          <p className='w-full md:w-2/3 text-gray-700 leading-6'>
            Your health, your convenience. Easily find expert doctors and schedule appointments in just a few clicks.
          </p>
        </div>

        {/* ----- Center section ----- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href="/" className='hover:text-primary transition-colors'>Home</a></li>
            <li><a href="/about" className='hover:text-primary transition-colors'>About Us</a></li>
            <li><a href="/contact" className='hover:text-primary transition-colors'>Contact Us</a></li>
            <li><a href="/privacy-policy" className='hover:text-primary transition-colors'>Privacy Policy</a></li>
          </ul>
        </div>

        {/* ----- Right section ----- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-700'>
            <li><a href="tel:7751892649" className='hover:text-primary transition-colors'>7751892649</a></li>
            <li><a href="mailto:soumyasenapati25@gmail.com" className='hover:text-primary transition-colors'>soumyasenapati25@gmail.com</a></li>
          </ul>
        </div>

      </div>

      {/* ---- Copyright ---- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright © 2025 <span className="font-medium text-black">Prescripto</span> - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
