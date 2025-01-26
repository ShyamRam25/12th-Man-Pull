import React, { useState } from 'react';

const UINDropdown = ({ onPassAdded }) => {
  const [passes, setPasses] = useState([]);
  const [currentPass, setCurrentPass] = useState('');

  const handleAddPass = () => {
    // Only add pass if input is not empty
    if (currentPass.trim()) {
      const newPasses = [...passes, currentPass];
      setPasses(newPasses);
      onPassAdded(newPasses); // Pass the updated passes to the parent
      setCurrentPass(''); // Clear the input
    }
  };

  const handleRemovePass = (index) => {
    const updatedPasses = passes.filter((_, i) => i !== index);
    setPasses(updatedPasses);
    onPassAdded(updatedPasses); // Update parent with the new passes list
  };

  return (
    <div className="p-4 bg-aggie-gray rounded-md shadow-lg max-w-lg mx-auto">
      {/* Input and Add Pass Button */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          placeholder="Enter pass"
          className="border border-aggie-maroon rounded-md p-2 w-full"
        />
        <button
          onClick={handleAddPass}
          disabled={!currentPass.trim()} // Only allow click if input is not empty
          className="bg-aggie-maroon font-custom-font text-med text-other-white px-4 py-2 rounded-md"
        >
          Add Pass
        </button>
      </div>

      {/* Display Passes */}
      {passes.length > 0 && (
        <div className="space-y-4">
          {passes.map((pass, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-aggie-white border border-aggie-maroon rounded-md p-2 shadow"
            >
              <span className="text-aggie-maroon font-medium">{pass}</span>
              <button
                onClick={() => handleRemovePass(index)}
                className="bg-aggie-maroon font-custom-font text-aggie-white px-3 py-1 rounded-md hover:bg-maroon-dark transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UINDropdown;
