import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "../styles.css";
import UserContext from "../UserContext";

const SearchTaxes = () => {

    const userToken = useContext(UserContext);
    const [errors, setErrors] = useState(false);
    const [name, setName] = useState('');
    const [taxes,setTaxes] = useState([]);



    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        
        const result = await fetch(`https://localhost/monthly-taxes?q=${name}`, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });


        if(result.status === 400){
            const message = await result.text();
            console.log(message);
            setErrors(true);

        }else {
            const taxesResults = await result.json();
            console.log(taxesResults);

            setTaxes(taxesResults);
            setErrors(false);
        }


    };

    // JSX code for login form
    return (
        <div className="app">
            <div className="login-form" >
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Name: </label>
                        <input type="text" 
                            required value={name}
                            onChange={(e) => {
                                setName(e.currentTarget.value);
                            }} />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>

                <div style={{marginTop: '20px'}}>
                {
                    taxes.map((elem,index) => {
                        return (<div key={index}>
                            <div className="elem">
                                {elem.company_name}: {elem.payment}
                            </div>
                        </div>);
                    })
                }
                </div>
            </div>
        </div>
    );

}

export default SearchTaxes;