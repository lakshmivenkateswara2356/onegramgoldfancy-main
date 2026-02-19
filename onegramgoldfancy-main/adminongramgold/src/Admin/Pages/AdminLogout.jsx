import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 w-24 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default AdminLogout;
