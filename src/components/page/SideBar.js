import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <NavLink to="/" className="nav-link">
        {" "}
        Home{" "}
      </NavLink>
      <NavLink to="/customers" className="nav-link">
        {" "}
        Customers{" "}
      </NavLink>
      <NavLink to="/new-customers" className="nav-link">
        {" "}
        Nouveau membre{" "}
      </NavLink>
      <NavLink to="/session-places" className="nav-link">
        {" "}
        Place de sessions{" "}
      </NavLink>
      <NavLink to="/new-session-place" className="nav-link">
        {" "}
        Nouvelle place de session{" "}
      </NavLink>
      <NavLink to="/session-types" className="nav-link">
        {" "}
        Types de session{" "}
      </NavLink>
      <NavLink to="/new-session-type" className="nav-link">
        {" "}
        Nouveau type de session{" "}
      </NavLink>
      <NavLink to="/sessions" className="nav-link">
        {" "}
        Sessions{" "}
      </NavLink>
      <NavLink to="/new-session" className="nav-link">
        {" "}
        Nouvelle session{" "}
      </NavLink>
      <NavLink to="/items" className="nav-link">
        {" "}
        Items{" "}
      </NavLink>
      <NavLink to="/new-item" className="nav-link">
        {" "}
        Nouveau item{" "}
      </NavLink>      
    </>
  );
}
