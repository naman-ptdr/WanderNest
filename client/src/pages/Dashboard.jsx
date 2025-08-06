import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name} 👋
        </h1>
        <p className="text-lg text-gray-600 mb-6">Email: {user?.email}</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
