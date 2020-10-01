import React, { useState, useEffect } from 'react';
import './CSS/App.css';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState({})

  //Strava Credentials
  let clientID = "53580";
  let clientSecret = "5f77952f808641b8eefdc45602e60052ee6b15df";

  // refresh token and call address
  let refreshToken = "41e1e358ee38cb1cbb99d3a9dd75cee3ae283310";
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  // endpoint for read-all activities. temporary token is added in getActivities()
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`

  // Use refresh token to get current access token
  useEffect(() => {
    fetch(callRefresh, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [callRefresh])

  // use current access token to call all activities
  function getActivities(access){
    console.log(callActivities + access)
      fetch(callActivities + access)
      .then(res => res.json())
      .then(data => setActivities(data), setIsLoading(prev => !prev))
      .catch(e => console.log(e))
  }

  function showActivities(){
    if(isLoading) return <div>LOADING</div>
    if(!isLoading) return <div>GOTCHA BOOTY</div>
  }

  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default App;

// REFRESH CALL RETURNS CURRENT ACCESS TOKEN AND EXPIRY
// {
//   "token_type": "Bearer",
//   "access_token": "3d3f0766b91a64aba4d12eebfff1e829eb3c5adc",
//   "expires_at": 1601436244,
//   "expires_in": 20969,
//   "refresh_token": "41e1e358ee38cb1cbb99d3a9dd75cee3ae283310"
// }
