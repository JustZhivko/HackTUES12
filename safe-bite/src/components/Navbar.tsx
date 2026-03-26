import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="lnk">Home Page</Link>
            <Link to="/signin" className="lnk">Sign in</Link>
            <Link to="/signup" className="lnk">Sign up</Link>
        </nav>
    );
};

export default Navbar;