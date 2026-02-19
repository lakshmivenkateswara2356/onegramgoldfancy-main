import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Orders", "/admin/orders"],
  ["Customers", "/admin/customers"],
  ["Banners", "/admin/banners"],
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== MOBILE ARROW BUTTON ===== */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-1/2 left-0 -translate-y-1/2 z-50 bg-black text-white p-2 rounded-r-lg shadow-lg"
      >
        {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* ===== OVERLAY (OPTIONAL) ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed md:static top-0 left-0 h-full 
        w-56 md:w-64 bg-black text-white p-5 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <h1 className="text-lg font-bold mb-6">OneGram Admin</h1>

        {/* Navigation */}
        <nav className="space-y-2 text-sm">
          {links.map(([name, path]) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-yellow-400 text-black font-semibold"
                    : "hover:bg-white/10"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
