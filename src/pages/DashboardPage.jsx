import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";
function DashboardPage() {

  return (

    <div>

    <Navbar />

    <div className="flex">
      <Sidebar />

      <div className="p-10">

      <h1 className="text-4xl font-bold">
        Dashboard Page
      </h1>

    </div>
    </div>
    </div>
  );
}

export default DashboardPage;