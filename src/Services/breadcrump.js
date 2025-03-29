import { useLocation } from "react-router-dom";

const breadcrumbRoutes = {
    "/": "Beranda",
    "/task": "Task List",
    "/brand": "Brand List",
};

const Breadcrumb = () => {
    const location = useLocation();
    const breadcrumbName = breadcrumbRoutes[location.pathname] || "Tidak Diketahui";

    return (
        <div className="container-fluid my-0 w-100 text-muted text-lg border-top">
            {breadcrumbName}
        </div>
    );
};

export default Breadcrumb;
