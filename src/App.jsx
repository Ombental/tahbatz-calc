// import Iframe from "react-iframe";
import "./App.css";
import React from "react";
import Row from "./components/Row";
import SearchBar from "./components/SearchBar";

function App() {
  const [isRavPassShown, setIsRavPassShown] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [profileType, setProfileType] = React.useState("");

  const handleProfileChange = (event) => {
    setProfileType(event.target.value);
    console.log(event.target.value);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const handleAddRow = () => {
    setRows([...rows, {}]);
    // "success" animation, then hide row ==> add row == "next plan"
    // then when finished go to "summary" view
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>מחשבון פרופיל לתחב"צ</p>
      </header>
      {/* use z index to "show" and "hide" */}
      <label>
        Profile
        <select value={profileType} onChange={handleProfileChange}>
          <option value="regular">רגיל</option>
          <option value="student">סטודנט</option>
          <option value="else">אחר</option>
        </select>
      </label>
      {rows.map((row, index) => {
        return (
          <li>
            <Row divId={index} />
            {/* <button onClick={() => handleSubmitRow(index)}>SUBMIT</button> */}
            <button onClick={() => handleDeleteRow(index)}>X</button>
          </li>
        );
      })}
      <button onClick={() => handleAddRow()}>הוספת נסיעה</button>
      <br></br>
      <br></br>
      <SearchBar />
      {/* <button onClick={() => setIsRavPassShown(!isRavPassShown)}>
        TOGGLE RAV PASS
      </button>
      {isRavPassShown && (
        <Iframe
          url="https://prices.ravpass.co.il/"
          width="95%"
          height="700px"
          id="myId"
          display="block"
          position="fixed"
        />
      )} */}
    </div>
  );
}

export default App;
