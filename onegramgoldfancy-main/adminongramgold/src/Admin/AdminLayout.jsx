import AdminSidebar from "./Components/AdminSidebar";
import AdminNavbar from "./Components/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-100">
    <AdminSidebar />
    <div className="flex-1 flex flex-col">
      <AdminNavbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
