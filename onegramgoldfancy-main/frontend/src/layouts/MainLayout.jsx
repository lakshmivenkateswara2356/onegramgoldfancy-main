import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footernavigations from "../Footernavigations";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Padding bottom for fixed footer */}
      <main className="mb-[60px]">
        <Outlet />
      </main>
      <Footernavigations />
    </>
  );
};

export default MainLayout;
