// import Iframe from "react-iframe";
import "./App.css";
import React from "react";
import Trip from "./components/Trip";

function App() {
  const [trips, setTrips] = React.useState([]);
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

  console.log(trips);
  return (
    <div className="App">
      <header className="App-header">
        <p>מחשבון פרופיל לתחב"צ</p>
      </header>
      <label>
        Profile
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
        <button onClick={() => alert("final Calc")}>FINAL CALC</button>
      )}
    </div>
  );
}

export default App;
