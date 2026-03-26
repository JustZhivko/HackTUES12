import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="logo">Safe Bite</Link>
            <Link to="/dashboard" className="lnk">Dashboard</Link>
            <Link to="/about" className="lnk">About</Link>
            <Link to="/signin" className="lnk">Sign in</Link>
            <Link to="/signup" className="lnk">Sign up</Link>
        </nav>
    );
};

export default Navbar;