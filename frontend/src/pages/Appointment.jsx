import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  let token = localStorage.getItem("token")

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoctor = doctors.find(doc => doc._id === docId);
      if (foundDoctor) setDocInfo(foundDoctor);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      generateAvailableSlots();
    }

    return () => {
      setDocSlots([]);
      setSlotTime('');
      setSlotIndex(0);
    };
  }, [docInfo]);

  const generateAvailableSlots = () => {
    const today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.toDateString() === currentDate.toDateString()) {
        let now = new Date();
        let nextHour = now.getHours() >= 20 ? 10 : now.getHours() + 1;
        currentDate.setHours(Math.max(10, nextHour));
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const slotDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const isSlotBooked = docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    if (!docSlots[slotIndex]?.length || !slotTime) {
      return toast.warn('Please select a valid time slot.');
    }

    const selectedDate = docSlots[slotIndex][0].datetime;
    const slotDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            token: `${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while booking.');
    }
  };

  if (!docInfo) return <p className="text-center text-gray-500">Loading doctor details...</p>;

  return (
    <div className="px-4">
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img className="w-full sm:max-w-72 rounded-lg bg-primary" src={docInfo.image} alt={docInfo.name} />
        <div className="flex-1 border rounded-lg bg-gray-200 p-6">
          <p className="flex items-center gap-2 text-2xl font-medium text-blue-900">
            {docInfo.name}
            <img className="w-4" src={assets.verified_icon} alt="Verified" />
          </p>
          <p className="text-sm text-gray-600 mt-1">{docInfo.degree} - {docInfo.speciality}</p>
          <p className="text-xs bg-white text-gray-500 rounded-full px-3 py-1 inline-block mt-2 shadow">{docInfo.experience}</p>
          <div className="mt-3">
            <p className="font-semibold text-sm text-gray-800">About</p>
            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-4 text-gray-800 font-medium">
            Appointment Fee: <span className="text-gray-600">{currencySymbol} {docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Slot Booking */}
      <div className="sm:ml-72 mt-6">
        <p className="font-semibold text-gray-700 mb-2">Booking Slots</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center min-w-16 py-4 px-3 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border'}`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light py-2 px-5 rounded-full cursor-pointer ${
                slotTime === item.time ? 'bg-primary text-white' : 'text-gray-500 border border-gray-600'
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-primary text-white px-8 py-3 rounded-full mt-6 text-sm"
        >
          Book an Appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
