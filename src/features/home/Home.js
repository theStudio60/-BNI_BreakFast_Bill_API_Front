import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  useParams,
} from "react-router-dom";
import { Header } from "../../components";
import { CustomerList, CustomerDetails, CustomerNew } from "../customer";
import { SessionPlaceDetails, SessionPlaceList, SessionPlaceNew } from "../session";

export default function Home() {

    return (
      <div className="container">
        <div className="row bg-secondary">
          <Header />
        </div>
        
        <div className="row">
          <div className="col-4 bg-warning">
          <NavLink to="/" className="nav-link" > Home </NavLink>
          <NavLink to="/customers" className="nav-link" > Customers </NavLink>
          <NavLink to="/new-customers" className="nav-link" > Nouveau membre </NavLink>
          <NavLink to="/session-places" className="nav-link" > Place de sessions </NavLink>
          <NavLink to="/new-session-place" className="nav-link" > Nouvelle place de session </NavLink>
          </div>
          <div className="col-8">
          <Routes>
            {/* défini toutes les routes de l'app */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customer-details/:id" element={<CustomerDetails path={useParams()} />} />
            <Route path="/new-customers" element={<CustomerNew />} />
            <Route path="/session-places" element={<SessionPlaceList />} />
            <Route path="/session-place/:id" element={<SessionPlaceDetails path={useParams()} />} />
            <Route path="/new-session-place" element={<SessionPlaceNew />} />
          </Routes>
          </div>
        </div>
        
      </div>
    );
}
