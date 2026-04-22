// ================= Login.jsx =================
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login({ setPage }) {

    const handleLogin = () => {
        toast.success("Success!");
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">Login</h2>

            <Input type="email" placeholder="Email" required className="auth-input"/>
            <Input type="password" placeholder="Password" required className="auth-input"/>

            <Button onClick={handleLogin} className="auth-btn">Login</Button>

            <div className="auth-links">
                <Link to="/forget-pass">Forgot?</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}