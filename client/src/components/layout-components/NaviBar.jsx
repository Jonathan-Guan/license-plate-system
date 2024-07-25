import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navibar.module.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Navibar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-4">
      <Navbar.Brand href="/">Innotek</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${styles.nav}`}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/passes"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Passes
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <nav className={styles.nav}>
    //   <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
    //     <div style={{ display: 'flex', height: '5rem', alignItems: 'center', justifyContent: 'space-between' }}>
    //       <div style={{ display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'center' }}>
    //         <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
    //           <span className="hidden md:block text-white text-2xl font-bold ml-2">
    //             React Jobs
    //           </span>
    //         </NavLink>
    //         <div className="md:ml-auto">
    //           <div className="flex space-x-2">
    //             <NavLink to="/" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
    //               Image Search
    //             </NavLink>
    //             <NavLink to="/passes" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
    //               Passes
    //             </NavLink>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navibar;
