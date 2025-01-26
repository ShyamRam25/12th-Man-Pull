import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Barcode from '../assets/Barcode.png';
import SEC from '../assets/sec.svg';

const TicketGenerator = () => {
  const [seatNumbers, setSeatNumbers] = useState([]); // State for holding multiple tickets
  const ticketRef = useRef(null);

  // Generate random Section, Row, and Seat
  const generateRandomSeat = () => {
    const section = Math.floor(Math.random() * 30) + 1; // Section 1-30
    const row = Math.floor(Math.random() * 50) + 1; // Row 1-50
    const seat = Math.floor(Math.random() * 20) + 1; // Seat 1-20
    const newTicket = { section, row, seat };
    setSeatNumbers((prev) => [...prev, newTicket]); // Add new ticket to the list
  };

  // Convert ticket to an image and download
  const downloadTicketAsImage = (ticket) => {
    if (ticketRef.current) {
      toPng(ticketRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `Ticket_Section_${ticket.section || 'NA'}_Row_${ticket.row || 'NA'}_Seat_${ticket.seat || 'NA'}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error generating image:', err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 mt-20">Game Ticket Generator</h1>

      <button
        onClick={generateRandomSeat}
        className="bg-other-white text-aggie-maroon px-4 py-2 rounded mb-4"
      >
        Generate Random Ticket
      </button>

      {/* Render Multiple Tickets */}
      <div className="flex flex-col items-center gap-6">
        {seatNumbers.map((ticket, index) => (
          <div
            key={index}
            ref={ticketRef}
            className="bg-aggie-white rounded shadow-lg relative p-4 w-[600px] h-64 flex flex-col justify-between 
                  border-8 border-border-blue"
          >
            {/* Texas A&M Logo */}
            <img
              src={SEC}
              alt="Texas A&M Logo"
              className="absolute top-2 left-2 w-12"
            />

            {/* Header */}
            <div className="text-center mt-1">
              <h2 className="text-lg font-bold">2024 Football Kyle Field</h2>
            </div>

            {/* Match Title and Date */}
            <div className="text-center">
              <h3 className="text-xl font-bold">TEXAS A&M</h3>
              <h3 className="text-xl font-bold">vs.</h3>
              <h3 className="text-xl font-bold">TEXAS</h3>
              <p className="text-sm font-bold mt-8">March 15, 2024</p>
            </div>

            {/* Section, Row, and Seat */}
            <div className="absolute top-16 left-2">
              <div className="text-center">
                <p className="text-sm">Section</p>
                <p className="text-lg font-bold">{ticket.section || 'N/A'}</p>
                <p className="text-sm">Row</p>
                <p className="text-lg font-bold">{ticket.row || 'N/A'}</p>
                <p className="text-sm">Seat</p>
                <p className="text-lg font-bold">{ticket.seat || 'N/A'}</p>
              </div>
            </div>

            {/* Vertical Barcode */}
            <img
              src={Barcode}
              alt="Vertical Barcode"
              className="absolute top-16 -right-16 w-56 h-50 rotate-90"
            />

            {/* Download Button for each ticket */}
            <button
              onClick={() => downloadTicketAsImage(ticket)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Download Ticket {index + 1} as Image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketGenerator;
