import React from 'react';

function Footer({trip}) {
  return (
    <footer className= "bg-teal-600 text-white py-4 mt-8 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} TripOn. All rights reserved.
      </p>
      <div className="mt-2">
        <a href="/privacy" className="text-sm text-gray-400 hover:text-white mx-2">Privacy Policy</a>
        <a href="/terms" className="text-sm text-gray-400 hover:text-white mx-2">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
