import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="bg-green-900 max-w-full drop-shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="ml-10 px-2 max-w-full sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="">
            <Link to="/" className="text-white text-2xl font-semibold">Blog Website</Link>
          </div>
          <nav className="flex space-x-4">
            {userInfo && userInfo.username ? (
              <>
                <div className="text-gray-300 rounded-md px-3 py-2 text-md font-serif"> Hi {username}</div>
                <Link to="/create" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Create new post
                </Link>
                <a onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
