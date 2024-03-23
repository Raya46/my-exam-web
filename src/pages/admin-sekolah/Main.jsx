import React from 'react';
import { PieChart } from 'react-ionicons'
import { useLocation, useNavigate } from 'react-router-dom';

function MainAdmin(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      await axios.post(
        `${BASE_API_URL}logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };
  return (
    <main className='flex flex-row w-full h-screen max-h-screen max-w-screen'>
      <div className='w-1/6 h-full bg-blue-800 py-8 px-4 items-center flex-col gap-4 flex'>
        
        <div className='flex justify-start w-full '>
          <h2 className='text-white text-3xl font-semibold'>ArohExam</h2>
        </div>
        <div className='w-full flex-col flex gap-2'>
          <SidebarComponent title="Dashboard" path='/admin-sekolah/dashboard' icon={"fa-chart-pie"} />
          <SidebarComponent title="Link" path='/admin-sekolah/link' icon={"fa-link"} />
          <SidebarComponent title="Monitoring" path='/admin-sekolah/monitoring' icon={"fa-tv"} />
          <SidebarComponent title="halo" path='/admin-sekolah/' />
        </div>
        <button onClick={() => handleLogout()}>logout</button>

      </div>
      <div className='w-5/6 h-full bg-white'>
        {props.children}
      </div>
    </main>
  );
}

const SidebarComponent = ({ title, icon, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;


  return (
    <button
      onClick={() => navigate(path)} // Replace "${path}" with "path"

      className={`${isActive ? 'bg-white text-blue-800 font-semibold px-4 ' : 'bg-none text-white font-medium hover:bg-white/15 '} rounded-md flex items-center px-4 py-2 gap-2`}>
      {/* <PieChart
        color={`${isActive ? '#1d4ed8' : '#ffffff'}`}
      /> */}
      <i class={`fa-solid ${icon}`}></i>
      <p className={`${isActive ? 'font-semibold' : 'font-medium'} text-base`}>{title}</p>
    </button>
  )
}

export default MainAdmin;