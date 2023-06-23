import { Link } from "react-router-dom";
import { useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    // set cookies to be empty after logout
    const logout = () => {
        setCookies("access_token", "");
        // also clear the local storage
        window.localStorage.removeItem("userID");
        navigate("/auth");

    };

    return (
    <div className="navbar">
        <Link to="/"> Home</Link>
        <Link to="/create-recipe"> Create Recipe</Link>
        
        {/* not loggedin */}
        {!cookies.access_token ? (
            <Link to="/auth"> Login/Register</Link>
        ) : (
            <>
                <Link to="/saved-recipe"> Saved Recipe</Link>
                <button onClick={ logout }> Logout</button>
            </>
        )}
    </div>
        );

}