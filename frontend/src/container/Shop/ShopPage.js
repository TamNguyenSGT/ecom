import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainShop from "../../component/Shop/MainShop";
import Category from "../../component/Shop/Category";
import Brand from "../../component/Shop/Brand";
import "./ShopPage.scss";

function ShopPage() {
    const [categoryId, setcategoryId] = useState("");
    const [brandId, setbrandId] = useState("");
    const heroRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="shop-page">
            <section className="shop-hero" ref={heroRef}>
                <div className="page-shell">
                    <div className="hero-content">
                        <p className="eyebrow">Shop</p>
                        <h1>Không gian mua sắm đa chiều.</h1>
                        <p>
                            Lọc nhanh theo danh mục, thương hiệu, mức giá và
                            khám phá đề xuất được cá nhân hóa theo hành vi của
                            bạn.
                        </p>
                        <div className="hero-meta">
                            <span>Hơn 2.000 sản phẩm có sẵn</span>
                            <span>10+ thương hiệu đối tác</span>
                        </div>
                    </div>
                    <div className="hero-breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>→</span>
                        <Link to="/shop">Cửa hàng</Link>
                    </div>
                </div>
            </section>

            <section className="shop-layout page-section">
                <div className="page-shell">
                    <div className="layout-grid">
                        <aside className="shop-sidebar">
                            <Category
                                handleRecevieDataCategory={setcategoryId}
                            />
                            <Brand handleRecevieDataBrand={setbrandId} />
                        </aside>
                        <main className="shop-content">
                            <MainShop
                                categoryId={categoryId}
                                brandId={brandId}
                                myRef={heroRef}
                            />
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShopPage;
