import React, { useState } from 'react';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const TicketGenerator = () => {
  const [seatNumber, setSeatNumber] = useState('');

  // Generate a random seat number (e.g., "A12", "B45")
  const generateRandomSeat = () => {
    const row = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    const number = Math.floor(Math.random() * 100) + 1; // 1-100
    const randomSeat = `${row}${number}`;
    setSeatNumber(randomSeat); // Update the seatNumber state
  };

  // Ticket PDF component
  const TicketPDF = ({ seat }) => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Event Ticket</Text>
        <Text style={styles.seat}>Seat: {seat}</Text>
        <Text style={styles.footer}>Thank you for attending!</Text>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 mt-20">Random Ticket Generator</h1>

      <button
        onClick={generateRandomSeat}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Random Ticket
      </button>

      <div id="ticket-preview" className="border p-4 w-64 text-center bg-gray-100 rounded mb-4">
        <h2 className="font-bold">🎟️ Event Ticket</h2>
        <p>Seat: {seatNumber || 'N/A'}</p>
        <p>Thank you for attending!</p>
      </div>

      {seatNumber && (
        <PDFDownloadLink
          document={<TicketPDF seat={seatNumber || 'N/A'} />}
          fileName={`Ticket_Seat_${seatNumber || 'NA'}.pdf`}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  seat: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
});

export default TicketGenerator;
