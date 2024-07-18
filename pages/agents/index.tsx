import React from 'react'

function index() {
  return (  
    <table className="min-w-full border divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th
          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
        >
          Name
        </th>
        <th
          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
        >
          Role
        </th>
        
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          John Doe
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          Developer
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          Jane Smith
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          Designer
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default index