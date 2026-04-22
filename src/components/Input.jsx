

export default function Input({ className = "", ...props }) {
    return <input className={`auth-input ${className}`} {...props} />;
}