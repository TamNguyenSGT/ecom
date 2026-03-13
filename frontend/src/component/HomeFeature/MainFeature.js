import React from "react";
import "./MainFeature.scss";

const featureData = [
    {
        icon: "ti-crown",
        title: "Ưu đãi thành viên",
        description: "Giảm thêm 15% khi bạn đạt hạng Icon mỗi tháng.",
    },
    {
        icon: "ti-truck",
        title: "Giao hàng linh hoạt",
        description: "Trong 2h nội thành & miễn phí đơn từ 1.5 triệu.",
    },
    {
        icon: "ti-headphone-alt",
        title: "Stylist 24/7",
        description: "Tư vấn outfit, bảo quản sneaker, lên lịch thử đồ.",
    },
    {
        icon: "ti-lock",
        title: "Thanh toán an toàn",
        description: "Liên kết hơn 10 cổng thanh toán & ví điện tử.",
    },
];

function MainFeature() {
    return (
        <section className="main-feature page-section">
            <div className="page-shell">
                <div className="section-heading">
                    <span className="eyebrow">Experience</span>
                    <h2>Phong cách và dịch vụ cao cấp tại một nơi.</h2>
                    <p>
                        Chọn lựa dễ dàng, trải nghiệm cá nhân hóa với đội ngũ
                        stylist, vận hành bởi công nghệ realtime của chúng tôi.
                    </p>
                </div>
                <div className="feature-grid">
                    {featureData.map((item) => (
                        <article className="feature-card" key={item.title}>
                            <span className="feature-icon">
                                <i className={item.icon} />
                            </span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MainFeature;
