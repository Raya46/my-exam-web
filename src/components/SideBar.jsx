import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarComponent = ({ title, icon, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)} // Replace "${path}" with "path"
      className={`${
        isActive
          ? "bg-white text-blue-800 font-semibold px-4 "
          : "bg-none text-white font-medium hover:bg-white/15 "
      } rounded-md flex items-center px-4 py-2 gap-2`}
    >
      {/* <PieChart
          color={`${isActive ? '#1d4ed8' : '#ffffff'}`}
        /> */}
      <i className={`fa-solid ${icon}`}></i>
      <p className={`${isActive ? "font-semibold" : "font-medium"} text-base`}>
        {title}
      </p>
    </button>
  );
};

export default SidebarComponent;
