import React, { useEffect, useState } from "react";
import { getAllCodeService } from "../../services/userService";

function Brand({ handleRecevieDataBrand }) {
    const [brands, setBrands] = useState([]);
    const [active, setActive] = useState("");

    useEffect(() => {
        const fetchBrand = async () => {
            const response = await getAllCodeService("BRAND");
            if (response?.errCode === 0) {
                const data = [
                    {
                        createdAt: null,
                        code: "ALL",
                        type: "BRAND",
                        value: "Tất cả",
                    },
                    ...response.data,
                ];
                setBrands(data);
            }
        };
        fetchBrand();
    }, []);

    const handleSelect = (code) => {
        const next = active === code ? "" : code;
        setActive(next);
        handleRecevieDataBrand(next);
    };

    return (
        <div className="filter-card">
            <div className="filter-header">
                <h3>Thương hiệu</h3>
                {active && (
                    <button type="button" onClick={() => handleSelect(active)}>
                        Bỏ chọn
                    </button>
                )}
            </div>
            <div className="filter-list">
                {brands.map((item) => (
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

export default Brand;
