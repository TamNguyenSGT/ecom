import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const TopMenu = ({ user }) => {
    const handleLogout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const fullName =
        user && user.id
            ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
            : "";

    const initials =
        fullName
            .split(" ")
            .filter(Boolean)
            .map((segment) => segment[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "ME";

    const renderAuthLinks = () => {
        if (user && user.id) {
            return (
                <>
                    <NavLink
                        to={`/user/detail/${user.id}`}
                        className={({ isActive }) =>
                            `topbar-link user-chip ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="chip-avatar">{initials}</span>
                        <span>{fullName || "Tài khoản"}</span>
                    </NavLink>
                    <button
                        type="button"
                        className="topbar-link ghost"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </button>
                </>
            );
        }

        return (
            <>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `topbar-link ${isActive ? "active" : ""}`
                    }
                >
                    Đăng nhập
                </NavLink>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `topbar-link ${isActive ? "active" : ""}`
                    }
                >
                    Đăng ký
                </NavLink>
            </>
        );
    };

    return (
        <div className="app-topbar">
            <div className="page-shell">
                <div className="topbar-inner">
                    <div className="topbar-info">
                        <span>Hotline 0335 926 080</span>
                        <span>support@ecom.studio</span>
                        <span>Giao hàng toàn quốc</span>
                    </div>
                    <div className="topbar-actions">
                        {renderAuthLinks()}
                        <span className="topbar-lang">VI</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopMenu;
