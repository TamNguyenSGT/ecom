import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const footerColumns = [
    {
        title: "Khám phá",
        links: [
            { label: "Sản phẩm mới", href: "/shop" },
            { label: "Bán chạy", href: "/shop" },
            { label: "Bộ sưu tập độc quyền", href: "/shop" },
            { label: "Chương trình thành viên", href: "/voucher" },
        ],
    },
    {
        title: "Dịch vụ",
        links: [
            { label: "Theo dõi đơn hàng", href: "/user" },
            { label: "Trung tâm hỗ trợ", href: "/user/messenger" },
            { label: "Đổi / trả hàng", href: "/user" },
            { label: "Tư vấn stylist", href: "/user/messenger" },
        ],
    },
    {
        title: "Về chúng tôi",
        links: [
            { label: "Câu chuyện thương hiệu", href: "/about" },
            { label: "Tin tức & Blog", href: "/blog" },
            { label: "Liên hệ hợp tác", href: "/about" },
            { label: "Tuyển dụng", href: "/about" },
        ],
    },
];

const socialLinks = [
    { icon: "fa-brands fa-facebook-f", href: "https://facebook.com" },
    { icon: "fa-brands fa-instagram", href: "https://instagram.com" },
    { icon: "fa-brands fa-tiktok", href: "https://tiktok.com" },
    { icon: "fa-brands fa-youtube", href: "https://youtube.com" },
];

const Footer = () => {
    const handleSubscribe = (event) => {
        event.preventDefault();
    };

    return (
        <footer className="neo-footer">
            <div className="page-shell">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <span className="footer-badge">Nike Studio</span>
                        <h3>Không gian thời trang cho thế hệ mới.</h3>
                        <p>
                            Chúng tôi giúp bạn xây dựng phong cách thăng hoa
                            với công nghệ, trải nghiệm mua sắm cá nhân hóa và
                            dịch vụ tận tâm 24/7.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.icon}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={item.icon}
                                >
                                    <i className={item.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerColumns.map((column) => (
                        <div className="footer-column" key={column.title}>
                            <h4>{column.title}</h4>
                            <ul>
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.href}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="footer-column newsletter">
                        <h4>Nhận thông báo ưu đãi</h4>
                        <p>
                            Tối ưu tủ đồ và nhận quyền lợi độc quyền vào mỗi
                            thứ Hai hàng tuần.
                        </p>
                        <form onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                required
                            />
                            <button type="submit">Đăng ký</button>
                        </form>
                        <small>
                            Khi đăng ký, bạn đồng ý với chính sách bảo mật của
                            chúng tôi.
                        </small>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Copyright {new Date().getFullYear()} Nike Studio.
                        Đồ án tốt nghiệp của Thân Quốc Thắng và Nguyễn Thành Tâm.
                    </p>
                    <div className="footer-bottom-links">
                        <Link to="/about">Điều khoản</Link>
                        <Link to="/about">Bảo mật</Link>
                        <Link to="/user/messenger">Hỗ trợ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
