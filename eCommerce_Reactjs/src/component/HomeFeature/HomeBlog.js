import React from "react";
import HeaderContent from "../Content/HeaderContent";
import HomeBlogItem from "./HomeBlogItem";

function HomeBlog({ data = [] }) {
    return (
        <section className="blog-area page-section">
            <div className="page-shell">
                <HeaderContent
                    mainContent="Nhật ký phong cách"
                    infoContent="Những câu chuyện, cảm hứng và bí quyết phối đồ từ Nike Studio."
                />
                <div className="row">
                    {data.map((item) => (
                        <HomeBlogItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeBlog;
