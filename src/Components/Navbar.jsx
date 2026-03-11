import { Navbar as HeroUiNavbar, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarBrand, NavbarContent, NavbarItem, DropdownSection } from '@heroui/react'
import { useContext} from 'react';
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../contexts/authContext';

export default function Navbar() {

  const { userData, setUserToken } = useContext(authContext);

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
  }

  return (
    <HeroUiNavbar>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-text-dark">CIRCLE</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="gap-1 h-12 px-2 rounded-2xl border border-purple-300 bg-purple-100" justify="center">
        <NavLink to="/">
          {({ isActive }) => (
            <NavbarItem className={`flex items-center gap-2 hover:h-10 hover:px-3 hover:rounded-2xl hover:bg-purple-75 ${isActive ? "h-10 px-3 rounded-2xl bg-purple-75" : "px-3"}`}>
              <svg className={`${isActive ? "text-active" : "text-text-dark"} lucide lucide-house`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span className={`hidden sm:flex text-small ${isActive ? "text-active font-semibold" : "text-text-dark"}`}>Feed</span>
            </NavbarItem>
          )}
        </NavLink>
        <NavLink to="/profile">
          {({ isActive }) => (
            <NavbarItem className={`flex items-center gap-2 hover:h-10 hover:px-3 hover:rounded-2xl hover:bg-purple-75 ${isActive ? "h-10 px-3 rounded-2xl bg-purple-75" : "px-3"}`}>
              <svg className={`${isActive ? "text-active" : "text-text-dark"} lucide lucide-user`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className={`hidden sm:flex text-small ${isActive ? "text-active font-semibold" : "text-text-dark"}`}>Profile</span>
            </NavbarItem>
          )}
        </NavLink>
      </NavbarContent>

      {<NavbarContent as="div" justify="end">
        { <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="flex items-center gap-2 py-2 px-3 rounded-full border border-purple-300 bg-purple-100">
              <Avatar
                isBordered
                className="transition-transform"
                name={userData?.name}
                size="sm"
                color='secondary'
                src={userData?.photo}
              />
              <span className='hidden md:flex text-sm ml-1'>{userData?.name}</span>

              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu text-slate-500" aria-hidden="true">
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="gap-2 text-text-dark data-[hover=true]:text-text-dark data-[hover=true]:bg-purple-100">
              <Link to="/profile" className="flex w-full items-center gap-2 rounded-lg px-1 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user" aria-hidden="true">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem key="settings" className="gap-2 text-text-dark data-[hover=true]:text-text-dark data-[hover=true]:bg-purple-100">
              <Link to="/settings" className="flex w-full items-center gap-2 rounded-lg px-1 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings" aria-hidden="true">
                  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Settings
              </Link>
            </DropdownItem>
            <DropdownSection showDivider className='mb-1'/>
            <DropdownItem key="logout" className='text-red-500 data-[hover=true]:bg-red-100 data-[hover=true]:text-red-500' onClick={logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>}
      </NavbarContent>}
    </HeroUiNavbar>
  )
}
