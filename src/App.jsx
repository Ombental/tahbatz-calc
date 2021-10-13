// import Iframe from "react-iframe";
import "./App.css";
import React from "react";
import Trip from "./components/Trip";
import { applyMotDiscount, createSortedProfiles } from "./utils";

function App() {
  const [trips, setTrips] = React.useState([]);
  const [finalCalcData, setFinalCalcData] = React.useState(null);
  const [canAddTrip, setCanAddTrip] = React.useState(true);
  const [profileType, setProfileType] = React.useState("student");

  const handleProfileChange = (event) => {
    // setProfileType(event.target.value);
    console.log(event.target.value);
  };

  const handleDeleteTrip = (index) => {
    const newTrips = [...trips];
    newTrips.splice(index, 1);
    setTrips(newTrips);
  };

  const handleAddTrip = () => {
    // console.log(newTripId)
    setTrips([...trips, {}]);
    setCanAddTrip(false);
    // "success" animation, then hide row ==> add row == "next plan"
    // then when finished go to "summary" view
  };

  const handleUpdateTrip = (index, trip) => {
    const newTrips = [...trips];
    newTrips[index] = trip;
    setTrips(newTrips);
    setCanAddTrip(true);
  };

  const handleFinalCalc = () => {
    const motSum =
      applyMotDiscount(
        trips.reduce((a, b) => a + b.ravPassPrice[profileType], 0)
      ) * 12;
    const ravKavSum =
      trips.reduce((a, b) => a + b.ravKavPrice[profileType], 0) * 12;
    const tempFirstCheapestShareCode = trips[0].cheapestProfile.shareCode;
    let yearlyProfile = {};
    if (
      trips.every(
        (trip) => trip.cheapestProfile.shareCode === tempFirstCheapestShareCode
      )
    ) {
      yearlyProfile = {
        shareCode: trips[0].cheapestProfile[profileType],
        price: trips[0].cheapestProfile.shareCode,
      };
    } else {
      console.log(trips);
      const tempFirstAllProfiles = createSortedProfiles(trips[0].allProfiles);
      for (const profile of tempFirstAllProfiles) {
        if (
          trips.every((trip) => Object.keys(trip.allProfiles).includes(profile))
        ) {
          yearlyProfile = {
            shareCode: profile,
            price: trips[0].allProfiles[profile][profileType],
          };
          break;
        }
      }
    }
    setFinalCalcData({
      motSum: motSum,
      ravKavSum: ravKavSum,
      yearlyProfile: {
        price: yearlyProfile.price,
        shareCode: yearlyProfile.shareCode,
      },
    });
  };
  console.log(finalCalcData !== null);
  if (finalCalcData !== null) {
    console.log("WTF");
    return (
      <div className="App">
        <header className="App-header">
          <p>מחשבון פרופיל לתחב"צ</p>
        </header>
        <label>
          פרופיל
          <select value={profileType} onChange={handleProfileChange}>
            <option value="regular">רגיל</option>
            <option value="student">סטודנט</option>
            <option value="else">אחר</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <div>
          <p>ערך צבור: {finalCalcData.ravKavSum}</p>
          <p>רב-פס(אפליקציה): {finalCalcData.motSum}</p>
          <p>
            חופשי שנתי סטודנטיאלי: (קוד פרופיל){" "}
            {finalCalcData.yearlyProfile.shareCode} ||{" "}
            {finalCalcData.yearlyProfile.price}
          </p>
        </div>
        <br></br>
        {/* <button onClick={() => setFinalCalcData(null)}>
          אחלה, אני תכלס רוצה לערוך שוב
        </button> */}
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <p>מחשבון פרופיל לתחב"צ</p>
        </header>
        <label>
          פרופיל
          <select value={profileType} onChange={handleProfileChange}>
            <option value="regular">רגיל</option>
            <option value="student">סטודנט</option>
            <option value="else">אחר</option>
          </select>
        </label>
        {trips.map((trip, index) => {
          return (
            <li>
              <Trip
                key={index}
                tripId={index}
                handleUpdateTrip={handleUpdateTrip}
              />
              {/* <button onClick={() => handleSubmitRow(index)}>SUBMIT</button> */}
              <button onClick={() => handleDeleteTrip(index)}>X</button>
            </li>
          );
        })}
        {canAddTrip && (
          <button onClick={() => handleAddTrip()}>הוספת נסיעה</button>
        )}
        <br></br>
        <br></br>
        <br></br>
        {canAddTrip && trips.length > 0 && (
          <button onClick={handleFinalCalc}>חישוב סופי</button>
        )}
      </div>
    );
  }
}

export default App;
