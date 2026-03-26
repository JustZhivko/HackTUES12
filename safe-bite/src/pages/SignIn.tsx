import './SignIn.css'

function SignIn() {
    return (
        <section className='page sign-in-box'>
            <div className="sign-in">
                <h1 className="sign-in-text">Sign In</h1>
                <div className="email">
                    <input placeholder="email"/>
                </div>
                <div className="password">
                    <input placeholder="password"/>
                </div>
                <button className="login-btn">Sign In</button>
            </div>
        </section>
    )
}

export default SignIn;