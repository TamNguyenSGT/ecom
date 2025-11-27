import React from "react";
import Slider from "react-slick";
import ItemProduct from "../Product/ItemProduct";
import HeaderContent from "../Content/HeaderContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductFeature.scss";

function ProductFeature({ title, data = [], description }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="feature_product_area page-section">
            <div className="page-shell">
                <HeaderContent
                    mainContent={title || "Gợi ý dành riêng cho bạn"}
                    infoContent={
                        description ||
                        "Được tuyển chọn dựa trên hành trình mua sắm gần đây."
                    }
                />
                <div className="product-carousel">
                    <Slider {...settings}>
                        {data?.map((item) => (
                            <ItemProduct
                                key={item.id}
                                id={item.id}
                                type="product-slide"
                                name={item.name}
                                img={
                                    item.productDetail?.[0]?.productImage?.[0]
                                        ?.image
                                }
                                price={
                                    item.productDetail?.[0]?.originalPrice || 0
                                }
                                discountPrice={
                                    item.productDetail?.[0]?.discountPrice || 0
                                }
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default ProductFeature;
