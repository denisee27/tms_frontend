import React, { useState } from 'react';
import './navbar.css';
import { useSidebarService } from '../../services/sidebarservice';
import { Button, Dropdown, Modal, } from 'react-bootstrap';
import { useLoadingService } from '../../services/loadingservice';
import Avatar from '../avatar';
import Breadcrumb from '../../services/breadcrump';
import { Link } from 'react-router-dom';
import { useAuthService } from '../../services/authservice';

const Navbar = () => {
  const { isLoading } = useLoadingService();
  const { logout } = useAuthService();
  const [showNotif, setShowNotif] = useState(false);
  const { isOpen, toggle } = useSidebarService();
  let notif = { "count": "0" }

  const handleSubmitLogout = async () => {
    logoutCloseModal();
    logout()
  }

  const [logoutShow, logoutShowState] = useState(false);
  const logoutCloseModal = () => logoutShowState(false);
  const handleLogout = () => {
    logoutShowState(true);
  };

  return (
    <>
      <nav style={{ left: !isOpen ? "0" : '' }} className={`navbar flex-wrap navbar-expand-lg bg-white fixed-top p-1 ${!isOpen ? 'left-0' : ''}`}>
        <div className="container-fluid ">
          <div className='d-flex align-items-center justify-content-between w-100'>
            <button className="btn text-primary border-0 p-0 shadow-none" title="Toggle Menu" onClick={toggle}>
              <span className="material-icons m-0">menu</span>
              <span className="visually-hidden">Toggle Menu</span>
            </button>
            <div className='d-flex align-items-center justify-content-end'>
              <div className="border-end">
                <button className="btn border-0 notif-dropdown position-relative" onClick={() => setShowNotif(!showNotif)}>
                  <span className="material-icons fs-3">notifications_none</span>
                  {notif.count > 0 && (
                    <span className="position-absolute notif-count d-flex top-0 mt-1 ms-3 bg-danger text-white rounded-circle justify-content-center text-center align-items-center">
                      {notif.count > 99 ? '99+' : notif.count}
                    </span>
                  )}
                </button>
              </div>
              <Dropdown className='d-flex nav-item'>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <div style={{ borderRadius: "20px" }} className="nav-link dropdown-toggle d-flex align-items-center justify-content-center text-primary">
                    <div className="me-2">
                      <Avatar userData={{ profile_pic: null, name: 'denise', initials: 'DE' }} height={45} width={45} />
                    </div>
                    <div className="w-75 pe-2">
                      <div className="text-truncate">Denise Aldianto</div>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='me-2' style={{ width: "256px" }}>
                  <Dropdown.Item href="#/action-1">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="w-25 me-2">
                        <Avatar userData={{ profile_pic: null, name: 'denise', initials: 'DE' }} height={45} width={45} />
                      </div>
                      <div className="w-75" style={{ fontSize: "15px" }}>
                        <div className="fw-bold text-nowrap text-truncate">Denise Aldianto</div>
                        <div className="text-nowrap text-truncate small">Application Engineer</div>
                        <div className="text-nowrap text-truncate small">denis@demo.com</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                  <Dropdown.Item as={Link} to="/account" >
                    <div className="text-primary">
                      <span className="material-icons">account_circle</span> Account
                    </div>
                  </Dropdown.Item>
                  <hr className="dropdown-divider" />
                  <Dropdown.Item>
                    {isLoading ? (
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span onClick={() => handleLogout()}><div className="material-icons">logout</div> Logout</span>
                    )}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <Breadcrumb className="w-100" />
      </nav>
      <Modal
        show={logoutShow}
        onHide={logoutCloseModal}
        backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={logoutCloseModal}>Close</Button>
          <Button variant="danger" onClick={handleSubmitLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;