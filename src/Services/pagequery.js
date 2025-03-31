import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageQueryContext = createContext();

export const PageQueryProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [queryPage, setQueryPage] = useState({ q: null, limit: 10, page: 1 });
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const newQuery = {};

        searchParams.forEach((value, key) => {
            newQuery[key] = value;
        });

        setQueryPage((prevQuery) => ({
            ...prevQuery,
            ...newQuery,
        }));
        setIsSearch(newQuery.q || false);
    }, [location.search]);

    const changeRoute = (params) => {
        const newParams = new URLSearchParams(params).toString();
        navigate(`${location.pathname}?${newParams}`, { replace: true });
    };

    const searchData = (event) => {
        if (event?.keyCode === 27) {
            changeRoute({ page: 1, q: "" });
            setIsSearch(false);
            setQueryPage((prev) => ({ ...prev, q: null }));
        }
        if (event?.keyCode === 13) {
            changeRoute({ page: 1, q: queryPage.q });
        }
    };

    return (
        <PageQueryContext.Provider value={{ queryPage, isSearch, setQueryPage, searchData, changeRoute }}>
            {children}
        </PageQueryContext.Provider>
    );
};

export const usePageQueryService = () => useContext(PageQueryContext);
