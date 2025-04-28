import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingService } from "../../services/loadingservice";
import { useAuthService } from "../../services/authservice";
import { swalToastError } from "../../services/alertswal";


const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false);
    const { loading } = useLoadingService();
    const { login } = useAuthService();
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};
        if (!form.email) {
            newErrors.email = "Type Email";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = "Email isn't valid";
        }
        if (!form.password) {
            newErrors.password = "Type password";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(form.email, form.password)
                .then((res) => {
                    if (res.success) {
                        navigate('/')
                    } else {
                        if (res.response && res.response.wrong) {
                            const newErrors = {};
                            Object.keys(res.response.wrong).forEach((key) => {
                                console.log(key)
                                newErrors[key] = res.response.wrong[key];
                                const inputEl = document.querySelector(`[name="${key}"]`);
                                if (inputEl) inputEl.focus();
                            });
                            setErrors(newErrors);
                            return
                        }
                        swalToastError(res.response);
                    }
                })
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-5 mx-auto p-5">
                <div className="card m-md-4 shadow">
                    <div className="card-body">
                        <div className="d-flex">
                            <div className="p-3">
                                <img src="/logo192.png" width={'80px'} alt="icon" />
                            </div>
                            <div>
                                <h2 className="fw-bold pt-3">TMS Login {loading ? 'true' : 'false'}</h2>
                                <p className="text-muted fw-bold">Type your Email &amp; Password.</p>
                            </div>
                        </div>
                        <form className="p-3 col-12" onSubmit={handleSubmit} noValidate>
                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    placeholder="name@example.com"
                                    required
                                />
                                <label>Email</label>
                                {errors.email && <div className="text-danger position-absolute text-end w-100 small">{errors.email}</div>}
                            </div>

                            <div className="mb-4 input-group w-100">
                                <div className="form-floating col-10">
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Password"
                                        required
                                    />
                                    <label>Password</label>
                                    {errors.password && <div className="text-danger position-absolute text-end w-100 small">{errors.password}</div>}
                                </div>
                                <div className="input-group-text col-2" style={{ cursor: "pointer" }}>
                                    <span onClick={() => setIsShowPassword(!isShowPassword)} className="material-icons ms-2">
                                        {isShowPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between">
                                <div className="col-md-4 col-sm-12">
                                    <button type="submit" disabled={loading} className="btn btn-primary py-2 px-4 w-100">
                                        Login
                                    </button>
                                </div>
                                <div className="col-md-4 col-sm-12 mt-md-0 mt-3 text-center text-md-end d-md-flex align-items-center justify-content-end">
                                    <a className={`btn-link text-nowrap ${loading ? "disabled" : ""}`} href="https://www.google.co.id/?hl=id" target="_blank" rel="noopener noreferrer">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <hr />
                                Don't have an account? <b><a href="https://www.google.co.id/?hl=id">Register Here</a></b>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;