import './SignUp.css';
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignUp() {
    const navigate = useNavigate();
    const { user, signup } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user, navigate]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await signup(name, email, password);
            navigate("/dashboard");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Sign up failed.";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="page">
            <form className="sign-up" onSubmit={onSubmit}>
                <h1 className="sign-in-text">Sign Up</h1>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        autoComplete="name"
                    />
                </div>
                <div className="email">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        type="email"
                        autoComplete="email"
                    />
                </div>
                <div className="password">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                {error ? (
                    <p style={{ marginTop: "1rem", color: "#ffb4b4" }}>{error}</p>
                ) : null}
                <button className="login-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Sign Up"}
                </button>
            </form>
        </section>
    );
}

export default SignUp;