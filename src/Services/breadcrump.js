import { useLocation } from "react-router-dom";

const breadcrumbRoutes = {
    "/": "Beranda",
    "/task": "Task List",
    "/brand": "Brand List",
    "/menu": "Menu List",
};

const Breadcrumb = () => {
    const location = useLocation();
    const breadcrumbName = breadcrumbRoutes[location.pathname] || "Unknown Page";
    return (
        <div className="container-fluid border-top">
            <nav className="nav-breadcrumb" aria-label="breadcrumb">
                <div className="breadcrumb mb-0">
                    <div className="breadcrumb-item my-0 w-100 text-muted text-lg">
                        {breadcrumbName}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Breadcrumb;
