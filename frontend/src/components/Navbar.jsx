import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // const { token, setToken } = useContext(AppContext);
  let [token,setToken] =useState(localStorage.getItem("token"))
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const logout = () => {
    setToken("");
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  const loadUserProfileData = async () => {
    setLoading(true); // Set loading state true when starting to load user data
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading state to false after data is fetched
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt='Logo'
      />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <li>
          <NavLink
            to='/'
            className="nav-link"
            style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}
          >
            HOME
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                bottom: '0',
                left: '0',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease-out',
              }}
              className="underline-effect"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/doctors'
            className="nav-link"
            style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}
          >
            ALL DOCTORS
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                bottom: '0',
                left: '0',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease-out',
              }}
              className="underline-effect"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            className="nav-link"
            style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}
          >
            ABOUT
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                bottom: '0',
                left: '0',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease-out',
              }}
              className="underline-effect"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/contact'
            className="nav-link"
            style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}
          >
            CONTACT
            <span
              style={{
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                bottom: '0',
                left: '0',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s ease-out',
              }}
              className="underline-effect"
            />
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            {loading ? (
              <div>Loading...</div> // Show loading text or spinner while fetching user data
            ) : (
              <>
                <img
                  className='w-8 h-8 rounded-full object-cover'
                  src={userData.image}
                  alt='User Profile'
                />
                <img
                  className='w-2.5'
                  src={assets.dropdown_icon}
                  alt='Dropdown Icon'
                />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>
                      My Profile
                    </p>
                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>
                      My Appointments
                    </p>
                    <p onClick={()=>logout()} className='hover:text-black cursor-pointer'>
                      Logout
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={()=>navigate("/login")}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt='Menu Icon'
        />

        {/* ===== Mobile menu ===== */}
        <div
          className={`${
            showMenu ? 'fixed w-full' : 'h-0 w-0'
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt='Logo' />
            <img
              className='w-7'
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt='Close Menu Icon'
            />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <li>
              <NavLink onClick={() => setShowMenu(false)} to='/'>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                ALL DOCTORS
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShowMenu(false)} to='/about'>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
