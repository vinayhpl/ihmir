import React, { useRef, useState, useEffect } from "react";
import { Menu } from "primereact/menu";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import RawDataReport from "../pages/RawDataReport";
import MobileApk from "../pages/MobileApk";

export default function Main() {
  const menu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  const fldRoleCode = sessionStorage.getItem("RoleCode");

  useEffect(() => {
    setActiveTab(location.pathname); // Set active tab based on current location
  }, [location.pathname]);
  const clearSession = () => {
    sessionStorage.clear();
    // localStorage.removeItem('sessionId');
    navigate("/");
  };
  const PageNotFound = () => {
    return (
      <>
        <h1>404 Page not found</h1>
        <p>The page you are looking for does not exist.</p>
      </>
    );
  };
  const displayContent = () => {
    return (
      <Routes>
        {fldRoleCode === "01" && (
          <>
            <Route exact path="/rawdatareport" element={<RawDataReport />} />
          </>
        )}
        {fldRoleCode === "02" && (
          <>
            <Route exact path="/rawdatareport" element={<RawDataReport />} />
            <Route exact path="/mobileapk" element={<MobileApk />} />
          </>
        )}
        <Route exact path="/*" element={<PageNotFound />} />
      </Routes>
    );
  };

  const items1 = [
    {
      label: "Log out",
      icon: "pi pi-sign-out",
      command: () => {
        clearSession();
      },
    },
  ];

  let SuperItems = [
    {
      label: "Raw Data Report",
      icon: "pi pi-file",
      className: activeTab === "/main/rawdatareport" ? "active-tab" : "",
      command: () => navigate("/main/rawdatareport"),
    },
    {
      label: "Mobile APK Upload",
      icon: "pi pi-upload",
      className: activeTab === "/main/mobileapk" ? "active-tab" : "",
      command: () => navigate("/main/mobileapk"),
    },
  ];

  let items = [
    {
      label: "Raw Data Report",
      icon: "pi pi-file",
      className: activeTab === "/main/rawdatareport" ? "active-tab" : "",
      command: () => navigate("/main/rawdatareport"),
    },
  ];

  return (
    <>
      <div className="sidebar">
        <div className="flex justify-content-center mt-5">
          <img src="/IIHMRB.png" alt="logo" style={{ width: "180px" }} />
        </div>
        {fldRoleCode === "01" && (
          <>
            <Menu model={items} className="sidebarMenu mt-7 pl-4" />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                padding: "1rem 1rem 0rem 1rem",
                fontSize: "14px",
                width: "100%",
                marginBottom: "-10px",
              }}
            >
              <TieredMenu model={items1} popup ref={menu} />
              <Button
                className="sidebartieredmenu pi pi-user"
                onClick={(e) => menu.current.toggle(e)}
              >
                Admin
                <span className="pi pi-chevron-up"></span>
              </Button>
            </div>
          </>
        )}
        {fldRoleCode === "02" && (
          <>
            <Menu model={SuperItems} className="sidebarMenu mt-7 pl-4" />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                padding: "1rem 1rem 0rem 1rem",
                fontSize: "14px",
                width: "100%",
                marginBottom: "-10px",
              }}
            >
              <TieredMenu model={items1} popup ref={menu} />
              <Button
                className="sidebartieredmenu pi pi-user"
                onClick={(e) => menu.current.toggle(e)}
              >
                Super Admin
                <span className="pi pi-chevron-up"></span>
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="cardStyle">
        <div>{displayContent()}</div>
      </div>
    </>
  );
}
