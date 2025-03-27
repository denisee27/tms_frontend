import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLoadingService } from '../../Services/loadingservice';
import './sidebar.css';
import { useSidebarService } from '../../Services/sidebarservice';

const Sidebar = () => {
    const { isLoading } = useLoadingService();
    const [isCollapsed, setIsCollapsed] = useState({});
    const { isOpen } = useSidebarService();
    const location = useLocation();
    let navData = [{
        "id": 1,
        "parent_id": null,
        "name": "Asset Class",
        "icon": "category",
        "link": null,
        "action": null,
        "position": 0,
        "status": 1,
        "created_at": "2023-10-17T19:35:54.000000Z",
        "updated_at": "2023-10-17T19:36:33.000000Z",
        "task_count": 0,
        "task_ids": null,
        "childs": [
            {
                "id": 2,
                "parent_id": 1,
                "name": "Class",
                "icon": null,
                "link": "categories",
                "action": [
                    "create",
                    "update",
                    "delete"
                ],
                "position": 0,
                "status": 1,
                "created_at": "2023-10-17T19:36:28.000000Z",
                "updated_at": "2023-10-17T19:36:28.000000Z",
                "task_count": 0,
                "task_ids": [],
                "childs": []
            },
            {
                "id": 3,
                "parent_id": 1,
                "name": "Sub Class",
                "icon": null,
                "link": "sub-categories",
                "action": [
                    "create",
                    "update",
                    "delete"
                ],
                "position": 1,
                "status": 1,
                "created_at": "2023-10-17T19:37:04.000000Z",
                "updated_at": "2023-10-17T19:37:04.000000Z",
                "task_count": 0,
                "task_ids": [],
                "childs": []
            }
        ],
        "parent": null
    },]
    const toggleNav = (index) => {
        setIsCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const isActive = (link) => location.pathname === `/${link}`;

    useEffect(() => {
        const handleResize = () => {
            // Handle resize logic if needed
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ left: !isOpen ? "-1000px" : "" }} className="nav-container position-fixed h-100 mh-100 sidenav d-flex flex-column flex-shrink-0">
            <div className="sidebar-heading p-0 text-center">
                <img src="/logo192.png" alt="Logo" />
            </div>
            {isLoading && (
                <div className="d-flex justify-content-center w-100 pe-md-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <ul className="nav nav-pills flex-column mb-auto mt-1">
                    <div className='nav-item'>
                        <Link to="/dashboard" className="nav-link px-3 align-middle px-0 d-md-flex align-items-center text-center">
                            <i className="material-icons">dashboard</i>
                            Dashboard
                        </Link>
                    </div>
                    {navData.map((nav, i) => (
                        !nav.parent_id && (
                            <li key={i} className="nav-item">
                                {nav.link ? (
                                    <Link to={`/${nav.link}`} className="nav-link px-3 align-middle px-0 d-md-flex align-items-center text-center">
                                        <i className="material-icons">{nav.icon}</i>
                                        {nav.name}
                                        {nav.task_count > 0 && (
                                            <span className="badge bg-danger ms-2">{nav.task_count < 100 ? nav.task_count : '99+'}</span>
                                        )}
                                    </Link>
                                ) : (
                                    <div onClick={() => toggleNav(i)} className={`nav-link px-3 align-middle px-0 d-md-flex align-items-center text-center cursor-pointer child-link ${isCollapsed[i] ? 'a-expanded' : ''}`}>
                                        <i className="material-icons">{nav.icon}</i>
                                        <span className="position-relative d-flex justify-content-between w-75">
                                            <div style={{ fontSize: "16px" }}>{nav.name}</div>
                                            {nav.task_count > 0 && (
                                                <span className="mt-2 translate-middle p-1 bg-danger border border-light rounded-circle ms-1">
                                                    <span className="visually-hidden">New alerts</span>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                )}
                                {nav.childs?.length > 0 && (
                                    <ul className={`sub-child ps-3 ${isCollapsed[i] ? 'expanded' : ''}`} data-index={i}>
                                        {nav.childs.map((child, j) => (
                                            child.link && (
                                                <li key={j} className={`nav-item sub-nav border-top rounded ${isActive(child.link) ? 'active' : ''}`}>
                                                    <Link to={`/${child.link}`} className="nav-link align-middle px-0 d-md-flex align-items-center text-center">
                                                        <i className="material-icons">{child.icon}</i>
                                                        {child.name}
                                                        {child.task_count > 0 && (
                                                            <span className="badge bg-danger ms-2">{child.task_count < 100 ? child.task_count : '99+'}</span>
                                                        )}
                                                    </Link>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    ))}
                    <li className="nav-item">
                        <a href="/manual_book.pdf" target="_blank" className="nav-link px-3 align-middle px-0 d-md-flex align-items-center text-center">
                            <i className="material-icons">help</i>
                            Help
                        </a>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
