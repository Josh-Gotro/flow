import React, { useState, useEffect } from 'react';
import DayCard from './DayCard.js';
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
    // console.log(callActivities + access)
      fetch(callActivities + access)
      .then(res => res.json())
      .then(data => setActivities(data), setIsLoading(prev => !prev))
      .catch(e => console.log(e))
  }

  function showActivities(){
    if(isLoading) return <>LOADING</>
    if(!isLoading) {
      activityCards();
    }
  }

  function activityCards(){
    return activities.length > 0 && activities.map(act => {
      // console.log(act.start_date)
      let temp = act.start_date
      let curDay = [];

      if(act.start_date === temp) {
        console.log("date is temp")
        curDay.push(act)
        console.log(act)
      }
        if(act.start_date > temp){
          temp = act.start_date;
          return <DayCard key={curDay[0].start_date} act={curDay} />
      }
    })
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

// "2020-10-03T16:26:50Z"
//  YYYY-MM-DD'T'HH:MM:SS'Z'
// T is 
// Z is timezone