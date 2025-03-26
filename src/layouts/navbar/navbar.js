import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(true);
  let sidenav = false;
  let notif = { "count": "0" }
  const handleLogout = async () => {
    setLoadingLogout(true);
    setLoadingLogout(false);
  };

  return (
    <nav className={`navbar flex-wrap navbar-expand-lg bg-white border-bottom fixed-top p-1 ${sidenav.status === false ? 'left-0' : ''}`}>
      <div className="container-fluid">
        <button className="btn text-primary border-0 p-0 shadow-none" title="Toggle Menu" onClick={sidenav.toggle}>
          <span className="material-icons m-0">menu</span>
          <span className="visually-hidden">Toggle Menu</span>
        </button>

        <div className="d-flex p-2 align-items-center">
          <div className="border-end me-2 pe-2">
            <button className="btn border-0 notif-dropdown position-relative" onClick={() => setShowNotif(!showNotif)}>
              <span className="material-icons fs-2">notifications_none</span>
              {notif.count > 0 && (
                <span className="position-absolute notif-count d-flex top-0 mt-1 ms-3 bg-danger text-white rounded-circle justify-content-center text-center align-items-center">
                  {notif.count > 99 ? '99+' : notif.count}
                </span>
              )}
            </button>
            {/* {showNotif && (
              <div className="b-dropdown" style={{ width: '256px', maxHeight: '100vh', overflowX: 'auto' }}>
                {notif.isLoading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <ul className="notif-list">
                    {notif.list.length === 0 ? (
                      <li className="text-center py-3"><em>No notification</em></li>
                    ) : (
                      notif.list.map((n) => (
                        <li key={n.id}>
                          <a className={`dropdown-item d-block ${!n.is_read ? 'fw-bold' : ''}`} onClick={() => notif.gotoUrl(n)}>
                            <div className="text-wrap">{n.title}</div>
                            <div className="small text-wrap text-muted">{n.description}</div>
                            <div className="text-end time mt-1">{n.created_at}</div>
                          </a>
                        </li>
                      ))
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item btn-link justify-content-center" href="/notifications">
                        View all notifications
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )} */}
          </div>

          {/* User Menu */}
          <div className="d-flex nav-item">
            <a href='/' className="nav-link dropdown-toggle d-flex align-items-center justify-content-center pb-2" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="me-2">
                {/* <img src={userData.avatar} alt="avatar" width="42" height="42" className="rounded-circle" /> */}
              </div>
              <div className="w-75 pe-2">
                {/* <div className="text-truncate">{userData.name}</div> */}
                {/* <div className="small text-muted fw-bold text-truncate">{userData.job_title || userData.role}</div> */}
              </div>
            </a>
            {showUserMenu && (
              <ul className="b-dropdown" style={{ width: '256px' }}>
                <li>
                  <div className="d-flex p-2 align-items-center">
                    <div className="w-25">
                      {/* <img src={userData.avatar} alt="avatar" width="48" height="48" className="rounded-circle" /> */}
                    </div>
                    <div className="w-75">
                      {/* <div className="fw-bold text-nowrap text-truncate">{userData.name}</div>
                      <div className="text-nowrap text-truncate small">{userData.job_position}</div>
                      <div className="text-nowrap text-truncate small">{userData.email}</div> */}
                    </div>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="/account">
                    <span className="material-icons">account_circle</span> Account
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item btn-link" onClick={handleLogout}>
                    {loadingLogout ? (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <><span className="material-icons">logout</span> Logout</>
                    )}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;