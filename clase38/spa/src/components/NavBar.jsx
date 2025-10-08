import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const activeStyle = {
        fontWeight: "700",
        textDecoration: "underline",
        color: "violet",
    };
    return (
        <nav
            style={{
                borderBottom: "1px solid #e6d6faff",
                padding: "8px 16px",
                display: "flex",
                gap: 12,
            }}
        >
            <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                Inicio
            </NavLink>
            <NavLink
                to="/products"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                Productos
            </NavLink>
            <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                PruebaError
            </NavLink>
        </nav>
    );
};

export default NavBar;
