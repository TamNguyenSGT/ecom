import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { getItemCartStart } from "../../action/ShopCartAction";
import { listRoomOfUser } from "../../services/userService";
import TopMenu from "./TopMenu";
import "./Header.scss";

const Header = () => {
    const [quantityMessage, setQuantityMessage] = useState(0);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const socketRef = useRef(null);

    const dispatch = useDispatch();
    const dataCart = useSelector((state) => state.shopcart.listCartItem);
    const location = useLocation();
    const host = process.env.REACT_APP_BACKEND_URL;

    const navItems = [
        { path: "/", label: "TRANG CHỦ", exact: true },
        { path: "/shop", label: "CỬA HÀNG" },
        { path: "/blog", label: "TIN TỨC" },
        { path: "/voucher", label: "ƯU ĐÃI" },
        { path: "/about", label: "GIỚI THIỆU" },
    ];

    const fetchListRoom = async (userId) => {
        const res = await listRoomOfUser(userId);
        if (res?.errCode === 0 && res.data?.[0]?.messageData?.length > 0) {
            const count = res.data[0].messageData.reduce(
                (acc, item) =>
                    acc + (item.unRead === 1 && item.userId !== userId ? 1 : 0),
                0
            );
            setQuantityMessage(count);
        }
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUser(userData);

        if (userData) {
            dispatch(getItemCartStart(userData.id));
            socketRef.current = socketIOClient.connect(host);

            socketRef.current.on("sendDataServer", () =>
                fetchListRoom(userData.id)
            );
            socketRef.current.on("loadRoomServer", () =>
                fetchListRoom(userData.id)
            );
            socketRef.current.on("getId", () => {});

            fetchListRoom(userData.id);

            return () => {
                socketRef.current && socketRef.current.disconnect();
            };
        }
    }, [dispatch, host]);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 24);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const cartQuantity = dataCart?.length || 0;

    return (
        <header className="header_area">
            <TopMenu user={user} />

            <div className={`app-navbar ${isSticky ? "is-sticky" : ""}`}>
                <div className="page-shell">
                    <div className="navbar-inner">
                        <NavLink to="/" className="brand-mark" end>
                            <img
                                src="/resources/img/logo.png"
                                alt="Logo"
                                className="brand-image"
                            />
                        </NavLink>

                        <button
                            type="button"
                            className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
                            onClick={() =>
                                setIsMenuOpen((previous) => !previous)
                            }
                            aria-label="Toggle navigation"
                        >
                            <span />
                            <span />
                            <span />
                        </button>

                        <div
                            className={`nav-collapse ${
                                isMenuOpen ? "open" : ""
                            }`}
                        >
                            <ul className="nav-links">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            end={item.exact}
                                            className={({ isActive }) =>
                                                `nav-link ${
                                                    isActive ? "active" : ""
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <div className="nav-actions">
                                <Link
                                    to="/user/messenger"
                                    className="icon-btn"
                                >
                                    <i className="fa-brands fa-facebook-messenger" />
                                    {quantityMessage > 0 && (
                                        <span className="nav-badge">
                                            {quantityMessage > 99
                                                ? "99+"
                                                : quantityMessage}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/shopcart" className="icon-btn">
                                    <i className="ti-shopping-cart" />
                                    {cartQuantity > 0 && (
                                        <span className="nav-badge">
                                            {cartQuantity > 99
                                                ? "99+"
                                                : cartQuantity}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to={
                                        user?.id
                                            ? `/user/detail/${user.id}`
                                            : "/login"
                                    }
                                    className="icon-btn"
                                >
                                    <i className="ti-user" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
