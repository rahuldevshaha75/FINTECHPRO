export default function Button({ className = "", children, ...props }) {
    return (
        <button className={`auth-btn ${className}`} {...props}>
            {children}
        </button>
    );
}