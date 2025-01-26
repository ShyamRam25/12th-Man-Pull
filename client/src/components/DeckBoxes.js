import React, { useState } from 'react';
import UINDropdown from './UINDropdown'; // Assuming you have UINDropdown component

const DeckBoxes = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [activeDeck, setActiveDeck] = useState(null);
  const [sportsPasses, setSportsPasses] = useState([]); // List to store sports passes
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the pop-up

  const handleValidate = () => {
    setIsValidated(true); // Grays out the boxes when clicked
    setShowPopup(true); // Show the pop-up when validate is clicked
  };

  const handleDeckClick = (deckIndex) => {
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

  return (
    <div className="h-screen p-5 flex justify-between items-start space-x-5">
      {/* Left side: UINDropdown */}
      <div className="w-1/2">
        <UINDropdown onPassAdded={addPass} />
      </div>

      {/* Right side: Deck Boxes */}
      <div className="w-1/2">
        <div className="mt-8 mb-8">
          {/* Validate Button */}
          <button
            onClick={handleValidate}
            className="bg-aggie-maroon text-other-white text-4xl px-12 py-3 rounded-md font-custom-font hover:bg-aggie-white hover:text-aggie-maroon transition-all"
          >
            Validate
          </button>

          {/* Deck Boxes */}
          <div className="flex flex-col gap-4">
            {['1st Deck', '2nd Deck', '3rd Deck'].map((deck, index) => (
              <div
                key={index}
                onClick={() => handleDeckClick(index)} // Handle click on deck box
                className={`w-full h-40 flex justify-center items-center text-aggie-white font-bold text-2xl rounded-lg cursor-pointer border border-black transition-all duration-300 ease-in-out ${
                  isValidated
                    ? activeDeck === index
                      ? 'bg-aggie-maroon'
                      : 'bg-aggie-gray'
                    : activeDeck === index
                    ? 'bg-aggie-maroon'
                    : 'bg-other-white'
                }`}
              >
                {deck}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up with Sports Passes */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup} // Close on outside click
        >
          <div
            className="bg-aggie-white p-6 rounded-lg w-72 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3 className="text-xl font-semibold mb-4">Sports Passes</h3>
            <ul className="list-none p-0">
              {sportsPasses.map((pass, index) => (
                <li key={index} className="mb-2">
                  {pass}
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="bg-aggie-maroon text-aggie-white py-2 px-4 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckBoxes;
