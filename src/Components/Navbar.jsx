import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showLogout, setShowLogout] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (openDialog) {
      document.body.classList.add("overflow-hidden"); // Prevent scrolling when modal is open
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openDialog]);

  const login = useGoogleLogin({
    scope: 'profile email',
    onSuccess: (codeResp) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResp.access_token}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
          setOpenDialog(false);
        })
        .catch(error => console.error("Error fetching user profile:", error));
    },
    onError: (error) => console.error("Google login error:", error),
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 relative bg-white z-50">
      {/* Logo */}
      <img className="h-16" src="/logo.svg" alt="Logo" />

      {/* User Section */}
      <div className="relative">
        {user ? (
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={user?.picture || 'https://via.placeholder.com/150'}
                alt="User"
                className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow"
              />
              <span className="font-medium">{user?.name}</span>
            </div>

            {/* Logout Dropdown */}
            {showLogout && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 p-3">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setOpenDialog(true)}
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-transform hover:scale-105"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Google Sign-in Dialog */}
      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div 
            className="bg-white p-6 rounded-xl shadow-xl text-center w-96 transform transition-all scale-95 animate-fade-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold text-gray-900">Sign in to Continue</h2>
            <p className="mt-2 text-gray-600 text-sm">
              You need to sign in with Google to generate a trip plan.
            </p>

            <div className="mt-5 flex flex-col items-center space-y-4">
              <button
                onClick={login}
                className="flex items-center justify-center gap-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-full text-lg px-6 py-3 transition-transform hover:scale-105 shadow-md"
              >
                <FcGoogle size={24} /> Sign in With Google
              </button>

              <button
                className="text-red-500 font-medium hover:underline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
