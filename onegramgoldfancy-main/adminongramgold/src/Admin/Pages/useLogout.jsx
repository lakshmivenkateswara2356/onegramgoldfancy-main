import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/admin/login"); // redirect to login
  };

  return logout;
};

export default useLogout;
