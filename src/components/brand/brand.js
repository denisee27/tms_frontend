import React from "react";

const AccountInformation = () => {
    return (
        <div className="row mb-4">
            <div className="col-sm-12 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6 col-sm-12 d-md-flex align-items-center">
                                <h4 className="card-title me-2 mb-md-0 mb-3">
                                    Account Information
                                </h4>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <table className="w-100" cellPadding="5">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        {/* <td>{userData.name}</td> */}
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>:</td>
                                        {/* <td>{userData.email}</td> */}
                                    </tr>
                                    <tr>
                                        <td>Phone Number</td>
                                        <td>:</td>
                                        {/* <td>{userData.phone || "-"}</td> */}
                                    </tr>
                                    <tr>
                                        <td>Role</td>
                                        <td>:</td>
                                        {/* <td>{userData.role}</td> */}
                                    </tr>
                                    <tr>
                                        <td>Job Title</td>
                                        <td>:</td>
                                        {/* <td>{userData.job_title}</td> */}
                                    </tr>
                                    <tr>
                                        <td>Area</td>
                                        <td>:</td>
                                        {/* <td>{userData.area}</td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInformation;
