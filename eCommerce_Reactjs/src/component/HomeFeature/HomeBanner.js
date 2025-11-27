import React from "react";
import { Link } from "react-router-dom";
import "./HomeBanner.scss";

function HomeBanner({ image, name, title, subtitle }) {
    const bannerImage = image || "/resources/img/banner1.jpg";

    return (
        <section className="home-hero page-section">
            <div className="page-shell">
                <div
                    className="hero-surface"
                    style={{ backgroundImage: `url(${bannerImage})` }}
                >
                    <div className="hero-content">
                        <span className="hero-pill">{name || "T-Shirt"}</span>
                        <h1>
                            <span>{title || "Phá vỡ giới hạn"}</span> phong
                            cách làm chủ nhịp sống đô thị.
                        </h1>
                        <p>
                            {subtitle ||
                                "Bộ sưu tập mới kết hợp chất liệu tái chế, đường cắt hiện đại cùng hiệu ứng phản quang độc quyền, giúp bạn sẵn sàng cho mọi chuyển động."}
                        </p>
                        <div className="hero-cta">
                            <Link className="btn-primary" to="/shop">
                                Mua ngay
                            </Link>
                            <Link className="btn-ghost" to="/blog">
                                Xem lookbook
                            </Link>
                        </div>
                        <div className="hero-metrics-inline">
                            <div>
                                <span className="metric-label">Giao nhanh</span>
                                <p className="metric-value">2h nội thành</p>
                            </div>
                            <div>
                                <span className="metric-label">Đổi trả</span>
                                <p className="metric-value">30 ngày</p>
                            </div>
                            <div>
                                <span className="metric-label">Stylist</span>
                                <p className="metric-value">1:1 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;
