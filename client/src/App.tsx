import { Outlet } from "react-router-dom";
import AccountSwitcher from "./features/account/components/AccountSwitcher";
import { Sidebar } from "./layout/Sidebar";
import { UserNav } from "./features/profile/components/UserNav";
import logo from "./assets/logo.png";
import { MainNav } from "./layout/MainNav";

function App() {
  return (
    <div className="md:flex-col md:flex col-span-3 lg:col-span-5 lg:border-l px-7 md:px-14">
      {/* Navbar */}
      <div className="border-b">
        <div className="flex h-16 items-center px-7 md:px-14">
          <img src={logo} alt="Expenze Logo" className=" w-40 my-4" />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <AccountSwitcher />
            <UserNav />
          </div>
        </div>
      </div>
      {/* Renders the nested route components */}
      <Outlet />
    </div>
  );
}

export default App;
