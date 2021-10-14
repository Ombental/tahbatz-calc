// import Iframe from "react-iframe";
import "./App.css";
import React from "react";
import Trip from "./components/Trip";
import { applyMotDiscount, createSortedProfiles } from "./utils";

function App() {
  const [trips, setTrips] = React.useState([]);
  const [finalCalcData, setFinalCalcData] = React.useState(null);
  const [finalCalcOngoing, setFinalCalcOngoing] = React.useState(false);
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
    setFinalCalcOngoing(true);
    const motSum =
      applyMotDiscount(
        trips.reduce((a, b) => a + b.ravPassPrice[profileType], 0)
      ) * 12;
    const ravKavSum =
      trips.reduce((a, b) => a + b.ravKavPrice[profileType], 0) * 12;
    const tempFirstCheapestShareCode = trips[0].cheapestProfile.shareCode;
    let tempYearlyProfile = {};
    if (
      trips.every(
        (trip) => trip.cheapestProfile.shareCode === tempFirstCheapestShareCode
      )
    ) {
      tempYearlyProfile = {
        shareCode: trips[0].cheapestProfile.shareCode,
        price: trips[0].cheapestProfile[profileType],
      };
    } else {
      // PER PROFILE CREATE PROFILE+RAVPASS ==> take profile, remove all trips that have this profile
      // write profile + price. remaining trips -> add new line with remaining rav pass price (add sum?)
      const tempFirstAllProfiles = createSortedProfiles(trips[0].allProfiles);
      for (const profile of tempFirstAllProfiles) {
        if (
          trips.every((trip) => Object.keys(trip.allProfiles).includes(profile))
        ) {
          tempYearlyProfile = {
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
      yearlyProfile: tempYearlyProfile,
    });
    setFinalCalcOngoing(false);
  };
  if (finalCalcData !== null) {
    return (
      <div className="App">
        <header className="App-header">
          <p>אני בשחריה ורוצה לקחת אחריות על התקציב נסיעות</p>
        </header>
        {/* <label>
          פרופיל
          <select value={profileType} onChange={handleProfileChange}>
            <option value="regular">רגיל</option>
            <option value="student">סטודנט</option>
            <option value="else">אחר</option>
          </select>
        </label>
        <br></br>
        <br></br> */}
        <div>
          <h1>הסכומים השנתיים הם</h1>
          <p>ערך צבור: {finalCalcData.ravKavSum}₪</p>
          <p>רב-פס(אפליקציה): {finalCalcData.motSum}₪</p>
          <p>
            חופשי שנתי סטודנטיאלי: {finalCalcData.yearlyProfile.price}₪{" "}
            <br></br>
            {finalCalcData.yearlyProfile.shareCode} קוד פרופיל
          </p>
        </div>
        <br></br>
        {/* <button onClick={() => setFinalCalcData(null)}>
          אחלה, אני תכלס רוצה לערוך שוב
        </button> */}
      </div>
    );
  } else if (finalCalcOngoing) {
    <div className="App">
      <header className="App-header">
        <p>אני בשחריה ורוצה לקחת אחריות על התקציב נסיעות</p>
      </header>
      <div className="final-calc-loading">מחשב חישוב אחרון</div>
    </div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <p>אני בשחריה ורוצה לקחת אחריות על התקציב נסיעות</p>
        </header>
        {/* <label>
          פרופיל
          <select value={profileType} onChange={handleProfileChange}>
            <option value="regular">רגיל</option>
            <option value="student">סטודנט</option>
            <option value="else">אחר</option>
          </select>
        </label> */}
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
