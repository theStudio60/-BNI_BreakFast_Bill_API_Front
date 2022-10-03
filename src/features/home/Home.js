import React from "react";
import { Alert } from "../../components/utils";
import { Header, SideBar } from "../../components";
import AppRoutes from "../../conf/AppRoutes";
import { useSelector } from "react-redux";


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
          {/* affichage des alerts */}
          <Alert />
          <AppRoutes />
        </div>
      </div>
    </div>
  );

}
