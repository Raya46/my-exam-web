import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarComponent from "../../components/SideBar";
import BASE_API_URL from "../../constant/ip";
import HomePage from "./HomePage";
import logoutUser from "../../utils/logoutUser";
import getData from "../../utils/getData";

function MainAdmin(props) {
  const [subsData, setsubsData] = useState([]);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}admin-sekolah`);
    setsubsData(data.data);
  };

  useEffect(() => {
    getSubsData();
  }, []);

  return (
    <>
      <main className="flex flex-row w-full h-screen max-h-screen max-w-screen">
        <div className="w-1/6 h-full bg-blue-800 py-8 px-4 items-center flex-col gap-4 flex">
          <div className="flex justify-start w-full ">
            <h2 className="text-white text-3xl font-semibold">ArohExam</h2>
          </div>
          <div className="w-full flex-col flex gap-2">
            <SidebarComponent
              title="Dashboard"
              path="/admin-sekolah/dashboard"
              icon={"fa-chart-pie"}
            />
            <SidebarComponent
              title="Link"
              path="/admin-sekolah/link"
              icon={"fa-link"}
            />
            <SidebarComponent
              title="Monitoring"
              path="/admin-sekolah/monitoring"
              icon={"fa-tv"}
            />
          </div>
          <button onClick={logoutUser}>logout</button>
        </div>
        {subsData === null ? (
          <HomePage/>
        ) : (
          <div className="w-5/6 h-full bg-white">{props.children}</div>
        )}
      </main>
    </>
  );
}

export default MainAdmin;
