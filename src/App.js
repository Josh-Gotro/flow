import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState();


  //Credentials
  let clientID = "53580";
  let clientSecret = "5f77952f808641b8eefdc45602e60052ee6b15df";
  // let accessToken = "3d3f0766b91a64aba4d12eebfff1e829eb3c5adc";

  // refresh token and call address
  let refreshToken = "41e1e358ee38cb1cbb99d3a9dd75cee3ae283310";
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  // Call for all activities, be sure access_token is not expired
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`

  useEffect(() => {
    fetch(callRefresh, {
      method: 'POST'
    })
    .then((res) => res.json())
    .then((result) => {
      setAccessToken(result.access_token)
    })
  })

  function getActivities(){
    if(accessToken){
      fetch(callActivities)
      .then((res)=> console.log(res.json()))
    }
  }

  return (
    <div className="App">
      {getActivities()}
        STRAVAAAAA FOR THE FLOWWWWWW
    </div>
  );
}

export default App;


// http://www.strava.com/oauth/authorize?client_id=53580&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
// 19d8bcfb85a90b6758bee214badd34d8583ec15a
// 4ab917fc00cfd41304680247d26c3575b367156b
// 3efc7a520665fea99aa0fb41455a7b381412ff85
// 7cdb485ffd3cad0a3599d1088694713604e15fa5
// 7f3d0a37c1a955e2d4608dfecab6173f475beca8

// https://www.strava.com/oauth/token?client_id=53580&client_secret=5f77952f808641b8eefdc45602e60052ee6b15df&code=7f3d0a37c1a955e2d4608dfecab6173f475beca8&grant_type=authorization_code
// accessToken: 3d3f0766b91a64aba4d12eebfff1e829eb3c5adc





// REFRESH CALL RETURNS CURRENT ACCESS TOKEN AND EXPIRY
// {
//   "token_type": "Bearer",
//   "access_token": "3d3f0766b91a64aba4d12eebfff1e829eb3c5adc",
//   "expires_at": 1601436244,
//   "expires_in": 20969,
//   "refresh_token": "41e1e358ee38cb1cbb99d3a9dd75cee3ae283310"
// }
