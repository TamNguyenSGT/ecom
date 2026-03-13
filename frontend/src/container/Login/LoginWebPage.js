import React, { useState } from "react";
import { toast } from "react-toastify";
import "./LoginWebPage.css";
import {
    handleLoginService,
    checkPhonenumberEmail,
    createNewUser,
} from "../../services/userService";
import { authentication } from "../../utils/firebase";
import {
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";

const SOCIAL_SECRET = "passwordsecrect";

const LoginWebPage = () => {
    const [mode, setMode] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        phonenumber: "",
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prev) => ({ ...prev, [name]: value }));
    };

    const loginWithCredentials = async (email, password) => {
        const res = await handleLoginService({ email, password });
        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user));
            localStorage.setItem("token", JSON.stringify(res.accessToken));
            if (res.user.roleId === "R1" || res.user.roleId === "R4") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
            return;
        }
        throw new Error(res?.errMessage || "Dang nhap khong thanh cong");
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if (!inputValues.email || !inputValues.password) {
            toast.error("Vui long nhap email va mat khau");
            return;
        }
        setIsLoading(true);
        try {
            await loginWithCredentials(inputValues.email, inputValues.password);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        if (
            !inputValues.lastName ||
            !inputValues.email ||
            !inputValues.phonenumber ||
            !inputValues.password
        ) {
            toast.error("Vui long nhap day du thong tin");
            return;
        }

        if (inputValues.password !== inputValues.confirmPassword) {
            toast.error("Mat khau xac nhan khong trung khop");
            return;
        }

        setIsLoading(true);
        try {
            const duplicated = await checkPhonenumberEmail({
                phonenumber: inputValues.phonenumber,
                email: inputValues.email,
            });

            if (duplicated?.isCheck) {
                throw new Error(
                    duplicated.errMessage || "Tai khoan da ton tai"
                );
            }

            const created = await createNewUser({
                email: inputValues.email,
                lastName: inputValues.lastName,
                phonenumber: inputValues.phonenumber,
                password: inputValues.password,
                roleId: "R2",
            });

            if (created && created.errCode === 0) {
                toast.success("Tao tai khoan thanh cong");
                await loginWithCredentials(
                    inputValues.email,
                    inputValues.password
                );
            } else {
                throw new Error(
                    created?.errMessage || "Khong the tao tai khoan"
                );
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
        });
    };

    const handleSocialProfile = async (response) => {
        const providerData = response?.user?.providerData?.[0];
        if (!providerData?.email) {
            throw new Error("Khong the lay email tu tai khoan xa hoi");
        }

        const existing = await checkPhonenumberEmail({
            phonenumber: providerData.phoneNumber,
            email: providerData.email,
        });

        if (existing?.isCheck) {
            setInputValues((prev) => ({ ...prev, email: providerData.email }));
            await loginWithCredentials(providerData.email, SOCIAL_SECRET);
            return;
        }

        const avatarBase64 = providerData.photoURL
            ? await getBase64FromUrl(providerData.photoURL)
            : null;

        const created = await createNewUser({
            email: providerData.email,
            lastName: providerData.displayName || "Guest",
            phonenumber: providerData.phoneNumber,
            avatar: avatarBase64,
            roleId: "R2",
            password: SOCIAL_SECRET,
        });

        if (created && created.errCode === 0) {
            toast.success("Lien ket tai khoan thanh cong");
            await loginWithCredentials(providerData.email, SOCIAL_SECRET);
            return;
        }

        throw new Error(
            created?.errMessage || "Khong the lien ket tai khoan xa hoi"
        );
    };

    const handleSocialSignin = async (provider) => {
        setIsLoading(true);
        try {
            const response = await signInWithPopup(authentication, provider);
            await handleSocialProfile(response);
        } catch (error) {
            toast.error(error?.message || "Khong the dang nhap xa hoi");
        } finally {
            setIsLoading(false);
        }
    };

    const signInwithFacebook = () =>
        handleSocialSignin(new FacebookAuthProvider());

    const signInwithGoogle = () =>
        handleSocialSignin(new GoogleAuthProvider());

    const descriptionCopy =
        mode === "login"
            ? "Đăng nhập để đặt hàng"
            : "Tạo tài khoản để đặt hàng và nhận thông báo đơn hàng";

    return (
        <div className="login-page">
            <div className="login-shell">
                <div className="login-hero">
                    <p className="eyebrow">Nike Studio</p>
                    <h1>Trang đăng nhập</h1>
                    <p className="lead">
                        Giao diện giúp bạn quản lý đơn hàng, voucher và
                        thông tin giao nhận trong một không gian thông minh.
                    </p>
                    <ul className="hero-highlights">
                        <li>Realtime insight về đơn hàng</li>
                        <li>Sành điệu trên mọi màn hình</li>
                        <li>Hỗ trợ 24/7 của đội ngũ</li>
                    </ul>
                    <div className="hero-metrics">
                        <div>
                            <span className="metric-number">+120K</span>
                            <span className="metric-label">
                                Tài khoản đang hoạt động
                            </span>
                        </div>
                        <div>
                            <span className="metric-number">98%</span>
                            <span className="metric-label">
                                Mức độ hài lòng của khách hàng
                            </span>
                        </div>
                    </div>
                </div>

                <div className="login-card">
                    <div className="tab-switcher">
                        <button
                            type="button"
                            className={`tab-btn ${
                                mode === "login" ? "active" : ""
                            }`}
                            onClick={() => setMode("login")}
                        >
                            Đăng nhập
                        </button>
                        <button
                            type="button"
                            className={`tab-btn ${
                                mode === "signup" ? "active" : ""
                            }`}
                            onClick={() => setMode("signup")}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <p className="tab-description">{descriptionCopy}</p>

                    {mode === "login" ? (
                        <form className="auth-form" onSubmit={handleLoginSubmit}>
                            <div className="input-field">
                                <label htmlFor="login-email">Email</label>
                                <input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={inputValues.email}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="login-password">
                                    Mật khẩu
                                </label>
                                <input
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    value={inputValues.password}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="primary-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                                </button>
                                <button
                                    type="button"
                                    className="ghost-btn"
                                    onClick={() => setMode("signup")}
                                >
                                    Tạo tài khoản
                                </button>
                            </div>
                            <p className="form-note">
                                Cần trợ giúp?{" "}
                                <a href="mailto:support@ecom.vn">
                                    Liên hệ hỗ trợ
                                </a>
                            </p>
                        </form>
                    ) : (
                        <form
                            className="auth-form"
                            onSubmit={handleSignupSubmit}
                        >
                            <div className="input-grid">
                                <div className="input-field">
                                    <label htmlFor="signup-name">
                                        Họ và tên
                                    </label>
                                    <input
                                        id="signup-name"
                                        name="lastName"
                                        type="text"
                                        placeholder="Tran Van A"
                                        value={inputValues.lastName}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="signup-phone">
                                        Số điện thoại
                                    </label>
                                    <input
                                        id="signup-phone"
                                        name="phonenumber"
                                        type="tel"
                                        placeholder="09xx xxx xxx"
                                        value={inputValues.phonenumber}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="signup-email">Email</label>
                                <input
                                    id="signup-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={inputValues.email}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="input-grid">
                                <div className="input-field">
                                    <label htmlFor="signup-password">
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="signup-password"
                                        name="password"
                                        type="password"
                                        placeholder="Ít nhất 8 ký tự"
                                        value={inputValues.password}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="signup-confirm">
                                        Xác nhận
                                    </label>
                                    <input
                                        id="signup-confirm"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        value={inputValues.confirmPassword}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="primary-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang xử lý..." : "Đăng ký"}
                                </button>
                                <button
                                    type="button"
                                    className="ghost-btn"
                                    onClick={() => setMode("login")}
                                >
                                    Tôi đã có tài khoản
                                </button>
                            </div>
                            <p className="form-note">
                                Bằng việc tiếp tục bạn đồng ý với{" "}
                                <a href="/terms">điều khoản sử dụng</a>.
                            </p>
                        </form>
                    )}

                    <div className="social-login">
                        <div className="divider">
                            <span>Hoặc tiếp tục bằng</span>
                        </div>
                        <div className="social-buttons">
                            <button
                                type="button"
                                className="social-btn facebook"
                                onClick={signInwithFacebook}
                                disabled={isLoading}
                                aria-label="Dang nhap bang Facebook"
                            >
                                <span className="icon">f</span>
                                <span>Facebook</span>
                            </button>
                            <button
                                type="button"
                                className="social-btn google"
                                onClick={signInwithGoogle}
                                disabled={isLoading}
                                aria-label="Dang nhap bang Google"
                            >
                                <span className="icon">G</span>
                                <span>Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginWebPage;
