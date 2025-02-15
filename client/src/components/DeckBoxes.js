import React, { useState } from 'react';
import UINDropdown from './UINDropdown'; // Assuming you have UINDropdown component
import axios from 'axios';

const DeckBoxes = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [activeDeck, setActiveDeck] = useState(null);
  const [sportsPasses, setSportsPasses] = useState([]); // List to store sports passes
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the pop-up
  const [validationMessage, setValidationMessage] = useState('');
  const [res_names, setResNames] = useState([]);
  const [decks_available, setDecksAvailable] = useState([]);
  const [selectedModal, setSelectedModal] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");
  const [deck, setDeck] = useState(0);

  const handleValidate = async () => {
    console.log(sportsPasses);

    try {
      const uins = sportsPasses.join(',');

      var api_string = "http://localhost:3001/api/check-classifications?uins=" + uins;
      const res = await axios.get(api_string);
      setResNames(res.data.names);
      setDecksAvailable(res.data.decks);
      setIsValidated(true);
      console.log(res.status);
      if (res.status === 200) {
        showDefaultView();
      }
      setShowPopup(true);
    } catch (err) {
      console.error("Couldn't validate sports passes:", err.status);
      if (err.status === 403) {
        showErrorView("Invalid Ratio");
      } else if (err.status === 401) {
        showErrorView("Invalid UIN");
      } else if (err.status === 402) {
        showErrorView("Already Pulled");
      } else {
        showErrorView("Error");
      }
      setShowPopup(true);
    }
  }

  const showDefaultView = () => setSelectedModal("default");
  const showErrorView = (message) => {
    setSelectedModal("error");
    setErrorMessage(message);
  }

  const handleDeckClick = (deckIndex) => {
    if (!decks_available.includes(deckIndex+1)) {
      return;
    }

    if (activeDeck === deckIndex) {
      setActiveDeck(null); // Reset if the same deck is clicked again
    } else {
      setActiveDeck(deckIndex); // Set active deck to clicked one
    }
  };

  const addPass = (newPasses) => {
    setSportsPasses(newPasses); // Update sports passes list
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup when clicked outside
  };

  const handlePullTickets = async () => {
    var api_string = "http://localhost:3001/api/pull"
    // const uins = sportsPasses.join(',');
    const uins = sportsPasses.map((uin) => uin.toString().trim());

    console.log(uins);
    
    const body = {
      "uins": uins,
      "deck": activeDeck,
    }

    console.log(body);
    
    try {
        const res = await axios.post(api_string, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(res);
        alert("Tickets Pulled Successfully for " + res.data.section + " " + res.data.row + " " + res.data.seats);

    } catch (err) {
      console.error("Couldn't pull tickets:", err);
    }
  };

  return (
    <div className="h-screen p-5 flex justify-between items-start space-x-5">
      {/* Left side: UINDropdown */}
      <div className="w-1/2">
        <UINDropdown onPassAdded={addPass} />

        {/* Validate Button (Aligned to the right within the same div) */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleValidate}
            className="bg-aggie-maroon text-other-white text-4xl px-12 py-3 rounded-md font-custom-font hover:bg-aggie-white hover:text-aggie-maroon transition-all"
          >
            Validate
          </button>
        </div>
      </div>

      {/* Right side: Deck Boxes and Pull Tickets Button (Same Div) */}
      <div className="w-1/2">
        <div className="flex flex-col gap-4">
          {/* Deck Boxes */}
          {['1st Deck', '2nd Deck', '3rd Deck'].map((deck, index) => (
            <div
              key={index}
              onClick={() => handleDeckClick(index)} // Handle click on deck box
              className={`w-full h-40 flex justify-center items-center text-aggie-white font-bold text-2xl rounded-lg cursor-pointer border border-black transition-all duration-300 ease-in-out ${
                activeDeck === index
                  ? 'bg-aggie-maroon hover:bg-maroon-dark'
                  : 'bg-other-white hover:bg-maroon-dark'
                }`}
            >
              {deck}
            </div>
          ))}

          {/* Pull Tickets Button */}
          <button
            onClick={handlePullTickets}
            className={`${activeDeck === null
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-aggie-maroon hover:bg-aggie-white hover:text-aggie-maroon'
              } text-other-white text-4xl px-12 py-3 rounded-md font-custom-font transition-all mt-8`}
            disabled={activeDeck === null} // Disable button if no deck is selected
          >
            Pull Tickets
          </button>
        </div>
      </div>

      {/* Pop-up with Sports Passes */}
      {/* {showPopup && ( */}
      {selectedModal === "default" && showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup} // Close on outside click
        >
          <div
            className="bg-aggie-white p-6 rounded-lg w-72 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3 className="text-xl font-custom-font font-semibold mb-4">Are you sure you want to pull for these passes?</h3>
            <ul className="list-none p-0">
              {res_names.map((name, index) => (
                <li key={index} className="mb-2">
                  {name}
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="bg-aggie-maroon font-custom-font text-aggie-white py-2 px-4 rounded-lg mt-4 hover:bg-maroon-dark transition-all" // Close button
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {selectedModal === "error" && showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup} // Close on outside click
        >
          <div
            className="bg-aggie-white p-6 rounded-lg w-72 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3 className="text-xl font-custom-font font-semibold mb-4">Error</h3>
            <ul className="list-none p-0">
              <li>
                {errorMessage}
              </li>
            </ul>
            <button
              onClick={closePopup}
              className="bg-aggie-maroon font-custom-font text-aggie-white py-2 px-4 rounded-lg mt-4 hover:bg-maroon-dark transition-all" // Close button
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckBoxes;
