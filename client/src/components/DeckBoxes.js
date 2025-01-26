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
    <div style={{ height: '100vh', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '10px', paddingRight: '10px' }}>
      {/* Left side: UINDropdown */}
      <div style={{ width: '50%' }}>
        <UINDropdown onPassAdded={addPass} />
      </div>

      {/* Right side: Deck Boxes */}
      <div style={{ width: '50%' }}>
        <div style={{ marginTop: '32px', marginBottom: '32px' }}>
          {/* Validate Button */}
          <button
            onClick={handleValidate}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '24px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            Validate
          </button>

          {/* Deck Boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['1st Deck', '2nd Deck', '3rd Deck'].map((deck, index) => (
              <div
                key={index}
                onClick={() => handleDeckClick(index)} // Handle click on deck box
                style={{
                  width: '100%',
                  height: '160px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isValidated
                    ? (activeDeck === index ? 'green' : '#6b7280') // Green if active
                    : (activeDeck === index ? 'green' : '#d1d5db'), // Default color
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease',
                  cursor: 'pointer',
                }}
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
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={closePopup} // Close on outside click
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h3>Sports Passes</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {sportsPasses.map((pass, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  {pass}
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
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
