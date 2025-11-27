import React from "react";
import HeaderContent from "../Content/HeaderContent";
import ItemProduct from "../Product/ItemProduct";

function NewProductFeature({ title, description, data = [] }) {
    return (
        <section className="new_product_area page-section">
            <div className="page-shell">
                <HeaderContent
                    mainContent={title || "Sản phẩm mới"}
                    infoContent={
                        description ||
                        "Những thiết kế vừa cập bến showroom tuần này."
                    }
                />
                <div className="new-product-grid">
                    {data?.map((item) => (
                        <ItemProduct
                            key={item.id}
                            id={item.id}
                            type="new-grid-item"
                            name={item.name}
                            img={
                                item.productDetail?.[0]?.productImage?.[0]
                                    ?.image
                            }
                            price={item.productDetail?.[0]?.originalPrice || 0}
                            discountPrice={
                                item.productDetail?.[0]?.discountPrice || 0
                            }
                            badge="New"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default NewProductFeature;
