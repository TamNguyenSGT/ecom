import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addItemCartStart } from '../../action/ShopCartAction';
import './InfoDetailProduct.scss';
import CommonUtils from '../../utils/CommonUtils';

function InfoDetailProduct(props) {
    const { dataProduct } = props;
    const [arrDetail, setarrDetail] = useState([]);
    const [productDetail, setproductDetail] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [imgPreview, setimgPreview] = useState('');
    const [activeLinkId, setactiveLinkId] = useState('');
    const [quantity, setquantity] = useState(0);
    const [quantityProduct, setquantityProduct] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const { productDetail } = dataProduct ? dataProduct : [];

        if (productDetail && productDetail.length > 0) {
            setproductDetail(productDetail);
            setarrDetail(productDetail[0]);

            if (productDetail[0].productDetailSize && productDetail[0].productDetailSize[0]) {
                const firstSize = productDetail[0].productDetailSize[0];
                setactiveLinkId(firstSize.id);
                setquantity(firstSize.stock);
                props.sendDataFromInforDetail(firstSize);
            }
            setActiveImageIndex(0);
        }
    }, [dataProduct]);

    const handleSelectDetail = (event) => {
        const nextDetail = productDetail[event.target.value];
        setarrDetail(nextDetail);
        if (nextDetail && nextDetail.productDetailSize && nextDetail.productDetailSize.length > 0) {
            const firstSize = nextDetail.productDetailSize[0];
            setactiveLinkId(firstSize.id);
            setquantity(firstSize.stock);
            props.sendDataFromInforDetail(firstSize);
        }
        setActiveImageIndex(0);
    };

    const openPreviewImage = (url) => {
        if (!url) return;
        setimgPreview(url);
        setisOpen(true);
    };

    const handleClickBoxSize = (data) => {
        setactiveLinkId(data.id);
        setquantity(data.stock);
        props.sendDataFromInforDetail(data);
    };

    const dispatch = useDispatch();

    const handleAddShopCart = () => {
        if (props.userId) {
            dispatch(
                addItemCartStart({
                    userId: props.userId,
                    productdetailsizeId: activeLinkId,
                    quantity: quantityProduct,
                })
            );
        } else {
            toast.error('Dang nhap de them vao gio hang');
        }
    };

    const handleChangeQuantity = (event) => {
        const value = Math.max(1, Number(event.target.value) || 1);
        setquantityProduct(value);
    };

    const images = arrDetail?.productImage || [];
    const activeImage =
        images && images.length > 0
            ? images[Math.min(activeImageIndex, images.length - 1)]
            : null;

    return (
        <div className="detail-hero surface-card">
            <div className="detail-media">
                <div
                    className="detail-main"
                    onClick={() => activeImage && openPreviewImage(activeImage.image)}
                    style={{ cursor: activeImage ? 'pointer' : 'default' }}
                >
                    {activeImage ? (
                        <img src={activeImage.image} alt={dataProduct?.name || 'Anh san pham'} />
                    ) : (
                        <div className="placeholder">
                            <p>Chưa có hình ảnh</p>
                        </div>
                    )}
                </div>
                {images && images.length > 1 && (
                    <div className="detail-thumbs">
                        {images.map((item, index) => (
                            <button
                                type="button"
                                className={index === activeImageIndex ? 'thumb active' : 'thumb'}
                                key={index}
                                onClick={() => setActiveImageIndex(index)}
                            >
                                <img src={item.image} alt={`Anh ${index + 1}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="detail-info">
                <div className="detail-meta">
                    <span className="chip">
                        {dataProduct?.categoryData ? dataProduct.categoryData.value : 'Sản phẩm'}
                    </span>
                    <span className={quantity > 0 ? 'chip success' : 'chip warning'}>
                        {quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                </div>
                <h1 className="detail-title">{dataProduct?.name || 'Sản phẩm'}</h1>
                <p className="detail-sub">{arrDetail?.description}</p>

                <div className="detail-price-row">
                    <div className="detail-price">
                        {CommonUtils.formatter.format(arrDetail?.discountPrice || 0)}
                    </div>
                    <span className="detail-stock">{quantity} sản phẩm có sẵn</span>
                </div>

                <div className="detail-row">
                    <div className="label">Size</div>
                    <div className="size-grid">
                        {arrDetail?.productDetailSize &&
                            arrDetail.productDetailSize.length > 0 &&
                            arrDetail.productDetailSize.map((item, index) => (
                                <button
                                    key={index}
                                    className={item.id === activeLinkId ? 'size-pill active' : 'size-pill'}
                                    onClick={() => handleClickBoxSize(item)}
                                    type="button"
                                >
                                    {item.sizeData.value}
                                </button>
                            ))}
                    </div>
                </div>

                <div className="detail-row">
                    <div className="label">Loại sản phẩm</div>
                    <select onChange={handleSelectDetail} className="detail-select" name="type">
                        {dataProduct &&
                            productDetail &&
                            productDetail.length > 0 &&
                            productDetail.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.nameDetail}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="detail-actions">
                    <div className="quantity-control">
                        <span className="label">Số lượng</span>
                        <div className="quantity-input">
                            <input
                                type="number"
                                value={quantityProduct}
                                onChange={handleChangeQuantity}
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="cta-group">
                        <button className="btn btn-primary" onClick={handleAddShopCart}>
                            Thêm vào giỏ hàng
                        </button>
                        <button className="btn btn-ghost" type="button">
                            Yêu thích
                        </button>
                    </div>
                </div>
            </div>
            {isOpen === true && (
                <Lightbox mainSrc={imgPreview} onCloseRequest={() => setisOpen(false)} />
            )}
        </div>
    );
}

export default InfoDetailProduct;
