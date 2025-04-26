import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl,  getDoctorsData } = useContext(AppContext);
  const token = localStorage.getItem("token")
  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // Refresh appointments list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments(); // Refresh appointments list
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message); // Handle case where Razorpay order creation fails
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Handle network/API error
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments(); // Fetch appointments when token is set
    }
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="flex flex-col gap-4">
        {appointments.map((item) => (
          <div
            className="grid grid-cols-[1fr_2fr] sm:flex sm:gap-6 py-4 border-b items-center"
            key={item._id} // Use unique identifier for key
          >
            {/* Doctor Image */}
            <div>
              <img
                className="w-32 rounded-lg bg-indigo-100"
                src={item.doctorData.image}
                alt="Doctor"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-lg font-semibold text-zinc-800">
                {item.doctorData.name}
              </p>
              <p className="text-indigo-600">{item.doctorData.speciality}</p>
              <p className="mt-1 text-xs text-gray-500">Address:</p>
              <p>{item.doctorData.address.line1}</p>
              <p>{item.doctorData.address.line2}</p>
              <p className="mt-2 text-sm">
                <span className="font-medium text-zinc-700">Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border-green-400 rounded text-green-500">
                  Payment Done
                </button>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-500"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border-red-400 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}

              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
