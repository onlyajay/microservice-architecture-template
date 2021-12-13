import React, { useEffect, useState } from 'react';
import './App.css';
import getToken from "./auth/auth";
import Routes from './Routes';
import { Loading } from "./components/templates/Loading";
function App() {
  console.disableYellowBox = true;
  // Use state to re-render the Table when Token is available
  // Sometimes Token is not present in session and has to be obtained by API call
  const [jwt, setJwt] = useState(undefined);

  // If the Token is not available in Session, request it from the API.
  // You can use this to Authenticate.

  useEffect(() => {
    getToken(setJwt, "onlyajay@hotmail.com", "123");
  }, []);

  if (jwt) {
    return (<div className="App">
      <Routes />
    </div>
    );
  } else {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;