import React from "react";
import { Link } from "react-router-dom";

function HomeBlogItem({ data }) {
    const author = `${data.userData.firstName} ${data.userData.lastName}`;
    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-blog">
                <Link to={`/blog-detail/${data.id}`} className="thumb">
                    <img src={data.image} alt={data.title} loading="lazy" />
                </Link>
                <div className="short_details">
                    <div className="meta-top">
                        <span>{author}</span>
                        <span>
                            <i className="ti-comments-smiley" />{" "}
                            {data.commentData.length} bình luận
                        </span>
                    </div>
                    <Link className="d-block" to={`/blog-detail/${data.id}`}>
                        <h4>{data.title}</h4>
                    </Link>
                    <div className="text-wrap">
                        <p>{data.description}</p>
                    </div>
                    <Link
                        className="blog_btn"
                        to={`/blog-detail/${data.id}`}
                    >
                        Đọc tiếp
                        <span className="ml-2 ti-arrow-right" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogItem;
