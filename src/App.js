import React from 'react';
import './App.css';

function App() {
  let stravaID = 53580
  let auth = `http://www.strava.com/oauth/authorize?client_id=${stravaID}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read`
  
  return (
    <div className="App">

    </div>
  );
}

export default App;
