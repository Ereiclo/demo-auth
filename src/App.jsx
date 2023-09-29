import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import "./styles.css";
import Login from "./components/Login"
import Register from "./components/Register"
import NotFound from "./components/NotFound";
import UserContext from "./UserContext";
import SearchTaxes from "./components/SearchTaxes";


function App() {

  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={token}>
        <Routes>
          <Route path="/">
            {
              token ?  
              <>
              <Route index element={<SearchTaxes />}></Route>
              </> :

              <>
                <Route index element={<><NotFound redirection="sign-in"></NotFound></>}/>
                <Route path="login" element={<Login setToken={setToken}/>} />
                <Route path="register" element={<Register setToken={setToken}/>} />
              </>
            }
         </Route>
         <Route path="*" element={<NotFound redirection={token ? '/' : '/login'}/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

