import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-gray-50">
      <Sidebar />
      <main className="min-h-screen">
        <header className="h-14 border-b border-gray-200 bg-white/80 backdrop-blur flex items-center px-4 sticky top-0 z-10">
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default DashboardLayout;
