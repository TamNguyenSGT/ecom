import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ItemProduct from "../Product/ItemProduct";
import { getAllProductUser } from "../../services/userService";
import { PAGINATION } from "../../utils/constant";
import FormSearch from "../Search/FormSearch";

function MainShop({ categoryId, brandId, myRef }) {
    const [dataProduct, setdataProduct] = useState([]);
    const [count, setCount] = useState(0);
    const [limitPage, setlimitPage] = useState(PAGINATION.pagerow);
    const [sortPrice, setsortPrice] = useState("");
    const [sortName, setsortName] = useState("");
    const [offset, setoffset] = useState(0);
    const [keyword, setkeyword] = useState("");

    const loadProduct = async (
        limit,
        sortNameValue,
        sortPriceValue,
        offsetValue,
        categoryCode,
        keywordValue,
        brandCode
    ) => {
        const response = await getAllProductUser({
            sortPrice: sortPriceValue,
            sortName: sortNameValue,
            limit,
            offset: offsetValue,
            categoryId: categoryCode,
            brandId: brandCode,
            keyword: keywordValue,
        });
        if (response?.errCode === 0) {
            setdataProduct(response.data);
            setCount(Math.ceil(response.count / limit));
        }
    };

    useEffect(() => {
        loadProduct(
            limitPage,
            sortName,
            sortPrice,
            offset,
            categoryId,
            keyword,
            brandId
        );
    }, []);

    useEffect(() => {
        loadProduct(
            limitPage,
            sortName,
            sortPrice,
            0,
            categoryId,
            keyword,
            brandId
        );
        setoffset(0);
    }, [categoryId, brandId]);

    const handleSelectLimitPage = (event) => {
        const value = Number(event.target.value);
        setlimitPage(value);
        loadProduct(value, sortName, sortPrice, 0, categoryId, keyword, brandId);
        setoffset(0);
    };

    const handleChangePage = (number) => {
        const newOffset = number.selected * limitPage;
        setoffset(newOffset);
        loadProduct(
            limitPage,
            sortName,
            sortPrice,
            newOffset,
            categoryId,
            keyword,
            brandId
        );
        myRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSelectSort = (event) => {
        const value = Number(event.target.value);
        if (value === 1) {
            setsortPrice("");
            setsortName("");
            loadProduct(limitPage, "", "", offset, categoryId, keyword, brandId);
        } else if (value === 2) {
            setsortPrice(true);
            setsortName("");
            loadProduct(limitPage, "", true, offset, categoryId, keyword, brandId);
        } else if (value === 3) {
            setsortPrice("");
            setsortName(true);
            loadProduct(limitPage, true, "", offset, categoryId, keyword, brandId);
        }
    };

    const handleSearch = (value) => {
        setkeyword(value);
        loadProduct(limitPage, sortName, sortPrice, 0, categoryId, value, brandId);
        setoffset(0);
    };

    const handleOnchangeSearch = (value) => {
        if (value === "") {
            setkeyword("");
            loadProduct(
                limitPage,
                sortName,
                sortPrice,
                offset,
                categoryId,
                "",
                brandId
            );
        }
    };

    return (
        <div className="shop-board">
            <div className="shop-toolbar">
                <FormSearch
                    title="tên hoặc mã sản phẩm"
                    handleSearch={handleSearch}
                    handleOnchange={handleOnchangeSearch}
                />
                <div className="toolbar-controls">
                    <div className="select-field">
                        <label>Hiển thị</label>
                        <select value={limitPage} onChange={handleSelectLimitPage}>
                            <option value={6}>06 sản phẩm</option>
                            <option value={12}>12 sản phẩm</option>
                            <option value={18}>18 sản phẩm</option>
                        </select>
                    </div>
                    <div className="select-field">
                        <label>Sắp xếp</label>
                        <select onChange={handleSelectSort}>
                            <option value={1}>Mặc định</option>
                            <option value={2}>Theo giá</option>
                            <option value={3}>Theo tên</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="product-grid">
                {dataProduct.map((item) => (
                    <ItemProduct
                        key={item.id}
                        id={item.id}
                        type="product-grid-item"
                        name={item.name}
                        img={
                            item.productDetail?.[0]?.productImage?.[0]?.image
                        }
                        discountPrice={
                            item.productDetail?.[0]?.discountPrice || 0
                        }
                        price={item.productDetail?.[0]?.originalPrice || 0}
                    />
                ))}
            </div>

            <ReactPaginate
                previousLabel={"Quay lại"}
                nextLabel={"Tiếp"}
                breakLabel={"..."}
                pageCount={count}
                marginPagesDisplayed={2}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    );
}

export default MainShop;
