import React from 'react';
import useAuthStore from "../../stores/authStore";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const authStore = useAuthStore();

    const handleLogout = () => {
        authStore.logout();
        onLogout();
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;