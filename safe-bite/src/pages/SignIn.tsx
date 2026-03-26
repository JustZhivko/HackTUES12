import './SignIn.css'
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

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
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Sign in failed.";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className='page sign-in-box'>
            <form className="sign-in" onSubmit={onSubmit}>
                <h1 className="sign-in-text">Sign In</h1>
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
                        autoComplete="current-password"
                    />
                </div>
                {error ? <p style={{ marginTop: "1rem", color: "#ffb4b4" }}>{error}</p> : null}
                <button className="login-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </section>
    );
}

export default SignIn;