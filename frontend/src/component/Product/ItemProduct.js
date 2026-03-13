import React from "react";
import { Link } from "react-router-dom";
import CommonUtils from "../../utils/CommonUtils";
import "./ItemProduct.scss";

function ItemProduct({
    id,
    type = "",
    name,
    img,
    price,
    discountPrice,
    badge,
}) {
    const hasDiscount =
        discountPrice && Number(discountPrice) !== Number(price);
    const percent =
        hasDiscount && price
            ? Math.round(
                  ((Number(price) - Number(discountPrice)) / Number(price)) *
                      100
              )
            : 0;

    const renderPrice = () => (
        <div className="product-price">
            <span className="current">
                {CommonUtils.formatter.format(
                    hasDiscount ? discountPrice : price
                )}
            </span>
            {hasDiscount && (
                <span className="old">
                    {CommonUtils.formatter.format(price)}
                </span>
            )}
        </div>
    );

    return (
        <div className={type}>
            <article className="product-card">
                <Link to={`/detail-product/${id}`} className="product-link">
                    <div className="product-media">
                        <img src={img} alt={name} loading="lazy" />
                        {(badge || hasDiscount) && (
                            <span className="product-badge">
                                {badge || `-${percent}%`}
                            </span>
                        )}
                    </div>
                    <div className="product-info">
                        <p className="product-eyebrow">Studio curated</p>
                        <h3>{name}</h3>
                        {renderPrice()}
                    </div>
                </Link>
            </article>
        </div>
    );
}

export default ItemProduct;
