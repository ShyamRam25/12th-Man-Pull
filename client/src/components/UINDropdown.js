import React, { useState } from 'react';

const UINDropdown = ({ onPassAdded }) => {
  const [passes, setPasses] = useState([]);
  const [currentPass, setCurrentPass] = useState('');

  const handleAddPass = () => {
    if (/^\d{9}$/.test(currentPass)) {
      const newPasses = [...passes, currentPass];
      setPasses(newPasses);
      onPassAdded(newPasses); // Pass the updated passes to the parent
      setCurrentPass(''); // Clear the input
    } else {
      alert('Please enter a valid 9-digit integer.');
    }
  };

  const handleRemovePass = (index) => {
    const updatedPasses = passes.filter((_, i) => i !== index);
    setPasses(updatedPasses);
    onPassAdded(updatedPasses); // Update parent with the new passes list
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-lg max-w-lg mx-auto">
      {/* Input and Add Pass Button */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          placeholder="Enter 9-digit pass"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          onClick={handleAddPass}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
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
              className="flex items-center justify-between bg-white border border-gray-300 rounded-md p-2 shadow"
            >
              <span className="text-gray-700 font-medium">{pass}</span>
              <button
                onClick={() => handleRemovePass(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
