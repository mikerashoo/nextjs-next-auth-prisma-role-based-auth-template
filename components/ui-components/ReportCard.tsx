import React from 'react'



const ReportCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );


export default ReportCard