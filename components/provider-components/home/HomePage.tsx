import React from 'react';
import { DollarSign, Ticket, Building } from 'lucide-react';

// Mock data (replace with actual data fetching logic)
const commonReport = {
  cash: {
    totalMoneyCollected: 100000,
    totalMoneyPaid: 75000,
    totalMoneyToBePaid: 15000,
    remainingCash: 10000,
    netCash: 25000,
  },
  ticket: {
    totalCount: 1000,
    cancelledCount: 50,
    activeCount: 800,
    paidCount: 700,
    winnerCount: 200,
    loserCount: 500,
  },
};

const generalStats = {
  activeBranchesCount: 10,
  inactiveBranchesCount: 2,
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 w-full">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-gray-800 mb-4">{children}</h2>
);

// New mock data for top performers
const topCashiers = [
    { fullName: "John Doe",  totalCollected: 50000 },
    { fullName: "Jane Smith", totalCollected: 45000 },
    { fullName: "Bob Johnson", totalCollected: 40000 },
    { fullName: "Alice Brown", totalCollected: 38000 },
    { fullName: "Charlie Davis",  totalCollected: 35000 },
  ];
  
  const topBranches = [
    { name: "Main Street",  totalCollected: 150000 },
    { name: "Downtown", totalCollected: 140000 },
    { name: "Westside",  totalCollected: 130000 },
    { name: "Eastside",  totalCollected: 120000 },
    { name: "Northend",  totalCollected: 110000 },
  ];

  const Table = ({ title, data, columns }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value : any, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof value === 'number' ? value.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
    

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <main className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            title="Total Money Collected" 
            value={`$${commonReport.cash.totalMoneyCollected.toLocaleString()}`}
            icon={<DollarSign className="text-green-500" size={24} />}
          />

<Card 
            title="Total Money Collected" 
            value={`$${commonReport.cash.totalMoneyPaid.toLocaleString()}`}
            icon={<DollarSign className="text-orange-500" size={24} />}
          />

          <Card 
            title="Revenue" 
            value={`$${commonReport.cash.netCash.toLocaleString()}`}
            icon={<DollarSign className="text-blue-500" size={24} />}
          />
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <SectionTitle>Cash Report</SectionTitle>
            <div className="space-y-4">
              <p><strong>Total Money Paid:</strong> ${commonReport.cash.totalMoneyPaid.toLocaleString()}</p>
              <p><strong>Total Money To Be Paid:</strong> ${commonReport.cash.totalMoneyToBePaid.toLocaleString()}</p>
              <p><strong>Remaining Cash:</strong> ${commonReport.cash.remainingCash.toLocaleString()}</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <SectionTitle>Ticket Report</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Cancelled:</strong> {commonReport.ticket.cancelledCount}</p>
              <p><strong>Active:</strong> {commonReport.ticket.activeCount}</p>
              <p><strong>Paid:</strong> {commonReport.ticket.paidCount}</p>
              <p><strong>Winners:</strong> {commonReport.ticket.winnerCount}</p>
              <p><strong>Losers:</strong> {commonReport.ticket.loserCount}</p>
            </div>
          </section>
        </div>

        <section className="mt-8 bg-white rounded-lg shadow-md p-6">
          <SectionTitle>Branch Statistics</SectionTitle>
          <div className="flex w-full gap-2 flex-wrap justify-around">
            <Card 
              title="Active Branches" 
              value={generalStats.activeBranchesCount}
              icon={<Building className="text-green-500" size={24} />}
            />
            <Card 
              title="Inactive Branches" 
              value={generalStats.inactiveBranchesCount}
              icon={<Building className="text-red-500" size={24} />}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Table 
            title="Top 5 Performing Cashiers"
            data={topCashiers}
            columns={["Full Name",  "Total Collected"]}
          />
          <Table 
            title="Top 5 Performing Branches"
            data={topBranches}
            columns={["Branch Name", "Total Collected"]}
          />
        </div>
      </main>
    </div>
  );
}