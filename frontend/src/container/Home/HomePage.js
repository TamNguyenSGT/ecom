import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import HomeBanner from "../../component/HomeFeature/HomeBanner";
import MainFeature from "../../component/HomeFeature/MainFeature";
import NewProductFeature from "../../component/HomeFeature/NewProductFeature";
import HomeBlog from "../../component/HomeFeature/HomeBlog";
import {
    getAllBanner,
    getProductFeatureService,
    getNewBlog,
    getProductRecommendService,
} from "../../services/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const [dataProductFeature, setDataProductFeature] = useState([]);
    const [dataNewBlog, setdataNewBlog] = useState([]);
    const [dataBanner, setdataBanner] = useState([]);
    const [dataProductRecommend, setdataProductRecommend] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3500,
        autoplay: true,
        fade: true,
        cssEase: "ease",
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            fetchProductRecommend(userData.id);
        }
        fetchBlogFeature();
        fetchDataBrand();
        fetchProductFeature();
        window.scrollTo(0, 0);
    }, []);

    const fetchBlogFeature = async () => {
        const res = await getNewBlog(3);
        if (res?.errCode === 0) {
            setdataNewBlog(res.data);
        }
    };

    const fetchProductFeature = async () => {
        const res = await getProductFeatureService(8);
        if (res?.errCode === 0) {
            setDataProductFeature(res.data);
        }
    };

    const fetchProductRecommend = async (userId) => {
        const res = await getProductRecommendService({
            limit: 20,
            userId,
        });
        if (res?.errCode === 0) {
            setdataProductRecommend(res.data);
        }
    };

    const fetchDataBrand = async () => {
        const res = await getAllBanner({
            limit: 6,
            offset: 0,
            keyword: "",
        });
        if (res?.errCode === 0) {
            setdataBanner(res.data);
        }
    };

    const featuredData = useMemo(() => {
        if (dataProductRecommend.length > 0) {
            return dataProductRecommend;
        }
        return dataProductFeature;
    }, [dataProductFeature, dataProductRecommend]);

    return (
        <div className="home-page">
            <Slider {...settings}>
                {dataBanner.map((item, index) => (
                    <HomeBanner
                        key={item.id || index}
                        image={item.image}
                        name={item.name}
                        subtitle={item.description}
                    />
                ))}
            </Slider>

            <MainFeature />
            <NewProductFeature
                title="Sản phẩm nổi bật"
                description="Cập nhật liên tục dựa trên hành vi mua sắm và xu hướng hiện hành."
                data={featuredData}
            />
            <HomeBlog data={dataNewBlog} />
        </div>
    );
}

export default HomePage;
