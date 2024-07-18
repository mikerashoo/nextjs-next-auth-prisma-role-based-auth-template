import React from 'react';

const MobileFirstTable = ({ data }) => {
  // Assuming data is an array of objects with consistent keys
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`} className="p-2 whitespace-nowrap text-sm text-gray-500">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileFirstTable;