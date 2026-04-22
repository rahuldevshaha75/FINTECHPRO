// ================= Signup.jsx =================
import Input from "../components/Input";
import Button from "../components/Button";
import {Link} from "react-router-dom";

export default function Signup({ setPage }) {
    return (
        <div className="auth-card">
            <h2 className="auth-title">Signup</h2>

            <Input placeholder="Full Name" className="auth-input"/>
            <Input type="email" placeholder="Email" className="auth-input"/>
            <Input type="password" placeholder="Password" className="auth-input"/>

            <Button className="auth-btn">Create Account</Button>

            <Link className="auth-single-link" to="/login">Already have account?</Link>
        </div>
    );
}