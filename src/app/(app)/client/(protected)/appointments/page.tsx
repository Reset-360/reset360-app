import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Appointments',
};

const AppointmentPage = () => {
  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl font-main font-bold text-gray-800 mb-4">
        Appointments
      </h2>
    </div>
  )
}

export default AppointmentPage