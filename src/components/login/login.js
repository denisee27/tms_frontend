import React, { useState } from "react";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        if (!form.email) {
            newErrors.email = "Type Nip";
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
            setLoading(true);
            // Submit logic here
            console.log("Form submitted", form);
            setLoading(false);
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
                                <h2 className="fw-bold pt-3">TMS Login</h2>
                                <p className="text-muted fw-bold">Type your NIP &amp; Password.</p>
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
                                <label>NIP</label>
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