import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles.css";

const Login = ({setToken}) => {

    const [errorText, setErrorText] = useState('');
    const [user, setUser] = useState({ username: '', password: '', confirm_password: '' });



    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();


        if (user.confirm_password !== user.password) {

            setErrorText('Password does not match');

        } else {
            const result = await fetch('https://localhost/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username: user.username, password: user.password})
            })


            if (result.status === 400) {
                const message = await result.text();
                setErrorText('Username already exists');

            } else {
                console.log(await result.text());

                const result_token = await fetch('https://localhost/login', { 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                })


                const jsonResponse = await result_token.json();
                console.log(jsonResponse.token);
                setToken(jsonResponse.token);





                setErrorText('');
            }




        }




    };

    // Generate JSX code for error message
    const renderErrorMessage = () =>
        errorText !== '' && (
            <div className="error">{errorText}</div>
        );

    // JSX code for login form
    return (
        <div className="app">
            <div className="login-form" >
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text"
                            name="username"
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
                            required autoComplete="new-password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.currentTarget.value })}
                        />
                    </div>

                    <div className="input-container">
                        <label>Confirm Password </label>
                        <input type="password"
                            required autoComplete="new-password"
                            value={user.confirm_password}
                            onChange={(e) => setUser({ ...user, confirm_password: e.currentTarget.value })}
                        />
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