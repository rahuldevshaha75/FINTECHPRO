// ================= ForgotPassword.jsx =================
import Input from "../components/Input";
import Button from "../components/Button";
import {Link} from "react-router-dom";

export default function ForgotPassword({ setPage }) {

    const handleSubmit = () => {

    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">Forgot Password</h2>

            <Input type="email" placeholder="Email" className="auth-input"/>

            <Button onClick={handleSubmit} className="auth-btn">Send Link</Button>

            <Link className="auth-single-link" to="/login">Back</Link>
        </div>
    );
}