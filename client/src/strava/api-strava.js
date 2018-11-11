const getStravaByUser = (params) => {
  return fetch(`https://www.strava.com/api/v3/athletes/${params.stravaId}/stats?access_token=${params.stravaToken}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}


const getStravaRaceData= (params) =>{

       let theDate = new  Date(params.raceDate);
       let theEpoch = theDate.getTime()/1000.0;
//       console.log(theDate)
    return fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${params.stravaToken}&after=${theEpoch}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },


    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }


export {
  getStravaByUser,
  getStravaRaceData
}
