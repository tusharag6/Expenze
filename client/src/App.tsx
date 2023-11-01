import { Outlet } from "react-router-dom";
import AccountSwitcher from "./features/account/components/AccountSwitcher";
import { Sidebar } from "./layout/Sidebar";
import { UserNav } from "./features/profile/components/UserNav";
import logo from "./assets/logo.png";
import { Search } from "./components/Search";

function App() {
  return (
    <div className="grid lg:grid-cols-6">
      {/* Sidebar */}
      <Sidebar className="hidden lg:block" />
      <div className="md:flex-col md:flex col-span-3 lg:col-span-5 lg:border-l">
        {/* Navbar */}
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-8">
            <Search />
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
