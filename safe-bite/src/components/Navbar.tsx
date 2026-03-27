import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useAuth } from "../AuthContext";
import { useTheme } from "../useTheme";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="navigation">
            <Link to="/" className="logo">Safe Bite</Link>


            <div className="nav-actions">
                <Link to="/about" className="lnk">About</Link>
                <div className="nav-links">
                {user ? (
                    <Link to="/dashboard" className="lnk">Dashboard</Link>
                ) : null}
            </div>
                {user ? (
                    <button type="button" className="lnk" onClick={handleLogout}>
                        Log out
                    </button>
                ) : (
                    <>
                        <Link to="/signin" className="lnk">Sign in</Link>
                        <Link to="/signup" className="lnk">Sign up</Link>
                    </>
                )}
                <button
                    type="button"
                    className="lnk theme-toggle"
                    onClick={toggle}
                    aria-label="Toggle theme"
                    title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;