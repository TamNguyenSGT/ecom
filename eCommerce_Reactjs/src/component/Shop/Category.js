import React, { useEffect, useState } from "react";
import { getAllCodeService } from "../../services/userService";

function Category({ handleRecevieDataCategory }) {
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getAllCodeService("CATEGORY");
            if (response?.errCode === 0) {
                const data = [
                    {
                        createdAt: null,
                        code: "ALL",
                        type: "CATEGORY",
                        value: "Tất cả",
                    },
                    ...response.data,
                ];
                setCategories(data);
            }
        };
        fetchCategory();
    }, []);

    const handleSelect = (code) => {
        const next = active === code ? "" : code;
        setActive(next);
        handleRecevieDataCategory(next);
    };

    return (
        <div className="filter-card">
            <div className="filter-header">
                <h3>Danh mục</h3>
                {active && (
                    <button type="button" onClick={() => handleSelect(active)}>
                        Bỏ chọn
                    </button>
                )}
            </div>
            <div className="filter-list">
                {categories.map((item) => (
                    <button
                        type="button"
                        key={item.code}
                        className={`filter-chip ${
                            active === item.code ? "active" : ""
                        }`}
                        onClick={() => handleSelect(item.code)}
                    >
                        {item.value}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Category;
