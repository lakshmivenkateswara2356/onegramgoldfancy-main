import { NavLink } from "react-router-dom";

const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Orders", "/admin/orders"],
  ["Customers", "/admin/customers"],
  
  ["Banners", "/admin/banners"],
 
];

const AdminSidebar = () => (
  <aside className="w-64 bg-black text-white p-5 hidden md:block">
    <h1 className="text-xl font-bold mb-6">OneGram Admin</h1>
    <nav className="space-y-3 text-sm">
      {links.map(([name, path]) => (
        <NavLink key={name} to={path} className="block hover:text-yellow-400">
          {name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
