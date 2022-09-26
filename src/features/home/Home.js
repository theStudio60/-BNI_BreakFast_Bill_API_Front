import React from "react";
import { Header, SideBar } from "../../components";
import AppRoutes from "../../conf/AppRoutes";


export default function Home() {

  return (
    <div className="container">
      <div className="row bg-secondary">
        <Header />
      </div>
      <div className="row">
        <div className="col-4 bg-warning">
          <SideBar />
        </div>
        <div className="col-8">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}
