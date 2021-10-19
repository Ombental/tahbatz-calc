import "./App.css";
import React from "react";
import Trip from "./components/Trip";
import {
  applyMotDiscount,
  getComplexPrices,
  getTempYearlyProfile,
  normalize,
} from "./utils";
import { FaTrash, FaPlus, FaCalculator } from "react-icons/fa";

function App() {
  const [trips, setTrips] = React.useState([]);
  const [finalCalcData, setFinalCalcData] = React.useState(null);
  const [finalCalcOngoing, setFinalCalcOngoing] = React.useState(false);
  const [canAddTrip, setCanAddTrip] = React.useState(true);
  const [profileType, setProfileType] = React.useState("student");
  const [loadingTripData, setLoadingTripData] = React.useState(false);

  const handleProfileChange = (event) => {
    // setProfileType(event.target.value);
    console.log(event.target.value);
  };

  const handleDeleteTrip = (index) => {
    const newTrips = [...trips];
    newTrips.splice(index, 1);
    setTrips(newTrips);
    setCanAddTrip(true);
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

    const tempYearlyProfile = getTempYearlyProfile(trips, profileType);

    const allComplexPrices = getComplexPrices(
      trips,
      profileType,
      tempYearlyProfile.shareCode
    );

    setFinalCalcData({
      motSum: motSum,
      ravKavSum: ravKavSum,
      yearlyProfile: tempYearlyProfile,
      complexPrices: allComplexPrices,
    });

    setFinalCalcOngoing(false);
  };
  console.log(trips);
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
          <p>ערך צבור: {normalize(finalCalcData.ravKavSum)}₪</p>
          <p>רב-פס(אפליקציה): {normalize(finalCalcData.motSum)}₪</p>
          <p>
            חופשי שנתי סטודנטיאלי:{" "}
            {normalize(finalCalcData.yearlyProfile.price)}₪ <br></br>
            {finalCalcData.yearlyProfile.shareCode} קוד פרופיל
          </p>
        </div>
        <br></br>
        <hr></hr>
        <br></br>
        <h3>הוצאות משולבות (פרופיל שנתי + רב פס)</h3>
        <div>
          {finalCalcData.complexPrices.map((complexPrice) => {
            return (
              <>
                <p className="complex-price-box">
                  קוד פרופיל: {complexPrice.shareCode}, מחיר פרופיל:{" "}
                  {normalize(complexPrice.shareCodePrice)}₪<br></br>
                  מחיר רב פס: {normalize(complexPrice.ravPassPrice)}₪ |{"  "}
                  סה"כ עם רב פס {"  "}
                  {normalize(
                    complexPrice.ravPassPrice + complexPrice.shareCodePrice
                  )}
                  ₪<span className="give-me-some-space"></span> מחיר רב קו:{" "}
                  {normalize(complexPrice.ravKavPrice)}₪ |{"  "}
                  סה"כ עם רב קו {"  "}
                  {normalize(
                    complexPrice.ravKavPrice + complexPrice.shareCodePrice
                  )}
                  ₪
                </p>
              </>
            );
          })}
        </div>
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
        <ul>
          {trips.map((trip, index) => {
            return (
              <li>
                <Trip
                  key={index}
                  tripId={index}
                  handleUpdateTrip={handleUpdateTrip}
                  setCanAddTrip={setCanAddTrip}
                  setLoadingTripData={setLoadingTripData}
                />
                <button
                  className="remove-button custom-button"
                  onClick={() => handleDeleteTrip(index)}
                >
                  <FaTrash />
                </button>
                <hr></hr>
              </li>
            );
          })}
        </ul>
        {loadingTripData && <h1>LOADING</h1>}
        {(canAddTrip || trips.length === 0) && (
          <button
            className="add-button custom-button"
            onClick={() => handleAddTrip()}
          >
            <FaPlus />
          </button>
        )}
        <br></br>
        <br></br>
        <br></br>
        {canAddTrip && trips.length > 0 && (
          <button onClick={handleFinalCalc} className="calc-button">
            <FaCalculator className="calc-icon" />
            <p className="calc-text">
              יאללה <br />
              מה ההמלצות?
            </p>
          </button>
        )}
      </div>
    );
  }
}

export default App;
