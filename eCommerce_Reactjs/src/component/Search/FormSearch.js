import React, { useState } from "react";

const FormSearch = ({ title, handleSearch, handleOnchange }) => {
    const [keyword, setKeyword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        handleSearch(keyword);
    };

    const onChange = (value) => {
        setKeyword(value);
        handleOnchange(value);
    };

    const clearKeyword = () => {
        setKeyword("");
        handleOnchange("");
    };

    return (
        <form className="shop-search" onSubmit={onSubmit}>
            <div className="search-field">
                <i className="ti-search" />
                <input
                    value={keyword}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    placeholder={`Tìm theo ${title}`}
                />
                {keyword && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={clearKeyword}
                        aria-label="Xóa tìm kiếm"
                    >
                        ×
                    </button>
                )}
            </div>
            <button type="submit" className="btn-primary">
                Tìm kiếm
            </button>
        </form>
    );
};

export default FormSearch;
