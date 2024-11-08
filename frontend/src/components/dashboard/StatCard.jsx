
export const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);