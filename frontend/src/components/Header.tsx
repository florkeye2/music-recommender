import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center w-full bg-zinc-950 px-4 py-2">
            <h1 className="text-white text-xl font-bold">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
