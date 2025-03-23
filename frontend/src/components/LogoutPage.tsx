import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        // Clear localStorage
        localStorage.clear();

        // Redirect to login page
        navigate("/login");
    }, [navigate]);

    return null;
};

export default LogoutPage;