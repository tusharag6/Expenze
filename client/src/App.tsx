import { Outlet } from "react-router-dom";
import AccountSwitcher from "./components/AccountSwitcher";
import { Sidebar } from "./components/Sidebar";
import { UserNav } from "./components/UserNav";

function App() {
  return (
    <div className="grid lg:grid-cols-6">
      {/* Sidebar */}
      <Sidebar className="hidden lg:block" />

      <div className="md:flex-col md:flex col-span-3 lg:col-span-5 lg:border-l">
        {/* Navbar */}
        <div className="border-b">
          <div className="flex h-16 items-center px-7 md:px-14">
            <h1 className="text-3xl font-bold tracking-tight ">Expenze</h1>
            {/* <MainNav className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              <AccountSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
        {/* Renders the nested route components */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
