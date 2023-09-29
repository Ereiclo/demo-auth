import { useState } from "react";
import { Link, json } from "react-router-dom";

import "../styles.css";

const Login = ({setToken}) => {

    const [errors, setErrors] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' });



    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        
        const result = await fetch('https://localhost/login', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })


        if(result.status === 400){
            const message = await result.text();
            console.log(message);
            setErrors(true);

        }else {
            const jsonResponse = await result.json();
            console.log(jsonResponse.token);
            setToken(jsonResponse.token);
            setErrors(false);
        }


    };

    // Generate JSX code for error message
    const renderErrorMessage = () =>
        errors && (
            <div className="error">Invalid username or password</div>
    );

    // JSX code for login form
    return (
        <div className="app">
            <div className="login-form" >
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username"
                            autoComplete="username"
                            required value={user.username}
                            onChange={(e) => {
                                console.log('user');
                                setUser({ ...user, username: e.currentTarget.value })
                            }} />
                        {renderErrorMessage()}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password"
                            required autoComplete="current-password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                        />

                        <div>Does not have an account? <Link to={'/register'}>Register</Link></div>

                 
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login;