import Sidebar from "./components/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white text-black">
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
