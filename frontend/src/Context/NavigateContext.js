import { useLocation, useNavigate } from "react-router-dom";

export const Navigate = (path) => {
    const navigate = useNavigate();
    navigate(path, { replace: true });
}

export const NavigateCurrentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    navigate(location.pathname, { replace: true });
}