import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footernavigations from "../Footernavigations";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* Padding bottom for fixed footer */}
      <main className="pt-[0px] pb-[0px] sm:pb-[60px]">
        <Outlet />
      </main>
      <Footernavigations />
    </>
  );
};

export default MainLayout;
