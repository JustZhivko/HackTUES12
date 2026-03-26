import './SignUp.css';

function SignUp () {
    return (
        <section className="page">
            <div className="sign-up">
                <h1 className="sign-in-text">Sign Up</h1>
                <div>
                    <input placeholder='name'/>
                </div>
                <div className="email">
                    <input placeholder="email"/>
                </div>
                <div className="password">
                    <input placeholder="password"/>
                </div>
                <button className="login-btn">Sign Up</button>
            </div>
        </section>
    )

}

export default SignUp;